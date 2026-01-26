"""
OpenSearch bulk loader for entity records.

Provides efficient bulk loading of entity records into OpenSearch indices.
"""

import logging
from typing import Any, Iterator, Optional

from opensearchpy import OpenSearch
from opensearchpy.helpers import bulk, BulkIndexError

logger = logging.getLogger(__name__)

# Default bulk operation settings
DEFAULT_CHUNK_SIZE = 500
DEFAULT_TIMEOUT = 60


class OpenSearchLoader:
    """
    Bulk loads entity records into OpenSearch indices.

    Uses the opensearch-py bulk helper for efficient indexing.
    """

    def __init__(
        self,
        host: str = "localhost",
        port: int = 9200,
        use_ssl: bool = False,
        verify_certs: bool = False,
        http_auth: Optional[tuple[str, str]] = None,
        chunk_size: int = DEFAULT_CHUNK_SIZE,
        timeout: int = DEFAULT_TIMEOUT,
    ):
        """
        Initialize the loader.

        @param host - OpenSearch host.
        @param port - OpenSearch port.
        @param use_ssl - Whether to use SSL.
        @param verify_certs - Whether to verify SSL certificates.
        @param http_auth - Optional (username, password) tuple.
        @param chunk_size - Number of records per bulk request.
        @param timeout - Request timeout in seconds.
        """
        self.host = host
        self.port = port
        self.use_ssl = use_ssl
        self.verify_certs = verify_certs
        self.http_auth = http_auth
        self.chunk_size = chunk_size
        self.timeout = timeout
        self._client: Optional[OpenSearch] = None

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
                timeout=self.timeout,
            )
        return self._client

    def close(self) -> None:
        """Close the OpenSearch client connection."""
        if self._client is not None:
            self._client.close()
            self._client = None

    def __enter__(self) -> "OpenSearchLoader":
        """Context manager entry."""
        return self

    def __exit__(self, exc_type: Any, exc_val: Any, exc_tb: Any) -> None:
        """Context manager exit."""
        self.close()

    def _generate_actions(
        self,
        index_name: str,
        records: list[dict[str, Any]],
        id_field: str,
    ) -> Iterator[dict[str, Any]]:
        """
        Generate bulk action dicts for OpenSearch.

        @param index_name - Target index name.
        @param records - List of records to index.
        @param id_field - Field to use as document ID.
        @yields Bulk action dictionaries.
        """
        for record in records:
            doc_id = record.get(id_field)
            if not doc_id:
                logger.warning(f"Record missing {id_field}, skipping: {record}")
                continue

            yield {
                "_index": index_name,
                "_id": doc_id,
                "_source": record,
            }

    def load(
        self,
        index_name: str,
        records: list[dict[str, Any]],
        id_field: str,
        refresh: bool = False,
    ) -> dict[str, int]:
        """
        Bulk load records into an index.

        @param index_name - Target index name.
        @param records - List of records to index.
        @param id_field - Field to use as document ID.
        @param refresh - Whether to refresh index after load.
        @returns Dict with success/failed counts.
        """
        client = self._get_client()

        if not records:
            logger.info(f"No records to load for {index_name}")
            return {"success": 0, "failed": 0}

        logger.info(f"Loading {len(records)} records into {index_name}")

        actions = list(self._generate_actions(index_name, records, id_field))

        try:
            success, failed = bulk(
                client,
                actions,
                chunk_size=self.chunk_size,
                raise_on_error=False,
                raise_on_exception=False,
            )

            result = {
                "success": success,
                "failed": len(failed) if isinstance(failed, list) else failed,
            }

            if result["failed"] > 0:
                logger.warning(
                    f"Bulk load to {index_name}: {result['success']} success, "
                    f"{result['failed']} failed"
                )
            else:
                logger.info(f"Bulk load to {index_name}: {result['success']} success")

            if refresh:
                client.indices.refresh(index=index_name)
                logger.debug(f"Refreshed index {index_name}")

            return result

        except BulkIndexError as e:
            logger.error(f"Bulk index error: {e}")
            return {"success": 0, "failed": len(records)}

    def load_entities(
        self,
        entities: dict[str, list[dict[str, Any]]],
        index_mapping: dict[str, str],
        id_fields: dict[str, str],
        refresh: bool = True,
    ) -> dict[str, dict[str, int]]:
        """
        Load multiple entity types into their respective indices.

        @param entities - Dict mapping entity names to lists of records.
        @param index_mapping - Dict mapping entity names to index names.
        @param id_fields - Dict mapping entity names to ID field names.
        @param refresh - Whether to refresh indices after load.
        @returns Dict mapping entity names to load results.
        """
        results = {}

        for entity_name, records in entities.items():
            index_name = index_mapping.get(entity_name)
            id_field = id_fields.get(entity_name)

            if not index_name:
                logger.warning(f"No index mapping for entity {entity_name}")
                continue
            if not id_field:
                logger.warning(f"No ID field mapping for entity {entity_name}")
                continue

            results[entity_name] = self.load(
                index_name, records, id_field, refresh=refresh
            )

        return results

    def count(self, index_name: str) -> int:
        """
        Get document count for an index.

        @param index_name - Index name to count.
        @returns Document count.
        """
        client = self._get_client()
        try:
            result = client.count(index=index_name)
            return result.get("count", 0)
        except Exception as e:
            logger.error(f"Error counting {index_name}: {e}")
            return 0

    def delete_by_query(
        self, index_name: str, query: dict[str, Any], refresh: bool = True
    ) -> int:
        """
        Delete documents matching a query.

        @param index_name - Target index.
        @param query - OpenSearch query dict.
        @param refresh - Whether to refresh after delete.
        @returns Number of deleted documents.
        """
        client = self._get_client()

        result = client.delete_by_query(
            index=index_name,
            body={"query": query},
            refresh=refresh,
        )

        deleted = result.get("deleted", 0)
        logger.info(f"Deleted {deleted} documents from {index_name}")
        return deleted
