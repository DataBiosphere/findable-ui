"""
Tests for the QueryBuilder.
"""

import pytest

from services.explorer_models import FilterOperator, FilterSpec
from services.query_builder import QueryBuilder


class TestQueryBuilder:
    """Tests for QueryBuilder."""

    def test_empty_filters_returns_match_all(self) -> None:
        """Test that empty filters returns match_all query."""
        builder = QueryBuilder()
        query = builder.build_filter_query({})

        assert query == {"match_all": {}}

    def test_single_or_filter(self) -> None:
        """Test single OR filter produces terms query."""
        builder = QueryBuilder()
        filters = {
            "file_format": FilterSpec(
                values=[".bam", ".cram"],
                operator=FilterOperator.OR,
            )
        }

        query = builder.build_filter_query(filters)

        assert query == {
            "bool": {"must": [{"terms": {"file_format": [".bam", ".cram"]}}]}
        }

    def test_single_and_filter(self) -> None:
        """Test single AND filter produces multiple term queries."""
        builder = QueryBuilder()
        filters = {
            "disease": FilterSpec(
                values=["diabetes", "cancer"],
                operator=FilterOperator.AND,
            )
        }

        query = builder.build_filter_query(filters)

        assert query == {
            "bool": {
                "must": [
                    {"term": {"disease": "diabetes"}},
                    {"term": {"disease": "cancer"}},
                ]
            }
        }

    def test_not_filter(self) -> None:
        """Test NOT filter produces must_not clause."""
        builder = QueryBuilder()
        filters = {
            "file_format": FilterSpec(
                values=[".txt"],
                negate=True,
            )
        }

        query = builder.build_filter_query(filters)

        assert query == {"bool": {"must_not": [{"terms": {"file_format": [".txt"]}}]}}

    def test_combined_filters(self) -> None:
        """Test combining multiple filter types."""
        builder = QueryBuilder()
        filters = {
            "file_format": FilterSpec(
                values=[".bam", ".cram"],
                operator=FilterOperator.OR,
            ),
            "disease": FilterSpec(
                values=["diabetes"],
                operator=FilterOperator.OR,
            ),
            "is_supplementary": FilterSpec(
                values=["true"],
                negate=True,
            ),
        }

        query = builder.build_filter_query(filters)

        assert "bool" in query
        assert "must" in query["bool"]
        assert "must_not" in query["bool"]

        # Check must clauses
        must_clauses = query["bool"]["must"]
        assert len(must_clauses) == 2

        # Check must_not clauses
        must_not_clauses = query["bool"]["must_not"]
        assert len(must_not_clauses) == 1
        assert must_not_clauses[0] == {"terms": {"is_supplementary": ["true"]}}

    def test_facet_field_mapping(self) -> None:
        """Test facet to field path mapping."""
        mapping = {
            "diagnoses.disease": "disease_code",
            "files.format": "file_format",
        }
        builder = QueryBuilder(facet_field_mapping=mapping)

        filters = {"diagnoses.disease": FilterSpec(values=["D001"])}

        query = builder.build_filter_query(filters)

        # Should use mapped field name
        assert query == {"bool": {"must": [{"terms": {"disease_code": ["D001"]}}]}}

    def test_build_search_body_with_sort(self) -> None:
        """Test building search body with sorting."""
        builder = QueryBuilder()
        filters = {"disease": FilterSpec(values=["diabetes"])}

        body = builder.build_search_body(
            filters=filters,
            sort_by="file_size",
            sort_order="desc",
            limit=50,
        )

        assert body["size"] == 50
        assert body["sort"][0] == {"file_size": {"order": "desc"}}
        assert body["sort"][1] == {"_id": {"order": "asc"}}  # Tiebreaker

    def test_build_search_body_with_pagination(self) -> None:
        """Test building search body with search_after pagination."""
        builder = QueryBuilder()

        body = builder.build_search_body(
            filters={},
            limit=25,
            search_after=[12345, "doc_abc"],
        )

        assert body["search_after"] == [12345, "doc_abc"]

    def test_cursor_encoding_decoding(self) -> None:
        """Test cursor encoding and decoding roundtrip."""
        builder = QueryBuilder()
        sort_values = [12345, "some_id_value", None]

        cursor = builder.encode_cursor(sort_values)
        decoded = builder.decode_cursor(cursor)

        assert decoded == sort_values

    def test_invalid_cursor_returns_none(self) -> None:
        """Test that invalid cursor returns None."""
        builder = QueryBuilder()

        result = builder.decode_cursor("invalid_base64!!!")
        assert result is None

    def test_build_count_body(self) -> None:
        """Test building count request body."""
        builder = QueryBuilder()
        filters = {"disease": FilterSpec(values=["diabetes"])}

        body = builder.build_count_body(filters)

        assert "query" in body
        assert body["query"]["bool"]["must"][0] == {"terms": {"disease": ["diabetes"]}}

    def test_build_aggregation_body(self) -> None:
        """Test building aggregation request body."""
        builder = QueryBuilder()
        filters = {"disease": FilterSpec(values=["diabetes"])}

        body = builder.build_aggregation_body(
            filters=filters,
            group_by="file_format",
            limit=20,
        )

        assert body["size"] == 0  # No hits, just aggregations
        assert "aggs" in body
        assert "group_by" in body["aggs"]
        assert body["aggs"]["group_by"]["terms"]["field"] == "file_format"
        assert body["aggs"]["group_by"]["terms"]["size"] == 20

    def test_build_available_values_query(self) -> None:
        """Test building query for available facet values."""
        builder = QueryBuilder()
        filters = {
            "disease": FilterSpec(values=["diabetes"]),
            "file_format": FilterSpec(values=[".bam"]),
        }

        body = builder.build_available_values_query(
            filters=filters,
            facet_name="file_format",
            limit=50,
        )

        # Should NOT include file_format in the query
        query = body["query"]
        assert query["bool"]["must"][0] == {"terms": {"disease": ["diabetes"]}}
        assert len(query["bool"]["must"]) == 1  # Only disease filter

        # Should have aggregation for file_format
        assert body["aggs"]["available_values"]["terms"]["field"] == "file_format"


class TestFilterSpec:
    """Tests for FilterSpec model."""

    def test_defaults(self) -> None:
        """Test default values for FilterSpec."""
        spec = FilterSpec(values=["test"])

        assert spec.operator == FilterOperator.OR
        assert spec.negate is False

    def test_and_operator(self) -> None:
        """Test AND operator."""
        spec = FilterSpec(
            values=["a", "b"],
            operator=FilterOperator.AND,
        )

        assert spec.operator == FilterOperator.AND

    def test_negate(self) -> None:
        """Test negate flag."""
        spec = FilterSpec(
            values=["exclude_me"],
            negate=True,
        )

        assert spec.negate is True
