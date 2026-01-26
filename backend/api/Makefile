.PHONY: test run stop dev opensearch-start opensearch-stop \
	eval-simple eval-simple-baseline eval-llm eval-llm-baseline eval-multistage eval-all

# Run tests
test:
	.venv/bin/pytest tests/ -v

# Run the FastAPI server (production mode)
run:
	.venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000

# Run the FastAPI server in development mode (auto-reload)
dev:
	.venv/bin/uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Stop the FastAPI server (kills uvicorn process)
stop:
	@echo "Stopping FastAPI server..."
	@pkill -f "uvicorn main:app" || echo "No running server found"

# Start OpenSearch in Docker
opensearch-start:
	@echo "Starting OpenSearch..."
	cd ../opensearch && docker-compose up -d
	@echo "Waiting for OpenSearch to be ready..."
	@sleep 5
	@curl -s http://localhost:9200/_cluster/health || echo "OpenSearch not ready yet"

# Stop OpenSearch Docker containers
opensearch-stop:
	@echo "Stopping OpenSearch..."
	cd ../opensearch && docker-compose down

# Start everything (OpenSearch + API in dev mode)
start-all: opensearch-start dev

# Stop everything
stop-all: stop opensearch-stop

# ============================================================================
# Evaluation Commands
# ============================================================================

# Simple extraction eval (Stage 1 only - no facet assignment)
eval-simple:
	PYTHONPATH=. .venv/bin/python evals/run_simple_extraction_eval.py --dataset llm_extraction_tests.csv

# Save simple extraction baseline
eval-simple-baseline:
	PYTHONPATH=. .venv/bin/python evals/run_simple_extraction_eval.py --dataset llm_extraction_tests.csv --save-baseline

# LLM extraction eval (full pipeline with facet assignment)
eval-llm:
	PYTHONPATH=. .venv/bin/python evals/run_llm_extraction_eval.py --dataset llm_extraction_tests.csv --mode llm

# Save LLM extraction baseline
eval-llm-baseline:
	PYTHONPATH=. .venv/bin/python evals/run_llm_extraction_eval.py --dataset llm_extraction_tests.csv --mode llm --save-baseline

# Multistage pipeline eval (4-stage: extract → lookup → normalize → re-lookup)
eval-multistage:
	PYTHONPATH=. .venv/bin/python evals/run_llm_extraction_eval.py --dataset llm_extraction_tests.csv --mode multistage

# Run all evals
eval-all: eval-simple eval-llm eval-multistage

# ============================================================================
# ETL Pipeline Commands
# ============================================================================

# Create OpenSearch indices from config
etl-create-indices:
	PYTHONPATH=.:.. .venv/bin/python -m etl create-indices --scope anvil

# Delete all OpenSearch indices
etl-delete-indices:
	PYTHONPATH=.:.. .venv/bin/python -m etl delete-indices --scope anvil

# List OpenSearch indices with stats
etl-list-indices:
	PYTHONPATH=.:.. .venv/bin/python -m etl list-indices

# Recreate indices (delete + create)
etl-recreate-indices:
	PYTHONPATH=.:.. .venv/bin/python -m etl create-indices --scope anvil --recreate

# Run ETL pipeline (dry run)
etl-dry-run:
	PYTHONPATH=.:.. .venv/bin/python -m etl --scope anvil --dry-run

# Run ETL pipeline (full refresh)
etl-full-refresh:
	PYTHONPATH=.:.. .venv/bin/python -m etl --scope anvil --full-refresh

# Run ETL for specific entity
etl-entity:
	@echo "Usage: make etl-entity ENTITY=files"
	PYTHONPATH=.:.. .venv/bin/python -m etl --scope anvil --entity $(ENTITY)

# Run ETL with limited pages (for testing)
etl-test:
	PYTHONPATH=.:.. .venv/bin/python -m etl --scope anvil --max-pages 2 --dry-run -v
