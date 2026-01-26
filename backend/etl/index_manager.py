"""
OpenSearch index manager.

Creates, deletes, and manages OpenSearch indices based on configuration.
"""

import logging
import sys
from pathlib import Path
from typing import Any, Optional

from opensearchpy import OpenSearch

# Add the api directory to path for config imports
sys.path.insert(0, str(Path(__file__).parent.parent / "api"))

from configs.loader import get_config
from configs.models import ExplorerConfig, IndexConfig

logger = logging.getLogger(__name__)


class IndexManager:
    """
    Manages OpenSearch indices based on configuration.

    Creates indices with proper mappings, handles index lifecycle operations.
    """

    def __init__(
        self,
        host: str = "localhost",
        port: int = 9200,
        use_ssl: bool = False,
        verify_certs: bool = False,
        http_auth: Optional[tuple[str, str]] = None,
        config: Optional[ExplorerConfig] = None,
    ):
        """
        Initialize the index manager.

        @param host - OpenSearch host.
        @param port - OpenSearch port.
        @param use_ssl - Whether to use SSL.
        @param verify_certs - Whether to verify SSL certificates.
        @param http_auth - Optional (username, password) tuple.
        @param config - Explorer configuration (loaded if not provided).
        """
        self.host = host
        self.port = port
        self.use_ssl = use_ssl
        self.verify_certs = verify_certs
        self.http_auth = http_auth
        self._client: Optional[OpenSearch] = None
        self._config = config

    def _get_client(self) -> OpenSearch:
        """
        Get or create OpenSearch client.

        @returns OpenSearch client instance.
        """
        if self._client is None:
            self._client = OpenSearch(
                hosts=[{"host": self.host, "port": self.port}],
                use_ssl=self.use_ssl,
                verify_certs=self.verify_certs,
                http_auth=self.http_auth,
            )
        return self._client

    def _get_config(self, scope: str = "anvil") -> ExplorerConfig:
        """
        Get explorer configuration.

        @param scope - Configuration scope.
        @returns Explorer configuration.
        """
        if self._config is None:
            self._config = get_config(scope)
        return self._config

    def close(self) -> None:
        """Close the OpenSearch client connection."""
        if self._client is not None:
            self._client.close()
            self._client = None

    def __enter__(self) -> "IndexManager":
        """Context manager entry."""
        return self

    def __exit__(self, exc_type: Any, exc_val: Any, exc_tb: Any) -> None:
        """Context manager exit."""
        self.close()

    def _build_mapping_body(self, index_config: IndexConfig) -> dict[str, Any]:
        """
        Build OpenSearch mapping body from config.

        @param index_config - Index configuration.
        @returns OpenSearch mapping body dict.
        """
        properties = {}

        for field_name, field_mapping in index_config.mappings.items():
            prop = {"type": field_mapping.type}

            if field_mapping.index is not None:
                prop["index"] = field_mapping.index
            if field_mapping.doc_values is not None:
                prop["doc_values"] = field_mapping.doc_values
            if field_mapping.fields:
                prop["fields"] = field_mapping.fields

            properties[field_name] = prop

        return {
            "settings": index_config.settings,
            "mappings": {
                "properties": properties,
            },
        }

    def create_index(
        self,
        index_name: str,
        index_config: Optional[IndexConfig] = None,
        scope: str = "anvil",
    ) -> bool:
        """
        Create an index with the specified configuration.

        @param index_name - Name of index to create.
        @param index_config - Index configuration (loaded from config if not provided).
        @param scope - Configuration scope for loading config.
        @returns True if created, False if already exists.
        """
        client = self._get_client()

        if client.indices.exists(index=index_name):
            logger.info(f"Index {index_name} already exists")
            return False

        if index_config is None:
            config = self._get_config(scope)
            index_config = config.get_index(index_name)

        if index_config is None:
            logger.warning(f"No configuration found for index {index_name}")
            # Create with default settings
            client.indices.create(index=index_name)
            logger.info(f"Created index {index_name} with default settings")
            return True

        body = self._build_mapping_body(index_config)

        client.indices.create(index=index_name, body=body)
        logger.info(f"Created index {index_name}")
        return True

    def delete_index(self, index_name: str) -> bool:
        """
        Delete an index.

        @param index_name - Name of index to delete.
        @returns True if deleted, False if didn't exist.
        """
        client = self._get_client()

        if not client.indices.exists(index=index_name):
            logger.info(f"Index {index_name} does not exist")
            return False

        client.indices.delete(index=index_name)
        logger.info(f"Deleted index {index_name}")
        return True

    def recreate_index(
        self,
        index_name: str,
        index_config: Optional[IndexConfig] = None,
        scope: str = "anvil",
    ) -> None:
        """
        Delete and recreate an index.

        @param index_name - Name of index to recreate.
        @param index_config - Index configuration.
        @param scope - Configuration scope.
        """
        self.delete_index(index_name)
        self.create_index(index_name, index_config, scope)

    def create_all_indices(self, scope: str = "anvil") -> dict[str, bool]:
        """
        Create all indices defined in configuration.

        @param scope - Configuration scope.
        @returns Dict mapping index names to creation status.
        """
        config = self._get_config(scope)
        results = {}

        for index_name, index_config in config.indexes_config.indexes.items():
            results[index_name] = self.create_index(index_name, index_config, scope)

        return results

    def delete_all_indices(self, scope: str = "anvil") -> dict[str, bool]:
        """
        Delete all indices defined in configuration.

        @param scope - Configuration scope.
        @returns Dict mapping index names to deletion status.
        """
        config = self._get_config(scope)
        results = {}

        for index_name in config.indexes_config.indexes:
            results[index_name] = self.delete_index(index_name)

        return results

    def recreate_all_indices(self, scope: str = "anvil") -> None:
        """
        Delete and recreate all indices.

        @param scope - Configuration scope.
        """
        self.delete_all_indices(scope)
        self.create_all_indices(scope)

    def index_exists(self, index_name: str) -> bool:
        """
        Check if an index exists.

        @param index_name - Index name to check.
        @returns True if exists.
        """
        client = self._get_client()
        return client.indices.exists(index=index_name)

    def get_index_stats(self, index_name: str) -> dict[str, Any]:
        """
        Get statistics for an index.

        @param index_name - Index name.
        @returns Index statistics dict.
        """
        client = self._get_client()

        if not client.indices.exists(index=index_name):
            return {"exists": False}

        stats = client.indices.stats(index=index_name)
        count = client.count(index=index_name)

        return {
            "exists": True,
            "doc_count": count.get("count", 0),
            "size_in_bytes": stats.get("_all", {})
            .get("primaries", {})
            .get("store", {})
            .get("size_in_bytes", 0),
        }

    def list_indices(self, pattern: str = "anvil_*") -> list[str]:
        """
        List indices matching a pattern.

        @param pattern - Index name pattern.
        @returns List of matching index names.
        """
        client = self._get_client()
        indices = client.indices.get(index=pattern, ignore_unavailable=True)
        return list(indices.keys())
