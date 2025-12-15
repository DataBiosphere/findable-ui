.PHONY: start stop load clear health

start:
	docker compose up -d
	@echo "OpenSearch starting... wait ~30 seconds for it to be ready"
	@echo "Run 'make health' to check if it's ready"

stop:
	docker compose down

load:
	python3 load-concepts.py --file concepts-with-synonyms.json

clear:
	python3 load-concepts.py --file concepts-with-synonyms.json --clear

health:
	@curl -s http://localhost:9200/_cluster/health | python3 -m json.tool
