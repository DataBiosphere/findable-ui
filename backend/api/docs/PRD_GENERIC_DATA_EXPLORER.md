# PRD: Generic Data Explorer v0.1

## Overview

A configuration-driven data exploration API that:

- Stores entity data in OpenSearch
- Supports flexible filtering (AND/OR within and across facets)
- Provides on-demand aggregations
- Maintains session state for multi-turn exploration
- Merges enriched metadata from external sources (meta-disco)

## Goals

1. **Replicate AnVIL data locally** - Full copy of datasets, donors, biosamples, files, activities in OpenSearch
2. **Enhanced query capabilities** - AND within facets (not just OR), flexible aggregations
3. **Configuration-driven** - No code dependency on AnVIL schema; generic query interface with scope parameter
4. **Multi-turn exploration** - Server-tracked sessions for conversational drill-down
5. **Dead-end handling** - Automatic filter relaxation suggestions when queries return no results
6. **Metadata enrichment** - Merge additional fields from meta-disco (file_modality, data_type, assay_type)

## Non-Goals (for v0.1)

- Full API compatibility with existing AnVIL explorer frontend
- File→Dataset metadata propagation (deferred)
- Real-time sync with AnVIL API (batch ETL is sufficient)

---

## Entities & Schema (AnVIL scope)

| Entity         | Key Fields                                                                                    | Relationships                      |
| -------------- | --------------------------------------------------------------------------------------------- | ---------------------------------- |
| **datasets**   | title, consent_group, data_use_permission, PI, description, duos_id                           | contains donors, biosamples, files |
| **donors**     | donor_id, organism_type, phenotypic_sex, reported_ethnicity, genetic_ancestry                 | belongs to dataset, has biosamples |
| **biosamples** | biosample_id, anatomical_site, biosample_type, disease, donor_age_at_collection               | belongs to donor, has files        |
| **files**      | file_id, file_name, file_format, file_size, data_modality*, assay_type*, data_type\*, drs_uri | belongs to biosample/dataset       |
| **diagnoses**  | disease, phenotype                                                                            | belongs to donor/biosample         |
| **activities** | activity_type, assay_type, data_modality                                                      | links to files                     |

_\* = enriched from meta-disco_

### Entity Relationships (from AnVIL API structure)

Each "hit" in the AnVIL API contains denormalized data linking:

- Dataset → Donors → Biosamples → Files
- Diagnoses attached at donor/biosample level
- Activities describe the process that generated files

---

## API Design

### 1. Query Endpoint

```
POST /api/v0/explore/query
{
  "scope": "anvil",
  "entity": "files",
  "filters": {
    "diagnoses.disease": {
      "values": ["diabetes", "cancer"],
      "operator": "AND"           // or "OR" (default)
    },
    "files.file_format": {
      "values": [".bam", ".cram"],
      "operator": "OR"
    }
  },
  "return": "list",              // "count" | "list" | "ids"
  "limit": 25,
  "cursor": "optional_pagination_token"
}
```

**Response:**

```json
{
  "count": 1234,
  "results": [ ... ],
  "cursor": "next_page_token"
}
```

### 2. Count Endpoint (with relaxation suggestions)

```
POST /api/v0/explore/count
{
  "scope": "anvil",
  "entity": "files",
  "filters": {
    "files.data_modality": { "values": ["WGS"] },
    "diagnoses.disease": { "values": ["diabetes"] },
    "donors.reported_ethnicity": { "values": ["Hispanic or Latino"] },
    "donors.phenotypic_sex": { "values": ["Female"] }
  },
  "suggest_relaxations": true    // optional, default true
}
```

**Response (when count = 0 or below threshold):**

```json
{
  "count": 0,
  "filters_applied": 4,
  "suggestions": {
    "message": "No exact matches. Here's what's available:",
    "relaxations": [
      {
        "removed_filter": "donors.reported_ethnicity",
        "count": 127,
        "description": "WGS files from diabetic females (any ethnicity)"
      },
      {
        "removed_filter": "diagnoses.disease",
        "count": 45,
        "description": "WGS files from Hispanic/Latino females (any diagnosis)"
      },
      {
        "removed_filter": "files.data_modality",
        "count": 23,
        "description": "Any files from diabetic Hispanic/Latino females"
      }
    ],
    "partial_matches": {
      "donors.reported_ethnicity": {
        "available_values": ["White", "Black or African American", "Asian"],
        "note": "Hispanic or Latino not found in current result set"
      }
    }
  }
}
```

### 3. Aggregation Endpoint

```
POST /api/v0/explore/aggregate
{
  "scope": "anvil",
  "entity": "donors",            // what to count
  "filters": { ... },            // same filter structure as query
  "group_by": "diagnoses.disease",
  "limit": 50                    // top N buckets
}
```

**Response:**

```json
{
  "total": 5432,
  "buckets": [
    { "key": "diabetes", "count": 234 },
    { "key": "cancer", "count": 189 },
    { "key": "hypertension", "count": 156 }
  ]
}
```

### 4. Session Management

**Create session:**

```
POST /api/v0/explore/session
{ "scope": "anvil" }

Response:
{ "session_id": "abc123", "filters": {}, "created_at": "..." }
```

**Update session (add/remove filters):**

