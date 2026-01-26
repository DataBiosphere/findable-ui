# Generic Data Explorer API v0.1

## Overview

The Generic Data Explorer provides a configuration-driven API for exploring entity data stored in OpenSearch. It supports:

- **Flexible Filtering**: AND/OR/NOT operators within and across facets
- **Sorting and Pagination**: Cursor-based pagination with sorting on any field
- **Aggregations**: Group by any facet field with counts
- **Session Management**: Server-side state for multi-turn exploration
- **Filter Relaxation**: Automatic suggestions when queries return no results

## Base URL

```
/api/v0/explore
```

---

## Endpoints

### Query Entities

```
POST /api/v0/explore/query
```

Query entities with filters, sorting, and pagination.

#### Request Body

```json
{
  "scope": "anvil",
  "entity": "files",
  "filters": {
    "files.file_format": {
      "values": [".bam", ".cram"],
      "operator": "OR"
    },
    "diagnoses.disease": {
      "values": ["diabetes"],
      "operator": "AND"
    },
    "files.is_supplementary": {
      "values": ["true"],
      "negate": true
    }
  },
  "return_type": "list",
  "sort_by": "file_size",
  "sort_order": "desc",
  "limit": 25,
  "cursor": null,
  "session_id": null
}
```

| Field         | Type    | Required | Default | Description                                                             |
| ------------- | ------- | -------- | ------- | ----------------------------------------------------------------------- |
| `scope`       | string  | No       | "anvil" | Configuration scope                                                     |
| `entity`      | string  | Yes      | -       | Entity type: datasets, donors, biosamples, files, diagnoses, activities |
| `filters`     | object  | No       | {}      | Filters to apply (see Filter Spec below)                                |
| `return_type` | string  | No       | "list"  | What to return: "count", "list", or "ids"                               |
| `sort_by`     | string  | No       | null    | Field to sort by                                                        |
| `sort_order`  | string  | No       | "desc"  | Sort order: "asc" or "desc"                                             |
| `limit`       | integer | No       | 25      | Maximum results (1-1000)                                                |
| `cursor`      | string  | No       | null    | Pagination cursor from previous response                                |
| `session_id`  | string  | No       | null    | Session ID to use filters from                                          |

#### Response

```json
{
  "count": 1234,
  "results": [
    {
      "_id": "file_abc123",
      "file_id": "file_abc123",
      "file_name": "sample.bam",
      "file_format": ".bam",
      "file_size": 1024000000
    }
  ],
  "cursor": "base64_encoded_cursor",
  "query_time_ms": 45
}
```

---

### Count Documents

```
POST /api/v0/explore/count
```

Count documents matching filters. When count is 0, returns filter relaxation suggestions.

#### Request Body

```json
{
  "scope": "anvil",
  "entity": "files",
  "filters": {
    "files.data_modality": { "values": ["WGS"] },
    "diagnoses.disease": { "values": ["diabetes"] },
    "donors.reported_ethnicity": { "values": ["Hispanic or Latino"] }
  },
  "suggest_relaxations": true
}
```

#### Response (when count > 0)

```json
{
  "count": 127,
  "filters_applied": 3,
  "suggestions": null,
  "partial_matches": null
}
```

#### Response (when count = 0)

```json
{
  "count": 0,
  "filters_applied": 3,
  "suggestions": [
    {
      "removed_filter": "donors.reported_ethnicity",
      "count": 127,
      "description": "127 results without reported ethnicity filter (disease: diabetes; data modality: WGS)",
      "remaining_filters": ["files.data_modality", "diagnoses.disease"]
    },
    {
      "removed_filter": "diagnoses.disease",
      "count": 45,
      "description": "45 results without disease filter (data modality: WGS; reported ethnicity: Hispanic or Latino)",
      "remaining_filters": ["files.data_modality", "donors.reported_ethnicity"]
    }
  ],
  "partial_matches": {
    "donors.reported_ethnicity": {
      "available_values": ["White", "Black or African American", "Asian"],
      "note": "Requested values ['Hispanic or Latino'] not found in current result set"
    }
  }
}
```

---

### Aggregate Data

```
POST /api/v0/explore/aggregate
```

Aggregate documents by a field with optional filters.

#### Request Body

```json
{
  "scope": "anvil",
  "entity": "donors",
  "filters": {
    "diagnoses.disease": { "values": ["diabetes"] }
  },
  "group_by": "donors.phenotypic_sex",
  "limit": 50
}
```

#### Response

```json
{
  "total": 500,
  "buckets": [
    { "key": "Female", "count": 280 },
    { "key": "Male", "count": 215 },
    { "key": "Unknown", "count": 5 }
  ],
  "query_time_ms": 32
}
```

---

### Session Management

#### Create Session

```
POST /api/v0/explore/session
```

Create a new exploration session.

##### Request Body

```json
{
  "scope": "anvil",
  "ttl_seconds": 3600,
  "initial_filters": {
    "files.data_modality": { "values": ["WGS"] }
  }
}
```

##### Response

```json
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "scope": "anvil",
  "filters": {
    "files.data_modality": {
      "values": ["WGS"],
      "operator": "OR",
      "negate": false
    }
  },
  "created_at": "2024-01-15T10:30:00Z",
  "ttl_seconds": 3600
}
```

