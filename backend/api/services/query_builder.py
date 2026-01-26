"""
OpenSearch query builder for the Explorer Service.

Builds OpenSearch queries from filter specifications with support
for AND/OR/NOT operators.
"""

import base64
import json
import logging
from typing import Any, Optional

from services.explorer_models import FilterOperator, FilterSpec

logger = logging.getLogger(__name__)


class QueryBuilder:
    """
    Builds OpenSearch queries from filter specifications.

    Supports:
    - OR: terms query (matches any value)
    - AND: multiple term queries (matches all values)
    - NOT: must_not clause (excludes values)
    """

    def __init__(self, facet_field_mapping: Optional[dict[str, str]] = None):
        """
        Initialize the query builder.

        @param facet_field_mapping - Optional mapping from facet names to field paths.
                                    If not provided, facet names are used directly.
        """
        self.facet_field_mapping = facet_field_mapping or {}

    def _get_field_path(self, facet_name: str) -> str:
        """
        Get the OpenSearch field path for a facet.

        @param facet_name - Facet name (e.g., 'diagnoses.disease').
        @returns OpenSearch field path.
        """
        return self.facet_field_mapping.get(facet_name, facet_name)

    def build_filter_query(self, filters: dict[str, FilterSpec]) -> dict[str, Any]:
        """
        Build an OpenSearch bool query from filter specifications.

        @param filters - Dict mapping facet names to filter specs.
        @returns OpenSearch query dict.
        """
        if not filters:
            return {"match_all": {}}

        must_clauses: list[dict[str, Any]] = []
        must_not_clauses: list[dict[str, Any]] = []

        for facet_name, spec in filters.items():
            field_path = self._get_field_path(facet_name)
            clauses = self._build_filter_clauses(field_path, spec)

            if spec.negate:
                must_not_clauses.extend(clauses)
            else:
                must_clauses.extend(clauses)

        query: dict[str, Any] = {"bool": {}}

        if must_clauses:
            query["bool"]["must"] = must_clauses
        if must_not_clauses:
            query["bool"]["must_not"] = must_not_clauses

        # Handle empty bool query
        if not query["bool"]:
            return {"match_all": {}}

        return query

    def _build_filter_clauses(
        self, field_path: str, spec: FilterSpec
    ) -> list[dict[str, Any]]:
        """
        Build filter clauses for a single facet.

        @param field_path - OpenSearch field path.
        @param spec - Filter specification.
        @returns List of query clauses.
        """
        if not spec.values:
            return []

        if spec.operator == FilterOperator.OR or spec.negate:
            # OR: single terms query matches any value
            # NOT with OR: exclude any of the values
            return [{"terms": {field_path: spec.values}}]
        else:
            # AND: each value needs its own term clause
            return [{"term": {field_path: value}} for value in spec.values]

    def build_search_body(
        self,
        filters: dict[str, FilterSpec],
        sort_by: Optional[str] = None,
        sort_order: str = "desc",
        limit: int = 25,
        search_after: Optional[list[Any]] = None,
        source_fields: Optional[list[str]] = None,
    ) -> dict[str, Any]:
        """
        Build a complete OpenSearch search request body.

        @param filters - Dict mapping facet names to filter specs.
        @param sort_by - Field to sort by.
        @param sort_order - Sort order ('asc' or 'desc').
        @param limit - Maximum results to return.
        @param search_after - Cursor values for pagination.
        @param source_fields - Fields to include in response (None for all).
        @returns OpenSearch search body dict.
        """
        body: dict[str, Any] = {
            "query": self.build_filter_query(filters),
            "size": limit,
        }

        # Add sorting
        if sort_by:
            body["sort"] = [
                {sort_by: {"order": sort_order}},
                {"_id": {"order": "asc"}},  # Tiebreaker for pagination
            ]
        else:
            # Default sort by _id for consistent pagination
            body["sort"] = [{"_id": {"order": "asc"}}]

        # Add search_after for pagination
        if search_after:
            body["search_after"] = search_after

        # Add source filtering
        if source_fields:
            body["_source"] = source_fields

        return body

    def build_count_body(self, filters: dict[str, FilterSpec]) -> dict[str, Any]:
        """
        Build an OpenSearch count request body.

        @param filters - Dict mapping facet names to filter specs.
        @returns OpenSearch count body dict.
        """
        return {"query": self.build_filter_query(filters)}

    def build_aggregation_body(
        self,
        filters: dict[str, FilterSpec],
        group_by: str,
        limit: int = 50,
    ) -> dict[str, Any]:
        """
        Build an OpenSearch aggregation request body.

        @param filters - Dict mapping facet names to filter specs.
        @param group_by - Field to group by.
        @param limit - Maximum number of buckets.
        @returns OpenSearch search body with aggregation.
        """
        field_path = self._get_field_path(group_by)

        return {
            "query": self.build_filter_query(filters),
            "size": 0,  # Don't return hits, only aggregations
            "aggs": {
                "group_by": {
                    "terms": {
                        "field": field_path,
                        "size": limit,
                        "order": {"_count": "desc"},
                    }
                }
            },
        }

    def encode_cursor(self, sort_values: list[Any]) -> str:
        """
        Encode sort values into a cursor string.

        @param sort_values - Sort values from last document.
        @returns Base64-encoded cursor string.
        """
        cursor_data = json.dumps(sort_values)
        return base64.b64encode(cursor_data.encode()).decode()

    def decode_cursor(self, cursor: str) -> Optional[list[Any]]:
        """
        Decode a cursor string back to sort values.

        @param cursor - Base64-encoded cursor string.
        @returns Decoded sort values, or None if invalid.
        """
        try:
            cursor_data = base64.b64decode(cursor.encode()).decode()
            return json.loads(cursor_data)
        except Exception as e:
            logger.warning(f"Failed to decode cursor: {e}")
            return None

    def build_available_values_query(
        self,
        filters: dict[str, FilterSpec],
        facet_name: str,
        limit: int = 100,
    ) -> dict[str, Any]:
        """
        Build a query to find available values for a facet given other filters.

        @param filters - Current filters (will exclude the target facet).
        @param facet_name - Facet to get available values for.
        @param limit - Maximum values to return.
        @returns OpenSearch search body with aggregation.
        """
        # Build query without the target facet
        other_filters = {k: v for k, v in filters.items() if k != facet_name}

        field_path = self._get_field_path(facet_name)

        return {
            "query": self.build_filter_query(other_filters),
            "size": 0,
            "aggs": {
                "available_values": {
                    "terms": {
                        "field": field_path,
                        "size": limit,
                    }
                }
            },
        }
