.PHONY: start stop load clear

start:
	docker compose up -d
	@echo "OpenSearch starting... wait ~30 seconds for it to be ready"

stop:
	docker compose down

load:
	python3 load-concepts.py --file concepts-with-synonyms.json

clear:
	python3 load-concepts.py --file concepts-with-synonyms.json --clear