#### Get Session State

```
GET /api/v0/explore/session/{session_id}
```

##### Response

```json
{
  "session_id": "550e8400-e29b-41d4-a716-446655440000",
  "scope": "anvil",
  "filters": { ... },
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:35:00Z",
  "last_query": {
    "entity": "files",
    "count": 127,
    "timestamp": "2024-01-15T10:35:00Z"
  },
  "ttl_seconds": 3600,
  "expires_in_seconds": 3300
}
```

#### Update Session Filters

```
PATCH /api/v0/explore/session/{session_id}
```

##### Request Body

```json
{
  "add_filters": {
    "diagnoses.disease": { "values": ["diabetes"] }
  },
  "remove_filters": ["donors.reported_ethnicity"],
  "clear_all": false
}
```

#### Delete Session

```
DELETE /api/v0/explore/session/{session_id}
```

Returns 204 No Content on success.

---

### Health Check

```
GET /api/v0/explore/health
```

#### Response

```json
{
  "status": "healthy",
  "cluster_name": "opensearch-cluster",
  "version": "2.11.0",
  "active_sessions": 5,
  "error": null
}
```

---

## Filter Specification

Filters are specified as objects with the following structure:

```json
{
  "values": ["value1", "value2"],
  "operator": "OR",
  "negate": false
}
```

| Field      | Type    | Required | Default | Description                            |
| ---------- | ------- | -------- | ------- | -------------------------------------- |
| `values`   | array   | Yes      | -       | Values to filter by                    |
| `operator` | string  | No       | "OR"    | How to combine values: "AND" or "OR"   |
| `negate`   | boolean | No       | false   | If true, exclude matching values (NOT) |

### Filter Operators

| Operator            | Behavior         | Example                                             |
| ------------------- | ---------------- | --------------------------------------------------- |
| `OR`                | Match any value  | `file_format IN ['.bam', '.cram']`                  |
| `AND`               | Match all values | `disease = 'diabetes' AND disease = 'hypertension'` |
| `NOT` (negate=true) | Exclude values   | `file_format NOT IN ['.txt']`                       |

### Combined Filter Example

Find BAM/CRAM files from diabetic patients, excluding supplementary files:

```json
{
  "filters": {
    "files.file_format": {
      "values": [".bam", ".cram"],
      "operator": "OR"
    },
    "diagnoses.disease": {
      "values": ["diabetes"]
    },
    "files.is_supplementary": {
      "values": ["true"],
      "negate": true
    }
  }
}
```

---

## Entities

| Entity       | Description           | Key Fields                                                  |
| ------------ | --------------------- | ----------------------------------------------------------- |
| `datasets`   | Research datasets     | dataset_id, title, consent_group, principal_investigator    |
| `donors`     | Individual donors     | donor_id, organism_type, phenotypic_sex, reported_ethnicity |
| `biosamples` | Biological samples    | biosample_id, anatomical_site, biosample_type, disease      |
| `files`      | Data files            | file_id, file_format, file_size, data_modality, assay_type  |
| `diagnoses`  | Medical diagnoses     | diagnosis_id, disease, phenotype                            |
| `activities` | Processing activities | activity_id, activity_type, reference_assembly              |

---

## Available Facets (AnVIL Scope)

### Dataset Facets

- `datasets.consent_group`
- `datasets.data_use_permission`
- `datasets.principal_investigator`
- `datasets.source_repository`

### Donor Facets

- `donors.organism_type`
- `donors.phenotypic_sex`
- `donors.reported_ethnicity`
- `donors.genetic_ancestry`

### Biosample Facets

- `biosamples.anatomical_site`
- `biosamples.biosample_type`
- `biosamples.disease`

### Diagnosis Facets

- `diagnoses.disease` (supports AND)
- `diagnoses.phenotype` (supports AND)

### File Facets

- `files.file_format`
- `files.file_type`
- `files.data_modality` (supports AND)
- `files.assay_type` (supports AND)
- `files.data_type`
- `files.is_supplementary`

### Activity Facets

- `activities.activity_type`
- `activities.reference_assembly`

---

## Error Responses

### 400 Bad Request

```json
{
  "detail": "Unknown entity: invalid_entity"
}
```

### 404 Not Found

```json
{
  "detail": "Session abc123 not found or expired"
}
```

### 500 Internal Server Error

```json
{
  "detail": "Internal server error"
}
```

---

## ETL Pipeline

The ETL pipeline loads data from the AnVIL API into OpenSearch indices.

### CLI Usage

```bash
# Full refresh (delete and recreate indices)
python -m etl --scope anvil --full-refresh

# Process specific entity
python -m etl --scope anvil --entity files

# Dry run (no writes to OpenSearch)
python -m etl --scope anvil --dry-run

# Index management
python -m etl create-indices
python -m etl delete-indices
python -m etl list-indices
```

### Enrichment

The ETL pipeline supports merging enrichments from meta-disco JSON files:

```bash
python -m etl --scope anvil --enrichment-file /path/to/meta-disco.json
```

Enriched fields: `data_modality`, `assay_type`, `data_type` on files.