```
PATCH /api/v0/explore/session/{id}
{
  "add_filter": { "files.file_format": { "values": [".bam"] } },
  "remove_filter": "donors.reported_ethnicity"
}
```

**Get session state:**

```
GET /api/v0/explore/session/{id}

Response:
{
  "session_id": "abc123",
  "scope": "anvil",
  "filters": { ... },
  "created_at": "...",
  "last_query": {
    "entity": "files",
    "count": 1234,
    "timestamp": "..."
  }
}
```

**Query with session:**

```
POST /api/v0/explore/query
{
  "session_id": "abc123",        // uses session's scope and filters
  "entity": "files",
  "return": "list"
}
```

---

## Filter Relaxation Logic

```
1. Execute full query → count = N
2. If N < threshold (configurable, default: 1):
   a. For each active filter F:
      - Execute query WITHOUT F
      - Record count and which filter was removed
   b. Sort relaxations by count (descending)
   c. For zero-result filters, query what values ARE available
3. Return suggestions ranked by "closest to what you asked for"
```

**Optional: Progressive relaxation**

- Remove 1 filter → still 0? Try removing combinations of 2 filters
- Helps find the "minimum viable query"

---

## Configuration Structure

```
backend/api/configs/
├── anvil/
│   ├── schema.yaml           # entity fields, types, relationships
│   ├── facets.yaml           # facet definitions, display names, operators
│   └── indexes.yaml          # OpenSearch index mappings
```

### Example: facets.yaml

```yaml
facets:
  - name: diagnoses.disease
    display_name: "Disease"
    type: keyword
    operators: [AND, OR]
    entity_path: diagnoses.disease

  - name: files.file_format
    display_name: "File Format"
    type: keyword
    operators: [OR]

  - name: donors.phenotypic_sex
    display_name: "Sex"
    type: keyword
    operators: [OR]
    values: ["Female", "Male"] # optional: known values

  - name: donors.reported_ethnicity
    display_name: "Ethnicity"
    type: keyword
    operators: [AND, OR]
```

### Example: schema.yaml

```yaml
entities:
  datasets:
    index: anvil_datasets
    id_field: dataset_id
    fields:
      - name: title
        type: text
      - name: consent_group
        type: keyword
        facet: true
      - name: description
        type: text

  files:
    index: anvil_files
    id_field: file_id
    fields:
      - name: file_name
        type: text
      - name: file_format
        type: keyword
        facet: true
      - name: file_size
        type: long
      - name: data_modality
        type: keyword
        facet: true
        source: meta-disco # enriched field

  donors:
    index: anvil_donors
    id_field: donor_id
    relationships:
      - entity: datasets
        type: many-to-one
        field: dataset_id
      - entity: biosamples
        type: one-to-many
```

---

## Data Pipeline

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  AnVIL API  │────►│  ETL Script  │────►│ OpenSearch  │
└─────────────┘     │              │     │  (indices)  │
                    │   merge      │     └─────────────┘
┌─────────────┐     │              │
│ meta-disco  │────►│              │
│   (JSON)    │     └──────────────┘
└─────────────┘
```

### ETL Process

1. **Extract**: Fetch all entities from AnVIL API (paginated)
2. **Transform**:
   - Normalize field names
   - Merge meta-disco enrichments (join on file_id or dataset_id)
   - Build relationship links
3. **Load**: Bulk insert into OpenSearch indices

---

## Session State Storage

**In-memory (v0.1):**

```python
sessions = {
    "abc123": {
        "session_id": "abc123",
        "scope": "anvil",
        "filters": { ... },
        "created_at": datetime,
        "last_query": { ... },
        "ttl": 3600  # seconds
    }
}
```

**Future: Redis** for persistence across restarts and horizontal scaling.

---

## Multi-turn Conversation Example

```
User: "how many WGS files from diabetic hispanic females?"

Bot: "0 results. But I found:
      - 127 WGS files from diabetic females (any ethnicity)
      - 45 WGS files from Hispanic/Latino females (any diagnosis)
      Would you like to explore one of these?"

User: "show me the diabetic females"

Bot: [removes ethnicity filter from session]
     "127 WGS files from diabetic females.
      Top diseases: Type 2 diabetes (89), Type 1 diabetes (38)
      File formats: .bam (102), .cram (25)"

User: "filter to just Type 2"

Bot: [adds disease filter: Type 2 diabetes]
     "89 WGS files. Want to see the list or explore further?"
```

---

## Open Items

1. **meta-disco file format** - Awaiting sample JSON with file_modality, data_type, assay_type fields
2. **File→Sample association** - Verify if relationship exists in AnVIL data or needs inference
3. **Cross-entity aggregations** - E.g., "count donors by disease, filtered to .bam files" requires join logic
4. **Index strategy** - Denormalized (single index with nested) vs. normalized (separate indices with joins)

---

## Success Metrics

- Query latency < 500ms for typical filters
- Aggregation latency < 1s for histograms
- Support for 100+ concurrent sessions
- Zero-result queries return helpful suggestions within 2s

---

## Future Enhancements (post-v0.1)

- File→Dataset metadata propagation
- Real-time sync with AnVIL API
- Natural language query interface (integrate with existing /facets endpoint)
- Export filtered results (TSV, JSON)
- Saved queries / bookmarks
