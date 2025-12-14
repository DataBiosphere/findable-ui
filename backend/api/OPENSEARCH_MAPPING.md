# OpenSearch Concept Database Mapping

## Summary

- **Status**: ✅ OpenSearch is running (cluster health: yellow - normal for single node)
- **Concepts Loaded**: 1,965 documents
- **Endpoint**: http://localhost:9200

## Available Facets

| Facet Name (OpenSearch) | Count | Description |
|------------------------|-------|-------------|
| `diagnoses.disease` | 794 | Disease/diagnosis ontology terms (MONDO, HP, etc.) |
| `datasets.title` | 372 | Dataset titles |
| `diagnoses.phenotype` | 223 | Phenotype terms (HP ontology) |
| `biosamples.anatomical_site` | 123 | Anatomical sites/tissue types |
| `files.file_format` | 97 | File formats (.bam, .vcf, etc.) |
| `datasets.consent_group` | 91 | Consent group codes |
| `datasets.data_use_permission` | 91 | Data use permission codes |
| `datasets.registered_identifier` | 68 | Dataset identifiers (dbGaP, etc.) |
| `donors.reported_ethnicity` | 38 | Ethnicity values |
| `activities.activity_type` | 15 | Activity types |
| `activities.assay_type` | 14 | Assay types |
| `files.data_modality` | 10 | Data modalities |
| `biosamples.biosample_type` | 8 | Biosample types |
| `files.reference_assembly` | 5 | Reference genome assemblies |
| `donors.organism_type` | 4 | Organism types (human, etc.) |
| `donors.phenotypic_sex` | 4 | Phenotypic sex |
| `accessible` | 2 | Boolean accessible flag (true/false) |
| Others | <5 each | Various other facets |

## Sample Queries & Results

### 1. Diabetes (Disease)

**Query**: "diabetes" in `diagnoses.disease`

**Top Results**:
- `"Diabetes mellitus"` (synonyms: IDDM, T1D, Type I Diabetes)
- `"Type I diabetes mellitus"` (term: HP:0100651)
- `"Type 1 diabetes mellitus"` (synonyms: IDDM, T1D, Juvenile diabetes)

### 2. Latino/Hispanic (Ethnicity)

**Query**: "latino" in `donors.reported_ethnicity`

**Top Results**:
- `"Hispanic/Latino(a)"` (synonyms: Latino, Hispanic, Chicano, Latinx)
- `"Not Hispanic or Latino"` (synonyms: Non-Hispanic, Non-Latino)
- `"Asia|Hispanic/Latino(a)"` (multi-ethnic)

### 3. BAM Files (File Format)

**Query**: "bam" in `files.file_format`

**Top Results**:
- `".bam"` (synonyms: BAM file, Binary Alignment/Map, Sequence alignment file)
- `".bai"` (synonyms: BAM Index, BAM file index)

### 4. Access/Public (Data Use)

**Note**: There is NO simple "Access" facet with "Granted" values.

Available related facets:
- `accessible`: Boolean values ("true" / "false")
- `datasets.data_use_permission`: Complex codes (GRU-PUB, DS-EAC-PUB-GSO)
- `datasets.consent_group`: Consent group codes

## Facet Name Mapping (API → OpenSearch)

For our API, we need to map user-friendly facet names to OpenSearch facet names:

| API Facet Name | OpenSearch Facet Name | Notes |
|----------------|----------------------|-------|
| `Diagnosis` | `diagnoses.disease` | Primary disease/diagnosis facet (794 terms) |
| `Phenotype` | `diagnoses.phenotype` | Phenotype terms (223 terms) |
| `Reported Ethnicity` | `donors.reported_ethnicity` | Ethnicity values (38 terms) |
| `File Format` | `files.file_format` | File formats (97 terms) |
| `Access` | `accessible` ⚠️ | **Only true/false, not "Granted"** |
| `Anatomical Site` | `biosamples.anatomical_site` | Tissue/organ types (123 terms) |
| `Consent Group` | `datasets.consent_group` | Consent codes (91 terms) |
| `Data Use Permission` | `datasets.data_use_permission` | Data use codes (91 terms) |

## Important Notes

### ⚠️ Access Facet Discrepancy

Our mock fixtures use:
- API Facet: `"Access"`
- Expected Term: `"Granted"`
- Mock Mention: `"public"`

**Reality in OpenSearch**:
- Facet Name: `"accessible"`
- Actual Terms: `"true"` or `"false"`
- "public" appears in `datasets.data_use_permission` (e.g., "GRU-PUB")

**Options**:
1. Update mock fixtures to use `accessible` facet with `true`/`false`
2. Map "public" → `datasets.data_use_permission` instead
3. Create a custom mapping for "Access" that checks multiple facets

### Schema Structure

Each concept document has:
```json
{
  "id": "unique-id",
  "facet_name": "facet.name",
  "term": "Canonical Term",
  "name": "Full Name",
  "synonyms": ["synonym1", "synonym2"],
  "metadata": {
    "count": 123,
    "description": "optional description"
  }
}
```

### Field Mapping

Fields have both text and keyword sub-fields:
- `facet_name` → `facet_name.keyword` (for exact matching)
- `term` → `term.keyword`
- `name` → `name.keyword`
- `synonyms` → `synonyms.keyword`

Use `.keyword` for exact/aggregation queries, use base field for fuzzy/text search.

## Test Queries

Here are some test queries to verify the resolver:

### Exact Match
```bash
curl -s "http://localhost:9200/concepts/_search" -H 'Content-Type: application/json' -d '{
  "query": {
    "bool": {
      "must": [
        {"term": {"facet_name.keyword": "diagnoses.disease"}},
        {"term": {"term.keyword": "Diabetes mellitus"}}
      ]
    }
  }
}'
```

### Fuzzy Match
```bash
curl -s "http://localhost:9200/concepts/_search" -H 'Content-Type: application/json' -d '{
  "query": {
    "bool": {
      "must": [
        {"term": {"facet_name.keyword": "diagnoses.disease"}},
        {"match": {"term": {"query": "diabtes", "fuzziness": "AUTO"}}}
      ]
    }
  }
}'
```

### Multi-field Search (Recommended)
```bash
curl -s "http://localhost:9200/concepts/_search" -H 'Content-Type: application/json' -d '{
  "query": {
    "bool": {
      "must": [
        {"term": {"facet_name.keyword": "diagnoses.disease"}}
      ],
      "should": [
        {"term": {"term.keyword": "diabetes"}},
        {"term": {"name.keyword": "diabetes"}},
        {"term": {"synonyms.keyword": "diabetes"}},
        {"match": {"term": {"query": "diabetes", "fuzziness": "AUTO", "boost": 2.0}}},
        {"match": {"name": {"query": "diabetes", "fuzziness": "AUTO", "boost": 1.5}}},
        {"match": {"synonyms": {"query": "diabetes", "fuzziness": "AUTO"}}}
      ],
      "minimum_should_match": 1
    }
  }
}'
```

## Next Steps

1. Decide on facet name mapping strategy
2. Handle the Access facet discrepancy
3. Implement `OpenSearchConceptResolver` with the mappings above
4. Update mock fixtures to match real data (or document the differences)
