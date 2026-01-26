"""
ETL Pipeline orchestration.

Coordinates the full ETL process: extract from AnVIL, transform,
enrich with meta-disco, and load into OpenSearch.
"""

import logging
import sys
from pathlib import Path
from typing import Any, Optional

# Add the api directory to path for config imports
sys.path.insert(0, str(Path(__file__).parent.parent / "api"))

from configs.loader import get_config
from configs.models import ExplorerConfig
from etl.anvil_client import AnVILClient, MockAnVILClient
from etl.entity_transformer import EntityTransformer
from etl.index_manager import IndexManager
from etl.meta_disco_enricher import MetaDiscoEnricher
from etl.opensearch_loader import OpenSearchLoader

logger = logging.getLogger(__name__)


class ETLPipeline:
    """
    Orchestrates the full ETL pipeline.

    Coordinates extraction from AnVIL API, transformation, meta-disco enrichment,
    and loading into OpenSearch indices.
    """

    def __init__(
        self,
        scope: str = "anvil",
        opensearch_host: str = "localhost",
        opensearch_port: int = 9200,
        enrichment_file: Optional[Path] = None,
        anvil_client: Optional[AnVILClient] = None,
        dry_run: bool = False,
    ):
        """
        Initialize the ETL pipeline.

        @param scope - Configuration scope (e.g., 'anvil').
        @param opensearch_host - OpenSearch host.
        @param opensearch_port - OpenSearch port.
        @param enrichment_file - Path to meta-disco enrichment file.
        @param anvil_client - Optional custom AnVIL client (for testing).
        @param dry_run - If True, don't write to OpenSearch.
        """
        self.scope = scope
        self.opensearch_host = opensearch_host
        self.opensearch_port = opensearch_port
        self.enrichment_file = enrichment_file
        self.dry_run = dry_run

        self._config: Optional[ExplorerConfig] = None
        self._anvil_client = anvil_client
        self._enricher: Optional[MetaDiscoEnricher] = None
        self._transformer: Optional[EntityTransformer] = None
        self._loader: Optional[OpenSearchLoader] = None
        self._index_manager: Optional[IndexManager] = None

    def _get_config(self) -> ExplorerConfig:
        """Get explorer configuration."""
        if self._config is None:
            self._config = get_config(self.scope)
        return self._config

    def _get_anvil_client(self) -> AnVILClient:
        """Get AnVIL API client."""
        if self._anvil_client is None:
            self._anvil_client = AnVILClient()
        return self._anvil_client

    def _get_enricher(self) -> MetaDiscoEnricher:
        """Get meta-disco enricher."""
        if self._enricher is None:
            self._enricher = MetaDiscoEnricher(self.enrichment_file)
        return self._enricher

    def _get_transformer(self) -> EntityTransformer:
        """Get entity transformer."""
        if self._transformer is None:
            self._transformer = EntityTransformer(self.scope)
        return self._transformer

    def _get_loader(self) -> OpenSearchLoader:
        """Get OpenSearch loader."""
        if self._loader is None:
            self._loader = OpenSearchLoader(
                host=self.opensearch_host,
                port=self.opensearch_port,
            )
        return self._loader

    def _get_index_manager(self) -> IndexManager:
        """Get index manager."""
        if self._index_manager is None:
            self._index_manager = IndexManager(
                host=self.opensearch_host,
                port=self.opensearch_port,
                config=self._get_config(),
            )
        return self._index_manager

    def setup_indices(self, recreate: bool = False) -> dict[str, bool]:
        """
        Set up OpenSearch indices.

        @param recreate - If True, delete and recreate existing indices.
        @returns Dict mapping index names to creation status.
        """
        manager = self._get_index_manager()

        if self.dry_run:
            logger.info("[DRY RUN] Would set up indices")
            return {}

        if recreate:
            manager.recreate_all_indices(self.scope)
            return {idx: True for idx in self._get_config().indexes_config.indexes}
        else:
            return manager.create_all_indices(self.scope)

    def run(
        self,
        entity: Optional[str] = None,
        max_pages: Optional[int] = None,
        full_refresh: bool = False,
    ) -> dict[str, Any]:
        """
        Run the full ETL pipeline.

        @param entity - Specific entity to process (None for all).
        @param max_pages - Maximum pages to fetch per entity (for testing).
        @param full_refresh - If True, recreate indices before loading.
        @returns Dict with processing statistics.
        """
        logger.info(f"Starting ETL pipeline for scope: {self.scope}")

        config = self._get_config()
        client = self._get_anvil_client()
        transformer = self._get_transformer()
        enricher = self._get_enricher()
        loader = self._get_loader()

        # Set up indices
        if full_refresh:
            self.setup_indices(recreate=True)
        else:
            self.setup_indices(recreate=False)

        # Determine which entities to process
        entities_to_process = (
            [entity] if entity else list(config.schema_config.entities.keys())
        )

        # Build index and ID field mappings
        index_mapping = {}
        id_fields = {}
        for entity_name in entities_to_process:
            entity_def = config.get_entity(entity_name)
            if entity_def:
                index_mapping[entity_name] = entity_def.index
                id_fields[entity_name] = entity_def.id_field

        # Accumulate all entities
        all_entities: dict[str, list[dict[str, Any]]] = {
            name: [] for name in entities_to_process
        }

        # Process API hits
        # Note: AnVIL API returns denormalized data, so we fetch 'projects' or similar
        # and extract all entity types from each hit
        logger.info("Fetching data from AnVIL API...")

        hit_count = 0
        for hit in client.fetch_all("projects", max_pages=max_pages):
            hit_count += 1

            # Transform hit into entity records
            transformed = transformer.transform_hit(hit)

            # Accumulate records by entity type
            for entity_name in entities_to_process:
                if entity_name in transformed:
                    all_entities[entity_name].extend(transformed[entity_name])

        logger.info(f"Processed {hit_count} API hits")

        # Enrich file records with meta-disco data
        if "files" in all_entities:
            logger.info("Enriching files with meta-disco data...")
            all_entities["files"] = enricher.enrich_files(all_entities["files"])

        # Deduplicate
        logger.info("Deduplicating records...")
        all_entities = transformer.deduplicate_entities(all_entities)

        # Log counts
        for entity_name, records in all_entities.items():
            logger.info(f"  {entity_name}: {len(records)} records")

        # Load into OpenSearch
        if self.dry_run:
            logger.info("[DRY RUN] Would load records to OpenSearch")
            results = {
                name: {"success": len(recs), "failed": 0}
                for name, recs in all_entities.items()
            }
        else:
            logger.info("Loading records into OpenSearch...")
            results = loader.load_entities(
                all_entities,
                index_mapping,
                id_fields,
                refresh=True,
            )

        return {
            "scope": self.scope,
            "hits_processed": hit_count,
            "entities": {
                name: {
                    "records": len(all_entities.get(name, [])),
                    "loaded": results.get(name, {}),
                }
                for name in entities_to_process
            },
            "dry_run": self.dry_run,
        }

    def run_single_entity(
        self,
        entity: str,
        records: list[dict[str, Any]],
        full_refresh: bool = False,
    ) -> dict[str, Any]:
        """
        Load records for a single entity type directly.

        Useful for testing or manual data loading.

        @param entity - Entity name to load.
        @param records - List of entity records.
        @param full_refresh - If True, recreate index before loading.
        @returns Load statistics.
        """
        config = self._get_config()
        loader = self._get_loader()
        manager = self._get_index_manager()

        entity_def = config.get_entity(entity)
        if not entity_def:
            raise ValueError(f"Unknown entity: {entity}")

        if self.dry_run:
            logger.info(f"[DRY RUN] Would load {len(records)} {entity} records")
            return {"success": len(records), "failed": 0}

        if full_refresh:
            manager.recreate_index(entity_def.index, scope=self.scope)
        else:
            manager.create_index(entity_def.index, scope=self.scope)

        return loader.load(
            entity_def.index,
            records,
            entity_def.id_field,
            refresh=True,
        )

    def close(self) -> None:
        """Clean up resources."""
        if self._anvil_client:
            self._anvil_client.close()
        if self._loader:
            self._loader.close()
        if self._index_manager:
            self._index_manager.close()

    def __enter__(self) -> "ETLPipeline":
        """Context manager entry."""
        return self

    def __exit__(self, exc_type: Any, exc_val: Any, exc_tb: Any) -> None:
        """Context manager exit."""
        self.close()
