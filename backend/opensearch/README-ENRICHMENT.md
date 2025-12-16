# Ontology Term Enrichment Process

## Overview

Your dataset has **654 ontology IDs** that need human-readable names:

- **HP:** 364 terms (Human Phenotype Ontology)
- **OMIM:** 191 terms (Online Mendelian Inheritance in Man)
- **ORPHA:** 98 terms (Orphanet Rare Disease Ontology)

## The Enrichment Process

### Step 1: Convert Dataset to Concepts

```bash
cd /Users/dave/projects/findable-ui/backend/opensearch

# Convert datasets.json to concept format
python3 convert-datasets-to-concepts.py
```

This creates `concepts-from-datasets.json` with 1,966 concepts.

**Before enrichment:**

```json
{
  "id": "disease-93b47a9f7205",
  "facet_name": "diagnoses.disease",
  "term": "HP:0001250",
  "name": "HP:0001250",   ← Just the ID
  "synonyms": [],
  "metadata": {"count": 5}
}
```

### Step 2: Enrich Ontology Terms

```bash
# Enrich all ontology IDs with names from APIs
python3 enrich-ontology-terms.py \
  --input concepts-from-datasets.json \
  --output concepts-enriched.json
```

**This will take 5-10 minutes** (654 API calls with rate limiting).

**After enrichment:**

```json
{
  "id": "disease-93b47a9f7205",
  "facet_name": "diagnoses.disease",
  "term": "HP:0001250",
  "name": "Seizure",   ← Human-readable name!
  "synonyms": [
    "Seizures",
    "Epileptic seizure",
    "Epilepsy",
    "HP:0001250"
  ],
  "metadata": {
    "count": 5,
    "description": "A seizure is an intermittent abnormality..."
  }
}
```

### Step 3: Load Enriched Concepts into OpenSearch

```bash
# Clear old data and load enriched concepts
python3 load-concepts.py --file concepts-enriched.json --clear
```

### Step 4: Test the Enrichment

```bash
# Search for "seizure" instead of needing to know "HP:0001250"
curl -s "http://localhost:9200/concepts/_search" \
  -H "Content-Type: application/json" \
  -d '{
    "query": {
      "bool": {
        "must": [
          {"term": {"facet_name": "diagnoses.disease"}},
          {"multi_match": {"query": "seizure", "fields": ["term", "name", "synonyms"]}}
        ]
      }
    }
  }' | jq '.hits.hits[] | {term: ._source.term, name: ._source.name}'
```

**Result:**

```json
{
  "term": "HP:0001250",
  "name": "Seizure"
}
```

## APIs Used

The enrichment script uses the **EBI Ontology Lookup Service (OLS)**:

- https://www.ebi.ac.uk/ols/

Supported ontologies:

- **HP** → Human Phenotype Ontology
- **OMIM** → Online Mendelian Inheritance in Man
- **ORPHA** → Orphanet Rare Disease Ontology
- **MONDO** → Mondo Disease Ontology
- **UBERON** → Uber-anatomy Ontology
- **CL** → Cell Ontology
- And many more...

## Rate Limiting

The script includes:

- 3 retry attempts for failed requests
- 1-second pause every 50 successful lookups
- Caching to avoid duplicate lookups
- Timeout handling for slow responses

## Monitoring Progress

Watch the enrichment in real-time:

```bash
# Run enrichment in background
python3 enrich-ontology-terms.py \
  --input concepts-from-datasets.json \
  --output concepts-enriched.json \
  > enrichment.log 2>&1 &

# Watch progress
tail -f enrichment.log
```

You'll see progress updates every 10 concepts:

```
Progress: 10/1966 (5 enriched, 0 failed)
Progress: 20/1966 (12 enriched, 0 failed)
...
```

## Handling Failures

If some terms fail to enrich (e.g., network issues):

1. The script will continue with other terms
2. Failed terms keep their original ID as the name
3. Check the statistics at the end:

```
=== ENRICHMENT STATISTICS ===
Ontology IDs found: 654
Successfully enriched: 650
Failed to enrich: 4
Cache hits: 0
```

## Incremental Updates

When you get new dataset facets:

```bash
# 1. Convert new data
python3 convert-datasets-to-concepts.py

# 2. Enrich only (uses cache for existing terms)
python3 enrich-ontology-terms.py \
  --input concepts-from-datasets.json \
  --output concepts-enriched.json

# 3. Reload into OpenSearch
python3 load-concepts.py --file concepts-enriched.json --clear
```

## Quick Test

Test on just a few terms first:

```bash
# Test on first 50 concepts (faster)
python3 enrich-ontology-terms.py \
  --input concepts-from-datasets.json \
  --output concepts-test.json \
  --limit 300

# Check results
head -50 concepts-test.json
```

## Benefits

**Before enrichment:**

- Users must know exact IDs: "HP:0001250"
- No fuzzy matching: "seizure" won't find anything
- No synonyms

**After enrichment:**

- Users can search: "seizure", "seizures", "epilepsy"
- Fuzzy matching works: "siezure" (typo) still finds "Seizure"
- Rich metadata with descriptions
