# ETL Deduplication Behavior

## Overview

When loading data from the AnVIL API into OpenSearch, the same entity (donor, biosample, file, etc.) can appear multiple times in the API response. This document explains why this happens and how the ETL pipeline handles it.

## The Problem: Denormalized API Responses

The AnVIL API returns **denormalized "hits"** where each hit represents a combination of related entities. The same donor can appear in multiple hits when they are associated with:

- Multiple datasets
- Multiple biosamples
- Multiple file sets

### Real Example

**Donor ID:** `0008dbc5-d9ac-f555-5bcd-be02a14fc665`

This donor appears in **2 different API hits**:

#### Hit 1

```json
{
  "entryId": "98d0da06-2f25-4b02-8b40-d4d3fbaf6baf",
  "datasets": [
    {
      "title": "ANVIL_1000G_PRIMED_data_model",
      "dataset_id": "38442466-8bcf-17ed-393e-058a0ed8d25d"
    }
  ],
  "donors": [
    {
      "donor_id": "0008dbc5-d9ac-f555-5bcd-be02a14fc665",
      "organism_type": "Human",
      "phenotypic_sex": "Female"
    }
  ]
}
```

#### Hit 2

```json
{
  "entryId": "b3f5967d-964c-408b-a5f6-67ef279fb8b5",
  "datasets": [
    {
      "title": "ANVIL_T2T",
      "dataset_id": "1c39e90e-463c-9853-793e-7e4c8f081815"
    }
  ],
  "donors": [
    {
      "donor_id": "0008dbc5-d9ac-f555-5bcd-be02a14fc665",
      "organism_type": "Human",
      "phenotypic_sex": "Female"
    }
  ],
  "files": [
    { "file_format": ".fastq.gz", "count": 2 },
    { "file_format": ".cram", "count": 1 }
  ]
}
```

**Why?** This donor contributed samples to two different datasets:

1. `ANVIL_1000G_PRIMED_data_model` - A data model dataset
2. `ANVIL_T2T` - The T2T (Telomere-to-Telomere) project with associated sequence files

## How the ETL Handles Deduplication

### Strategy: Last-Write-Wins via Document ID

When bulk loading into OpenSearch, we use the entity's primary key (e.g., `donor_id`) as the OpenSearch document `_id`:

```python
actions = [
    {
        "_index": "anvil_donors",
        "_id": donor["donor_id"],  # Using donor_id as document ID
        "_source": donor,
    }
    for donor in all_donors
]
bulk(client, actions)
```

When OpenSearch receives a document with an `_id` that already exists, it **overwrites** the previous document. This effectively deduplicates the data.

### Observed Results

| Entity   | API Records | Unique Documents | Duplicate Rate |
| -------- | ----------- | ---------------- | -------------- |
| Donors   | 9,852       | 6,601            | 33% duplicates |
| Datasets | 369         | 369              | 0% duplicates  |

In a sample of 100 donor API records:

- 64 unique donors
- 36 duplicate records (same donor appearing 2+ times)

## Implications

### What We Preserve

- One canonical record per entity (by primary key)
- The latest/last version seen during ETL

### What We Lose

- The relationship context (which datasets a donor belongs to)
- If a donor appears in Hit 1 with Dataset A and Hit 2 with Dataset B, we only store `dataset_id` from whichever hit was processed last

### Future Consideration

To preserve multi-dataset relationships, we could:

1. **Store relationships separately:** Create a `donor_datasets` junction index
2. **Use nested arrays:** Store `dataset_ids: ["id1", "id2"]` as an array
3. **Merge during ETL:** Accumulate all dataset_ids before loading

Example of merged approach:

```python
# Accumulate all dataset associations
donor_datasets = defaultdict(set)
for hit in api_hits:
    donor_id = hit["donors"][0]["donor_id"]
    dataset_id = hit["datasets"][0]["dataset_id"]
    donor_datasets[donor_id].add(dataset_id)

# Then include in final record
record["dataset_ids"] = list(donor_datasets[donor_id])
```

## Verification Query

To check for potential data loss from deduplication, compare API totals with indexed counts:

```bash
# API total
curl -s "https://service.explore.anvilproject.org/index/donors?catalog=anvil12&size=1" | \
  jq '.pagination.total'

# OpenSearch count
curl -s "http://localhost:9200/anvil_donors/_count" | jq '.count'
```

Expected: OpenSearch count < API total (due to deduplication)
