.PHONY: test run stop dev opensearch-start opensearch-stop

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
