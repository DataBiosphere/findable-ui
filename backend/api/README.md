# Findable Backend (FastAPI)

FastAPI backend for AI-powered facet selection with LLM extraction and OpenSearch normalization.

## Quick Start

```bash
# Start everything (OpenSearch + API)
make start-all

# Or start separately:
make opensearch-start  # Start OpenSearch in Docker
make dev              # Start FastAPI in development mode

# Stop everything
make stop-all
```

## Requirements

- Python 3.10+
- Docker & Docker Compose (for OpenSearch)
- OpenAI API key (optional, for LLM mode)

## Setup

### 1. Create Virtual Environment

From the `backend/api` directory:

```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

### 2. Configure OpenAI API Key (Optional)

For LLM mode, set your API key in `backend/opensearch/.env`:

```bash
OPENAI_API_KEY=sk-your-api-key-here
```

### 3. Start OpenSearch

```bash
make opensearch-start
```

Wait ~30 seconds, then verify:

```bash
curl http://localhost:9200/_cluster/health
# Should show "status":"green" or "yellow"
```

### 4. Load Concepts (if needed)

```bash
cd ../opensearch
python3 load-concepts.py --file concepts-with-synonyms.json --clear
```

## Makefile Commands

| Command                 | Description                              |
| ----------------------- | ---------------------------------------- |
| `make dev`              | Start API with auto-reload (development) |
| `make run`              | Start API (production mode)              |
| `make stop`             | Stop the API server                      |
| `make test`             | Run all tests (47 tests)                 |
| `make opensearch-start` | Start OpenSearch in Docker               |
| `make opensearch-stop`  | Stop OpenSearch                          |
| `make start-all`        | Start OpenSearch + API                   |
| `make stop-all`         | Stop everything                          |

## API Endpoint

### POST /api/v0/facets

Extract facets from a natural language query.

**URL Parameters:**

- `mode` (optional): `stub` | `mock` | `llm` (default: `stub`)

**Modes:**

- **`stub`**: Returns hardcoded stub data (for testing API structure)
- **`mock`**: Pattern matching + real OpenSearch (no API cost) ← **Recommended for testing**
- **`llm`**: Real OpenAI LLM + real OpenSearch (requires API key, costs money)

## Testing with Postman

### Example 1: Mock Mode (Recommended)

**Request:**

```
POST http://localhost:8000/api/v0/facets?mode=mock
Content-Type: application/json

{
  "query": "latino patients with diabetes and bam files"
}
```

**Response:**

```json
{
  "query": "latino patients with diabetes and bam files",
  "facets": [
    {
      "facet": "Diagnosis",
      "selectedValues": [{ "term": "Diabetes mellitus", "mention": "diabetes" }]
    },
    {
      "facet": "Reported Ethnicity",
      "selectedValues": [{ "term": "Hispanic/Latino(a)", "mention": "latino" }]
    },
    {
      "facet": "File Format",
      "selectedValues": [{ "term": ".bam", "mention": "bam" }]
    }
  ]
}
```

### Example 2: LLM Mode (Costs Money)

**Request:**

```
POST http://localhost:8000/api/v0/facets?mode=llm
Content-Type: application/json

{
  "query": "female patients with type 2 diabetes from brain tissue"
}
```

⚠️ **Requires OPENAI_API_KEY in `.env`**

### Example 3: Stub Mode

**Request:**

```
POST http://localhost:8000/api/v0/facets
Content-Type: application/json

{
  "query": "any text"
}
```

Returns hardcoded stub data (ignores query).

## Testing with cURL

```bash
# Mock mode (recommended)
curl -X POST "http://localhost:8000/api/v0/facets?mode=mock" \
  -H "Content-Type: application/json" \
  -d '{"query": "latino patients with diabetes"}'

# LLM mode (costs money)
curl -X POST "http://localhost:8000/api/v0/facets?mode=llm" \
  -H "Content-Type: application/json" \
  -d '{"query": "female patients with brain cancer"}'

# Stub mode
curl -X POST "http://localhost:8000/api/v0/facets" \
  -H "Content-Type: application/json" \
  -d '{"query": "test"}'
```

## Running Tests

```bash
# Run all tests
make test

# Run specific test file
.venv/bin/pytest tests/test_llm_extraction.py -v

# Run with coverage
.venv/bin/pytest tests/ --cov=services
```

**Test Coverage:** 47 tests

- 14 LLM extraction tests
- 12 OpenSearch integration tests
- 10 normalization tests
- 5 end-to-end integration tests
- 6 API/health tests

## Architecture

```
User Query → LLM Extraction → Normalization → OpenSearch → Structured Response
```

**Components:**

- **LLM Extraction**: Extracts mentions from natural language (Pydantic AI)
- **Normalization**: Converts mentions to canonical terms
- **OpenSearch**: Fuzzy matching + synonym expansion (Docker)

## Project Structure

```
api/
├── controllers/           # FastAPI routes
├── services/             # Business logic
│   ├── llm_mention_extractor.py
│   ├── normalization_service.py
│   ├── opensearch_concept_resolver.py
│   └── facets_service.py
├── tests/               # Test suite (47 tests)
├── main.py             # FastAPI app
├── Makefile           # Development commands
└── README.md          # This file
```

## API Documentation

When running, visit:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Troubleshooting

### OpenSearch won't start

```bash
cd ../opensearch
docker-compose logs opensearch
```

### API won't start

```bash
# Check if port 8000 is in use
lsof -i :8000

# Kill existing process
make stop
```

### Tests failing

```bash
# Ensure OpenSearch is running
make opensearch-start

# Run tests with verbose output
make test
```
