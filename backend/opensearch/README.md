# OpenSearch Concept Resolution

OpenSearch-based system for resolving user queries to canonical facet values with fuzzy matching and synonym support.

## Overview

The concept index stores facet terms and their synonyms to resolve user mentions (query strings) to canonical facet values.

**Use case:** When a user types "diabtes" (typo), we want to resolve it to the canonical term "Type 2 Diabetes" (T2D) in the disease facet.

**Features:**
- 🔍 Fuzzy matching (typo tolerance)
- 📝 Synonym expansion (GPT-generated + ontology-based)
- 🏥 Medical ontology enrichment (HP, OMIM, ORPHA)
- ⚡ Fast exact and approximate matching

## Quick Start (3 Steps)

### Prerequisites
- Docker & Docker Compose
- Python 3.10+

### Setup Python Environment

Create and activate a virtual environment:

```bash
cd backend/opensearch

# Create virtual environment
python3 -m venv .venv

# Activate it
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

Verify installation:
```bash
pip list | grep opensearch
# Should show: opensearch-py    2.8.0
```

### 1. Start OpenSearch

```bash
cd backend/opensearch
make start
```

Or manually:
```bash
docker compose up -d
```

**Wait ~30 seconds** for OpenSearch to start, then verify:
```bash
curl http://localhost:9200/_cluster/health
# Should show "status":"green"
```

### 2. Load Enriched Concepts

```bash
make clear
```

Or manually:
```bash
python3 load-concepts.py --file concepts-with-synonyms.json --clear
```

Expected output:
```
✓ Successfully inserted 1966 concepts
📊 Total documents in index: 1965
```

### Makefile Commands

- `make start` - Start OpenSearch
- `make stop` - Stop OpenSearch
- `make health` - Check if OpenSearch is ready
- `make load` - Load concepts (keeps existing data)
- `make clear` - Clear index and reload concepts

### 3. Test Search

**Search for "ACC" (abbreviation for Agenesis of Corpus Callosum):**

```bash
curl -s "http://localhost:9200/concepts/_search" \
  -H "Content-Type: application/json" \
  -d '{
    "query": {
      "bool": {
        "must": [
          {"term": {"facet_name": "diagnoses.phenotype"}},
          {"multi_match": {"query": "ACC", "fields": ["term", "name", "synonyms"]}}
        ]
      }
    },
    "size": 3
  }' | jq '.hits.hits[] | {score: ._score, name: ._source.name}'
```

Should return concepts like "Agenesis of the Corpus Callosum with Polymicrogyria"

**OpenSearch Dashboards:**
- Open http://localhost:5601 in browser
- Explore the `concepts` index visually

---

## Files in This Directory

### Infrastructure
- `docker-compose.yml` - OpenSearch + Dashboards setup
- `.env.example` - Environment variable template (copy to `.env`)
- `.gitignore` - Git ignore rules

### Schema & Configuration
- `create-concept-index.json` - OpenSearch index mapping and analyzer settings
- `sample-concepts.json` - Example concept documents
- `query-examples.json` - Query patterns for different search scenarios

### Data
- `concepts-with-synonyms.json` - **Enriched concepts ready to load (1,965 concepts)**

### Scripts & Tools
- `load-concepts.py` - Load concepts into OpenSearch
- `convert-datasets-to-concepts.py` - Convert dataset facets to concept format
- `enrich-ontology-terms.py` - Enrich ontology IDs with names from EBI OLS API
- `enrich-omim-orpha.py` - Specialized OMIM/ORPHA enrichment
- `generate-synonyms-gpt.py` - Generate synonyms using GPT-4o-mini

### Documentation
- `README.md` - This file
- `README-ENRICHMENT.md` - Enrichment process guide
- `README-OMIM.md` - OMIM enrichment notes

---

## Index Design

### Schema (Mapping)

```
concepts index
├── id (keyword) - Unique identifier
├── facet_name (keyword) - Which facet this belongs to
├── term (text) - Short canonical term (e.g., "T2D")
│   ├── .exact (keyword) - For exact matching
│   └── .fuzzy (text) - For fuzzy/synonym matching
├── name (text) - Full descriptive name
│   ├── .exact (keyword)
│   └── .fuzzy (text)
├── synonyms (text) - Array of alternative names
│   └── .exact (keyword)
└── metadata (object) - Additional structured data
```

### Multi-field Strategy

Each searchable text field has two sub-fields:
- **`.exact`** (keyword type) - For exact case-insensitive matching (fastest)
- **`.fuzzy`** (text type) - For fuzzy matching with typo tolerance

### Analyzers

**concept_exact** - Keyword tokenizer + lowercase
- No tokenization, treats input as single token
- Only lowercase normalization
- Used for exact matching

**concept_fuzzy** - Standard tokenizer + lowercase + synonyms
- Tokenizes on whitespace/punctuation
- Lowercase normalization
- Synonym filter (expandable)
- Used for fuzzy/typo matching

### Query Strategy

For a given mention string, we query in order of preference:

1. **Exact match** (highest priority)
   - `term.exact`, `name.exact`, `synonyms.exact`
   - Fastest, no scoring overhead

2. **Fuzzy match with boosting**
   - `term.fuzzy^2`, `name.fuzzy^1.5`, `synonyms`
   - Uses `fuzziness: AUTO` for typo tolerance
   - Boost exact matches higher

3. **Synonym expansion**
   - Built into the `concept_fuzzy` analyzer
   - Automatically matches synonym variants

## Python Integration

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Example Service

```python
from opensearchpy import OpenSearch
from typing import List, Dict, Optional

