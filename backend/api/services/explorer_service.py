"""
Explorer Service - main query orchestration.

Provides the core query functionality for the Generic Data Explorer,
including filtering, sorting, aggregation, and relaxation suggestions.
"""

import logging
import time
from typing import Any, Optional

from opensearchpy import OpenSearch

from configs.loader import get_config
from configs.models import ExplorerConfig
from services.explorer_models import (
    AggregateRequest,
    AggregateResult,
    Bucket,
    CountRequest,
    CountResult,
    FilterSpec,
    QueryRequest,
    QueryResult,
)
from services.query_builder import QueryBuilder
from services.relaxation_service import RelaxationService

logger = logging.getLogger(__name__)


class ExplorerService:
    """
    Main service for data exploration queries.

    Provides:
    - Filtered queries with AND/OR/NOT support
    - Pagination with cursor-based navigation
    - Sorting on any sortable field
    - Aggregations (group by with counts)
    - Filter relaxation suggestions when results are empty
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
        Initialize the Explorer Service.

        @param host - OpenSearch host.
        @param port - OpenSearch port.
        @param use_ssl - Whether to use SSL.
        @param verify_certs - Whether to verify SSL certificates.
        @param http_auth - Optional (username, password) tuple.
        @param config - Explorer configuration (loaded if not provided).
        """
        self.host = host
        self.port = port
        self._client: Optional[OpenSearch] = None
        self._config = config
        self._query_builder: Optional[QueryBuilder] = None
        self._relaxation_service: Optional[RelaxationService] = None

        self._client_kwargs = {
            "hosts": [{"host": host, "port": port}],
            "use_ssl": use_ssl,
            "verify_certs": verify_certs,
        }
        if http_auth:
            self._client_kwargs["http_auth"] = http_auth

    def _get_client(self) -> OpenSearch:
        """Get or create OpenSearch client."""
        if self._client is None:
            self._client = OpenSearch(**self._client_kwargs)
        return self._client

    def _get_config(self, scope: str = "anvil") -> ExplorerConfig:
        """Get explorer configuration."""
        if self._config is None:
            self._config = get_config(scope)
        return self._config

    def _get_query_builder(self) -> QueryBuilder:
        """Get query builder instance."""
        if self._query_builder is None:
            self._query_builder = QueryBuilder()
        return self._query_builder

    def _get_relaxation_service(self) -> RelaxationService:
        """Get relaxation service instance."""
        if self._relaxation_service is None:
            self._relaxation_service = RelaxationService(
                self._get_client(),
                self._get_query_builder(),
            )
        return self._relaxation_service

    def _get_index_name(self, scope: str, entity: str) -> str:
        """
        Get the index name for an entity.

        @param scope - Configuration scope.
        @param entity - Entity name.
        @returns OpenSearch index name.
        @raises ValueError - If entity not found in config.
        """
        config = self._get_config(scope)
        entity_def = config.get_entity(entity)
        if not entity_def:
            raise ValueError(f"Unknown entity: {entity}")
        return entity_def.index

    def query(
        self,
        request: QueryRequest,
        session_filters: Optional[dict[str, FilterSpec]] = None,
    ) -> QueryResult:
        """
        Execute a query with filters, sorting, and pagination.

        @param request - Query request parameters.
        @param session_filters - Filters from session to merge with request filters.
        @returns Query result with documents and pagination info.
        """
        start_time = time.time()
        client = self._get_client()
        query_builder = self._get_query_builder()

        index_name = self._get_index_name(request.scope, request.entity)

        # Merge session filters with request filters (request filters override)
        filters = {}
        if session_filters:
            filters.update(session_filters)
        if request.filters:
            filters.update(request.filters)

        # Decode cursor if provided
        search_after = None
        if request.cursor:
            search_after = query_builder.decode_cursor(request.cursor)

        # Build and execute query
        body = query_builder.build_search_body(
            filters=filters,
            sort_by=request.sort_by,
            sort_order=request.sort_order,
            limit=request.limit,
            search_after=search_after,
        )

        logger.debug(f"Query body: {body}")

        # Handle different return types
        if request.return_type == "count":
            count_body = query_builder.build_count_body(filters)
            response = client.count(index=index_name, body=count_body)
            elapsed_ms = int((time.time() - start_time) * 1000)
            return QueryResult(
                count=response.get("count", 0),
                results=[],
                query_time_ms=elapsed_ms,
            )

        response = client.search(index=index_name, body=body)

        hits = response.get("hits", {})
        total = hits.get("total", {})
        total_count = total.get("value", 0) if isinstance(total, dict) else total

        results = []
        last_sort = None

        for hit in hits.get("hits", []):
            doc = hit.get("_source", {})
            doc["_id"] = hit.get("_id")
            results.append(doc)
            last_sort = hit.get("sort")

        # Build cursor for next page
        next_cursor = None
        if last_sort and len(results) == request.limit:
            next_cursor = query_builder.encode_cursor(last_sort)

        elapsed_ms = int((time.time() - start_time) * 1000)

        # For "ids" return type, extract just the IDs
        if request.return_type == "ids":
            config = self._get_config(request.scope)
            entity_def = config.get_entity(request.entity)
            id_field = entity_def.id_field if entity_def else "_id"
            results = [{id_field: doc.get(id_field, doc.get("_id"))} for doc in results]

        return QueryResult(
            count=total_count,
            results=results,
            cursor=next_cursor,
            query_time_ms=elapsed_ms,
        )

    def count(self, request: CountRequest) -> CountResult:
        """
        Count documents matching filters with optional relaxation suggestions.

        @param request - Count request parameters.
        @returns Count result with optional suggestions.
        """
        client = self._get_client()
        query_builder = self._get_query_builder()

        index_name = self._get_index_name(request.scope, request.entity)

        # Get count
        body = query_builder.build_count_body(request.filters)
        response = client.count(index=index_name, body=body)
        count = response.get("count", 0)

        result = CountResult(
            count=count,
            filters_applied=len(request.filters),
        )

        # Generate suggestions if count is 0 and relaxations requested
        if count == 0 and request.suggest_relaxations and request.filters:
            relaxation_service = self._get_relaxation_service()

            suggestions = relaxation_service.suggest_relaxations(
                index_name, request.filters
            )
            if suggestions:
                result.suggestions = suggestions

            partial_matches = relaxation_service.find_partial_matches(
                index_name, request.filters
            )
            if partial_matches:
                result.partial_matches = partial_matches

        return result

    def aggregate(self, request: AggregateRequest) -> AggregateResult:
        """
        Aggregate documents by a field with optional filters.

        @param request - Aggregation request parameters.
        @returns Aggregation result with buckets.
        """
        start_time = time.time()
        client = self._get_client()
        query_builder = self._get_query_builder()

        index_name = self._get_index_name(request.scope, request.entity)

        body = query_builder.build_aggregation_body(
            filters=request.filters,
            group_by=request.group_by,
            limit=request.limit,
        )

        response = client.search(index=index_name, body=body)

        # Get total count
        hits = response.get("hits", {})
        total = hits.get("total", {})
        total_count = total.get("value", 0) if isinstance(total, dict) else total

        # Extract buckets
        agg_result = response.get("aggregations", {}).get("group_by", {})
        buckets = [
            Bucket(key=b["key"], count=b["doc_count"])
            for b in agg_result.get("buckets", [])
        ]

        elapsed_ms = int((time.time() - start_time) * 1000)

        return AggregateResult(
            total=total_count,
            buckets=buckets,
            query_time_ms=elapsed_ms,
        )

    def get_facet_values(
        self,
        scope: str,
        entity: str,
        facet: str,
        filters: Optional[dict[str, FilterSpec]] = None,
        limit: int = 100,
    ) -> list[Bucket]:
        """
        Get available values for a facet, optionally filtered.

        @param scope - Configuration scope.
        @param entity - Entity name.
        @param facet - Facet name to get values for.
        @param filters - Optional filters to apply.
        @param limit - Maximum values to return.
        @returns List of buckets with facet values and counts.
        """
        request = AggregateRequest(
            scope=scope,
            entity=entity,
            filters=filters or {},
            group_by=facet,
            limit=limit,
        )
        result = self.aggregate(request)
        return result.buckets

    def health_check(self) -> dict[str, Any]:
        """
        Check service health.

        @returns Health status dict.
        """
        try:
            client = self._get_client()
            info = client.info()
            return {
                "status": "healthy",
                "cluster_name": info.get("cluster_name"),
                "version": info.get("version", {}).get("number"),
            }
        except Exception as e:
            logger.error(f"Health check failed: {e}")
            return {
                "status": "unhealthy",
                "error": str(e),
            }

    def close(self) -> None:
        """Close connections."""
        if self._client:
            self._client.close()
            self._client = None

    def __enter__(self) -> "ExplorerService":
        """Context manager entry."""
        return self

    def __exit__(self, exc_type: Any, exc_val: Any, exc_tb: Any) -> None:
        """Context manager exit."""
        self.close()


# Singleton instance for reuse across requests
_explorer_service_instance: Optional[ExplorerService] = None


def get_explorer_service(
    host: str = "localhost",
    port: int = 9200,
) -> ExplorerService:
    """
    Get or create the Explorer Service singleton.

    @param host - OpenSearch host.
    @param port - OpenSearch port.
    @returns Explorer Service instance.
    """
    global _explorer_service_instance

    if _explorer_service_instance is None:
        _explorer_service_instance = ExplorerService(host=host, port=port)

    return _explorer_service_instance


def reset_explorer_service() -> None:
    """Reset the Explorer Service singleton."""
    global _explorer_service_instance

    if _explorer_service_instance:
        _explorer_service_instance.close()
    _explorer_service_instance = None
