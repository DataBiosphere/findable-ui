# Findable Backend (FastAPI)

This folder contains a minimal FastAPI backend that exposes a stubbed **query-to-facets** endpoint for experimentation and PoC work.

## Requirements

- Python 3.9+
- `pip`

## Set up a Python virtual environment

From the repo root:

```bash
python -m venv backend/.venv
source backend/.venv/bin/activate
python -m pip install --upgrade pip
```

## Install dependencies

From the repo root:

```bash
pip install -r backend/requirements.txt
```

## Run the server

From the repo root:

```bash
uvicorn backend.main:app --reload
```

The app will start on `http://127.0.0.1:8000` by default.

## Format code

From the repo root:

```bash
python -m black backend
```

### Endpoint

- **Method:** `POST`
- **Path:** `/api/v0/facets`
- **Request body:**

  ```json
  { "query": "string" }
  ```

- **Example request:**

  ```bash
  curl -sS -X POST "http://127.0.0.1:8000/api/v0/facets" \
    -H "Content-Type: application/json" \
    -d '{ "query": "public bam files for latino patients with diabetes" }'
  ```

- **Response:** currently returns a **hard-coded** JSON structure representing resolved facets for the query. This is intentionally stubbed for PoC and will be replaced by a real implementation later.
