"""
Filter relaxation service for the Explorer.

Suggests filter relaxations when queries return zero or few results.
"""

import logging
from typing import Any, Optional

from opensearchpy import OpenSearch

from services.explorer_models import (
    FilterSpec,
    PartialMatch,
    RelaxationSuggestion,
)
from services.query_builder import QueryBuilder

logger = logging.getLogger(__name__)


class RelaxationService:
    """
    Generates filter relaxation suggestions when queries return few results.

    For each active filter, calculates what the count would be if that filter
    were removed, helping users understand which filters are most restrictive.
    """

    def __init__(
        self,
        client: OpenSearch,
        query_builder: QueryBuilder,
    ):
        """
        Initialize the relaxation service.

        @param client - OpenSearch client.
        @param query_builder - Query builder for constructing queries.
        """
        self.client = client
        self.query_builder = query_builder

    def suggest_relaxations(
        self,
        index_name: str,
        filters: dict[str, FilterSpec],
        threshold: int = 1,
        max_suggestions: int = 5,
    ) -> Optional[list[RelaxationSuggestion]]:
        """
        Generate filter relaxation suggestions.

        @param index_name - OpenSearch index to query.
        @param filters - Current filters that produced few/no results.
        @param threshold - Only suggest if current count is below this.
        @param max_suggestions - Maximum number of suggestions to return.
        @returns List of relaxation suggestions, or None if count >= threshold.
        """
        if not filters:
            return None

        # First, check the current count
        current_count = self._get_count(index_name, filters)
        if current_count >= threshold:
            return None

        suggestions = []

        # For each filter, calculate count without it
        for filter_name in filters:
            relaxed_filters = {k: v for k, v in filters.items() if k != filter_name}
            relaxed_count = self._get_count(index_name, relaxed_filters)

            if relaxed_count > current_count:
                remaining = list(relaxed_filters.keys())
                description = self._generate_description(
                    filter_name, relaxed_filters, relaxed_count
                )

                suggestions.append(
                    RelaxationSuggestion(
                        removed_filter=filter_name,
                        count=relaxed_count,
                        description=description,
                        remaining_filters=remaining,
                    )
                )

        # Sort by count descending (most results first)
        suggestions.sort(key=lambda x: x.count, reverse=True)

        return suggestions[:max_suggestions] if suggestions else None

    def find_partial_matches(
        self,
        index_name: str,
        filters: dict[str, FilterSpec],
    ) -> Optional[dict[str, PartialMatch]]:
        """
        Find partial matches for filters that returned no results.

        For each filter, identifies what values ARE available given the other filters.

        @param index_name - OpenSearch index to query.
        @param filters - Current filters.
        @returns Dict mapping filter names to partial match info.
        """
        if not filters:
            return None

        partial_matches = {}

        for filter_name, filter_spec in filters.items():
            # Query for available values without this filter
            query = self.query_builder.build_available_values_query(
                filters, filter_name
            )

            try:
                response = self.client.search(index=index_name, body=query)
                buckets = (
                    response.get("aggregations", {})
                    .get("available_values", {})
                    .get("buckets", [])
                )

                available = [b["key"] for b in buckets]

                # Check if requested values are in available values
                requested_values = set(filter_spec.values)
                available_set = set(available)
                missing = requested_values - available_set

                if missing:
                    partial_matches[filter_name] = PartialMatch(
                        available_values=available[:20],  # Limit to top 20
                        note=f"Requested values {list(missing)} not found in current result set",
                    )

            except Exception as e:
                logger.warning(f"Error finding partial matches for {filter_name}: {e}")

        return partial_matches if partial_matches else None

    def _get_count(self, index_name: str, filters: dict[str, FilterSpec]) -> int:
        """
        Get document count for a set of filters.

        @param index_name - OpenSearch index.
        @param filters - Filters to apply.
        @returns Document count.
        """
        try:
            body = self.query_builder.build_count_body(filters)
            response = self.client.count(index=index_name, body=body)
            return response.get("count", 0)
        except Exception as e:
            logger.error(f"Error getting count: {e}")
            return 0

    def _generate_description(
        self,
        removed_filter: str,
        remaining_filters: dict[str, FilterSpec],
        count: int,
    ) -> str:
        """
        Generate a human-readable description for a relaxation suggestion.

        @param removed_filter - Filter that was removed.
        @param remaining_filters - Filters still applied.
        @param count - Count with the filter removed.
        @returns Human-readable description.
        """
        if not remaining_filters:
            return f"{count} results with no filters (removed {removed_filter})"

        filter_descriptions = []
        for name, spec in remaining_filters.items():
            # Extract the facet display name
            facet_short = name.split(".")[-1].replace("_", " ")
            values_str = ", ".join(spec.values[:3])
            if len(spec.values) > 3:
                values_str += f" (+{len(spec.values) - 3} more)"
            filter_descriptions.append(f"{facet_short}: {values_str}")

        filters_text = "; ".join(filter_descriptions)
        removed_short = removed_filter.split(".")[-1].replace("_", " ")

        return f"{count} results without {removed_short} filter ({filters_text})"


class MockRelaxationService(RelaxationService):
    """Mock relaxation service for testing."""

    def __init__(self, mock_counts: Optional[dict[str, int]] = None):
        """
        Initialize mock service with predefined counts.

        @param mock_counts - Dict mapping filter combinations to counts.
        """
        self.mock_counts = mock_counts or {}

    def _get_count(self, index_name: str, filters: dict[str, FilterSpec]) -> int:
        """Return mock count based on filter keys."""
        key = ",".join(sorted(filters.keys()))
        return self.mock_counts.get(key, 0)
