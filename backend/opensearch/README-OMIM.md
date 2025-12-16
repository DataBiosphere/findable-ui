# Enriching OMIM Terms

## Why OMIM Enrichment Failed

OMIM (Online Mendelian Inheritance in Man) contains:

- **Genes** (e.g., OMIM:137580)
- **Phenotypes/Diseases** (most of your data)

MyGene.info API only covers **gene** entries, which is why only 8/191 enriched.

## Option 1: Use Official OMIM API (Recommended)

### Get Free API Key

1. Visit https://omim.org/api
2. Register for a free API key (academic use)
3. Add to your `.env` file:
   ```bash
   OMIM_API_KEY=your_key_here
   ```

### Update Enrichment Script

I can create a script that uses the OMIM API key to enrich the remaining 183 terms.

## Option 2: Use Monarch Initiative API (No Key Required)

The Monarch Initiative aggregates phenotype data including OMIM.

API: https://api.monarchinitiative.org/

## Option 3: Leave OMIM IDs As-Is

For now, you have:

- ✅ 363 HP terms (human-readable names)
- ✅ 99 ORPHA terms (human-readable names)
- ⚠️ 183 OMIM terms (still as IDs like "OMIM:615369")

Users can still search by OMIM ID directly. The IDs are searchable even without names.

## Current State

**What works now:**

```bash
# Search for "Adenocarcinoma" (ORPHA term)
curl "http://localhost:9200/concepts/_search" -d '{
  "query": {"match": {"name": "Adenocarcinoma"}}
}'
# Returns: ORPHA:104075 - Adenocarcinoma of the small intestine

# Search for "seizure" (HP term)
curl "http://localhost:9200/concepts/_search" -d '{
  "query": {"match": {"name": "seizure"}}
}'
# Returns: HP:0001250 - Seizure

# Search by OMIM ID (still works)
curl "http://localhost:9200/concepts/_search" -d '{
  "query": {"term": {"term": "OMIM:615369"}}
}'
# Returns: OMIM:615369 (no human name yet)
```

## Recommendation

**For now:** Load the 470 enriched terms and use them! 72% coverage is great.

**Later:** Get an OMIM API key to enrich the remaining 183 terms.

The enriched HP and ORPHA terms cover the most common use cases (phenotypes and rare diseases).