class ConceptResolver:
    def __init__(self, host: str = "localhost", port: int = 9200):
        self.client = OpenSearch(
            hosts=[{"host": host, "port": port}],
            http_compress=True,
            use_ssl=False,
            verify_certs=False
        )
        self.index_name = "concepts"

    def resolve_mention(
        self,
        facet_name: str,
        mention: str,
        top_k: int = 5
    ) -> List[Dict]:
        """
        Resolve a user mention to facet concepts.

        Args:
            facet_name: The facet to search within (e.g., "disease")
            mention: The user's query string (e.g., "diabtes")
            top_k: Number of results to return

        Returns:
            List of matching concepts with scores
        """
        query = {
            "query": {
                "bool": {
                    "must": [
                        {"term": {"facet_name": facet_name}}
                    ],
                    "should": [
                        # Exact matches (highest priority)
                        {"term": {"term.exact": mention}},
                        {"term": {"name.exact": mention}},
                        {"term": {"synonyms.exact": mention}},

                        # Fuzzy matches with boosting
                        {
                            "match": {
                                "term.fuzzy": {
                                    "query": mention,
                                    "fuzziness": "AUTO",
                                    "boost": 2.0
                                }
                            }
                        },
                        {
                            "match": {
                                "name.fuzzy": {
                                    "query": mention,
                                    "fuzziness": "AUTO",
                                    "boost": 1.5
                                }
                            }
                        },
                        {
                            "match": {
                                "synonyms": {
                                    "query": mention,
                                    "fuzziness": "AUTO"
                                }
                            }
                        }
                    ],
                    "minimum_should_match": 1
                }
            },
            "size": top_k
        }

        response = self.client.search(index=self.index_name, body=query)

        return [
            {
                "score": hit["_score"],
                "id": hit["_source"]["id"],
                "term": hit["_source"]["term"],
                "name": hit["_source"]["name"],
                "metadata": hit["_source"].get("metadata", {})
            }
            for hit in response["hits"]["hits"]
        ]

# Usage
resolver = ConceptResolver()
results = resolver.resolve_mention("disease", "diabtes")
for result in results:
    print(f"Score: {result['score']:.2f}, Term: {result['term']}, Name: {result['name']}")
```

## Fuzziness Explained

`"fuzziness": "AUTO"` uses Levenshtein edit distance:
- **0 edits** for 1-2 character terms (no typos allowed for short terms)
- **1 edit** for 3-5 character terms (1 character different)
- **2 edits** for 6+ character terms (2 characters different)

Examples:
- "diabtes" → "diabetes" (1 edit, matches)
- "brian" → "brain" (1 edit, matches)
- "unitd states" → "united states" (1 edit, matches)

You can also set explicit values: `"fuzziness": "1"` or `"fuzziness": "2"`

## Adding More Concepts

### Via Bulk API (recommended for many documents)

```python
from opensearchpy import OpenSearch, helpers

client = OpenSearch([{"host": "localhost", "port": 9200}])

concepts = [
    {
        "_index": "concepts",
        "_id": "gene-001",
        "_source": {
            "id": "gene-001",
            "facet_name": "gene",
            "term": "BRCA1",
            "name": "Breast Cancer Type 1 Susceptibility Protein",
            "synonyms": ["BRCA1", "RING finger protein 53"],
            "metadata": {"entrez_id": "672"}
        }
    },
    # ... more concepts
]

helpers.bulk(client, concepts)
```

### Via Single Document Insert

```bash
curl -X POST "http://localhost:9200/concepts/_doc/gene-001" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "gene-001",
    "facet_name": "gene",
    "term": "BRCA1",
    "name": "Breast Cancer Type 1 Susceptibility Protein",
    "synonyms": ["BRCA1", "RING finger protein 53"],
    "metadata": {"entrez_id": "672"}
  }'
```

## Next Steps

1. **Synonym expansion**: Add domain-specific synonyms to the synonym filter
2. **N-gram matching**: Add edge n-grams for prefix matching
3. **Caching**: Cache common mention → concept resolutions
4. **Analytics**: Track which mentions fail to resolve
5. **Feedback loop**: Learn from user selections to improve ranking
