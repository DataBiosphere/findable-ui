"""
Unit tests for the ExplorerService.

Tests the core query orchestration logic with mocked OpenSearch client.
"""

from unittest.mock import MagicMock, patch

import pytest
from opensearchpy import ConnectionError as OSConnectionError
from opensearchpy import ConnectionTimeout

from configs.models import (
    EntityDef,
    ExplorerConfig,
    FacetsConfig,
    IndexesConfig,
    SchemaConfig,
)
from services.explorer_models import (
    AggregateRequest,
    CountRequest,
    FilterOperator,
    FilterSpec,
    QueryRequest,
)
from services.explorer_service import ExplorerService, reset_explorer_service


@pytest.fixture
def mock_config() -> ExplorerConfig:
    """Create a mock explorer configuration."""
    return ExplorerConfig(
        scope="anvil",
        schema_config=SchemaConfig(
            entities={
                "files": EntityDef(
                    index="anvil_files",
                    id_field="file_id",
                    fields=[],
                ),
                "donors": EntityDef(
                    index="anvil_donors",
                    id_field="donor_id",
                    fields=[],
                ),
            }
        ),
        facets_config=FacetsConfig(facets=[]),
        indexes_config=IndexesConfig(indexes={}),
    )


@pytest.fixture
def mock_opensearch_client() -> MagicMock:
    """Create a mock OpenSearch client."""
    return MagicMock()


@pytest.fixture
def explorer_service(
    mock_config: ExplorerConfig, mock_opensearch_client: MagicMock
) -> ExplorerService:
    """Create an ExplorerService with mocked dependencies."""
    service = ExplorerService(config=mock_config)
    service._client = mock_opensearch_client
    return service


@pytest.fixture(autouse=True)
def reset_singleton() -> None:
    """Reset singleton after each test."""
    yield
    reset_explorer_service()


class TestExplorerServiceQuery:
    """Tests for the query method."""

    def test_query_returns_results(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that query returns documents from OpenSearch."""
        mock_opensearch_client.search.return_value = {
            "hits": {
                "total": {"value": 100, "relation": "eq"},
                "hits": [
                    {"_id": "1", "_source": {"file_id": "f1", "file_format": ".bam"}},
                    {"_id": "2", "_source": {"file_id": "f2", "file_format": ".cram"}},
                ],
            }
        }

        request = QueryRequest(entity="files", limit=10)
        result = explorer_service.query(request)

        assert result.count == 100
        assert len(result.results) == 2
        assert result.results[0]["file_id"] == "f1"
        assert result.results[1]["file_id"] == "f2"

    def test_query_includes_document_id(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that query includes _id in results."""
        mock_opensearch_client.search.return_value = {
            "hits": {
                "total": {"value": 1},
                "hits": [
                    {"_id": "doc123", "_source": {"file_id": "f1"}},
                ],
            }
        }

        request = QueryRequest(entity="files", limit=10)
        result = explorer_service.query(request)

        assert result.results[0]["_id"] == "doc123"

    def test_query_with_filters_passes_to_builder(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that filters are passed to query builder."""
        mock_opensearch_client.search.return_value = {
            "hits": {"total": {"value": 50}, "hits": []}
        }

        filters = {
            "file_format": FilterSpec(values=[".bam"]),
            "is_supplementary": FilterSpec(values=["true"], negate=True),
        }
        request = QueryRequest(entity="files", filters=filters, limit=10)

        with patch.object(
            explorer_service._get_query_builder(), "build_search_body"
        ) as mock_build:
            mock_build.return_value = {"query": {"match_all": {}}, "size": 10}
            explorer_service.query(request)

            # Verify filters were passed
            call_kwargs = mock_build.call_args[1]
            assert "file_format" in call_kwargs["filters"]
            assert "is_supplementary" in call_kwargs["filters"]
            assert call_kwargs["filters"]["is_supplementary"].negate is True

    def test_query_merges_session_filters(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that session filters are merged with request filters."""
        mock_opensearch_client.search.return_value = {
            "hits": {"total": {"value": 10}, "hits": []}
        }

        session_filters = {
            "file_format": FilterSpec(values=[".bam"]),
        }
        request_filters = {
            "is_supplementary": FilterSpec(values=["false"]),
        }
        request = QueryRequest(entity="files", filters=request_filters, limit=10)

        with patch.object(
            explorer_service._get_query_builder(), "build_search_body"
        ) as mock_build:
            mock_build.return_value = {"query": {"match_all": {}}, "size": 10}
            explorer_service.query(request, session_filters=session_filters)

            call_kwargs = mock_build.call_args[1]
            # Should have both session and request filters
            assert "file_format" in call_kwargs["filters"]
            assert "is_supplementary" in call_kwargs["filters"]

    def test_query_request_filters_override_session(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that request filters override session filters for same key."""
        mock_opensearch_client.search.return_value = {
            "hits": {"total": {"value": 10}, "hits": []}
        }

        session_filters = {
            "file_format": FilterSpec(values=[".bam"]),
        }
        request_filters = {
            "file_format": FilterSpec(values=[".cram"]),  # Override session
        }
        request = QueryRequest(entity="files", filters=request_filters, limit=10)

        with patch.object(
            explorer_service._get_query_builder(), "build_search_body"
        ) as mock_build:
            mock_build.return_value = {"query": {"match_all": {}}, "size": 10}
            explorer_service.query(request, session_filters=session_filters)

            call_kwargs = mock_build.call_args[1]
            # Request filter should override session filter
            assert call_kwargs["filters"]["file_format"].values == [".cram"]

    def test_query_with_sorting(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that sorting parameters are passed to builder."""
        mock_opensearch_client.search.return_value = {
            "hits": {"total": {"value": 10}, "hits": []}
        }

        request = QueryRequest(
            entity="files", sort_by="file_size", sort_order="desc", limit=10
        )

        with patch.object(
            explorer_service._get_query_builder(), "build_search_body"
        ) as mock_build:
            mock_build.return_value = {"query": {"match_all": {}}, "size": 10}
            explorer_service.query(request)

            call_kwargs = mock_build.call_args[1]
            assert call_kwargs["sort_by"] == "file_size"
            assert call_kwargs["sort_order"] == "desc"

    def test_query_with_cursor_pagination(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that cursor is decoded for pagination."""
        mock_opensearch_client.search.return_value = {
            "hits": {"total": {"value": 100}, "hits": []}
        }

        query_builder = explorer_service._get_query_builder()
        cursor = query_builder.encode_cursor(["sort_value", "doc_id"])

        request = QueryRequest(entity="files", cursor=cursor, limit=10)

        with patch.object(query_builder, "build_search_body") as mock_build:
            mock_build.return_value = {"query": {"match_all": {}}, "size": 10}
            explorer_service.query(request)

            call_kwargs = mock_build.call_args[1]
            assert call_kwargs["search_after"] == ["sort_value", "doc_id"]

    def test_query_generates_next_cursor(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that cursor is generated when more results available."""
        mock_opensearch_client.search.return_value = {
            "hits": {
                "total": {"value": 100},
                "hits": [
                    {
                        "_id": "1",
                        "_source": {"file_id": "f1"},
                        "sort": ["last_sort_value", "doc1"],
                    },
                    {
                        "_id": "2",
                        "_source": {"file_id": "f2"},
                        "sort": ["last_sort_value", "doc2"],
                    },
                ],
            }
        }

        request = QueryRequest(entity="files", limit=2)
        result = explorer_service.query(request)

        # Should have cursor since we got exactly limit results
        assert result.cursor is not None

        # Decode and verify cursor contains last sort values
        query_builder = explorer_service._get_query_builder()
        decoded = query_builder.decode_cursor(result.cursor)
        assert decoded == ["last_sort_value", "doc2"]

    def test_query_no_cursor_on_last_page(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that no cursor when results less than limit."""
        mock_opensearch_client.search.return_value = {
            "hits": {
                "total": {"value": 5},
                "hits": [
                    {"_id": "1", "_source": {"file_id": "f1"}, "sort": ["v1"]},
                ],
            }
        }

        request = QueryRequest(entity="files", limit=10)
        result = explorer_service.query(request)

        # Only 1 result but limit was 10, so no more pages
        assert result.cursor is None

    def test_query_return_type_count(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test return_type='count' only returns count."""
        mock_opensearch_client.count.return_value = {"count": 42}

        request = QueryRequest(entity="files", return_type="count", limit=10)
        result = explorer_service.query(request)

        assert result.count == 42
        assert result.results == []
        mock_opensearch_client.search.assert_not_called()

    def test_query_return_type_ids(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test return_type='ids' only returns ID fields."""
        mock_opensearch_client.search.return_value = {
            "hits": {
                "total": {"value": 2},
                "hits": [
                    {
                        "_id": "1",
                        "_source": {
                            "file_id": "f1",
                            "file_format": ".bam",
                            "file_size": 1000,
                        },
                    },
                    {
                        "_id": "2",
                        "_source": {
                            "file_id": "f2",
                            "file_format": ".cram",
                            "file_size": 2000,
                        },
                    },
                ],
            }
        }

        request = QueryRequest(entity="files", return_type="ids", limit=10)
        result = explorer_service.query(request)

        # Should only have file_id, not other fields
        assert len(result.results) == 2
        assert result.results[0] == {"file_id": "f1"}
        assert result.results[1] == {"file_id": "f2"}

    def test_query_handles_empty_results(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that query handles empty results gracefully."""
        mock_opensearch_client.search.return_value = {
            "hits": {"total": {"value": 0}, "hits": []}
        }

        request = QueryRequest(entity="files", limit=10)
        result = explorer_service.query(request)

        assert result.count == 0
        assert result.results == []
        assert result.cursor is None

    def test_query_records_query_time(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that query time is recorded."""
        mock_opensearch_client.search.return_value = {
            "hits": {"total": {"value": 0}, "hits": []}
        }

        request = QueryRequest(entity="files", limit=10)
        result = explorer_service.query(request)

        assert result.query_time_ms >= 0

    def test_query_unknown_entity_raises_error(
        self, explorer_service: ExplorerService
    ) -> None:
        """Test that unknown entity raises ValueError."""
        request = QueryRequest(entity="nonexistent", limit=10)

        with pytest.raises(ValueError, match="Unknown entity"):
            explorer_service.query(request)


class TestExplorerServiceCount:
    """Tests for the count method."""

    def test_count_returns_total(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that count returns document count."""
        mock_opensearch_client.count.return_value = {"count": 12345}

        request = CountRequest(entity="files", filters={})
        result = explorer_service.count(request)

        assert result.count == 12345
        assert result.filters_applied == 0

    def test_count_with_filters(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that count applies filters."""
        mock_opensearch_client.count.return_value = {"count": 500}

        filters = {
            "file_format": FilterSpec(values=[".bam"]),
            "is_supplementary": FilterSpec(values=["false"]),
        }
        request = CountRequest(entity="files", filters=filters)
        result = explorer_service.count(request)

        assert result.count == 500
        assert result.filters_applied == 2

    def test_count_zero_triggers_relaxation_suggestions(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that zero count triggers relaxation suggestions."""
        mock_opensearch_client.count.return_value = {"count": 0}

        filters = {"file_format": FilterSpec(values=[".nonexistent"])}
        request = CountRequest(
            entity="files", filters=filters, suggest_relaxations=True
        )

        with patch.object(
            explorer_service._get_relaxation_service(), "suggest_relaxations"
        ) as mock_suggest:
            mock_suggest.return_value = [{"filter": "file_format", "new_count": 100}]

            with patch.object(
                explorer_service._get_relaxation_service(), "find_partial_matches"
            ) as mock_partial:
                mock_partial.return_value = None
                result = explorer_service.count(request)

        assert result.count == 0
        assert result.suggestions is not None
        mock_suggest.assert_called_once()

    def test_count_no_suggestions_when_results_exist(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that suggestions not generated when results exist."""
        mock_opensearch_client.count.return_value = {"count": 100}

        filters = {"file_format": FilterSpec(values=[".bam"])}
        request = CountRequest(
            entity="files", filters=filters, suggest_relaxations=True
        )

        with patch.object(
            explorer_service._get_relaxation_service(), "suggest_relaxations"
        ) as mock_suggest:
            result = explorer_service.count(request)

        assert result.count == 100
        assert result.suggestions is None
        mock_suggest.assert_not_called()

    def test_count_no_suggestions_when_disabled(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that suggestions not generated when disabled."""
        mock_opensearch_client.count.return_value = {"count": 0}

        filters = {"file_format": FilterSpec(values=[".nonexistent"])}
        request = CountRequest(
            entity="files", filters=filters, suggest_relaxations=False
        )

        with patch.object(
            explorer_service._get_relaxation_service(), "suggest_relaxations"
        ) as mock_suggest:
            result = explorer_service.count(request)

        assert result.count == 0
        mock_suggest.assert_not_called()


class TestExplorerServiceAggregate:
    """Tests for the aggregate method."""

    def test_aggregate_returns_buckets(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that aggregate returns buckets."""
        mock_opensearch_client.search.return_value = {
            "hits": {"total": {"value": 1000}},
            "aggregations": {
                "group_by": {
                    "buckets": [
                        {"key": ".bam", "doc_count": 500},
                        {"key": ".cram", "doc_count": 300},
                        {"key": ".vcf.gz", "doc_count": 200},
                    ]
                }
            },
        }

        request = AggregateRequest(entity="files", group_by="file_format", limit=10)
        result = explorer_service.aggregate(request)

        assert result.total == 1000
        assert len(result.buckets) == 3
        assert result.buckets[0].key == ".bam"
        assert result.buckets[0].count == 500
        assert result.buckets[1].key == ".cram"
        assert result.buckets[1].count == 300

    def test_aggregate_with_filters(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that aggregate respects filters."""
        mock_opensearch_client.search.return_value = {
            "hits": {"total": {"value": 100}},
            "aggregations": {"group_by": {"buckets": []}},
        }

        filters = {"is_supplementary": FilterSpec(values=["false"])}
        request = AggregateRequest(
            entity="files", filters=filters, group_by="file_format", limit=10
        )

        with patch.object(
            explorer_service._get_query_builder(), "build_aggregation_body"
        ) as mock_build:
            mock_build.return_value = {"size": 0, "aggs": {}}
            explorer_service.aggregate(request)

            call_kwargs = mock_build.call_args[1]
            assert "is_supplementary" in call_kwargs["filters"]

    def test_aggregate_empty_results(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that aggregate handles empty results."""
        mock_opensearch_client.search.return_value = {
            "hits": {"total": {"value": 0}},
            "aggregations": {"group_by": {"buckets": []}},
        }

        request = AggregateRequest(entity="files", group_by="file_format", limit=10)
        result = explorer_service.aggregate(request)

        assert result.total == 0
        assert result.buckets == []

    def test_aggregate_records_query_time(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that aggregate records query time."""
        mock_opensearch_client.search.return_value = {
            "hits": {"total": {"value": 0}},
            "aggregations": {"group_by": {"buckets": []}},
        }

        request = AggregateRequest(entity="files", group_by="file_format", limit=10)
        result = explorer_service.aggregate(request)

        assert result.query_time_ms >= 0


class TestExplorerServiceGetFacetValues:
    """Tests for the get_facet_values method."""

    def test_get_facet_values_returns_buckets(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that get_facet_values returns buckets."""
        mock_opensearch_client.search.return_value = {
            "hits": {"total": {"value": 1000}},
            "aggregations": {
                "group_by": {
                    "buckets": [
                        {"key": "Male", "doc_count": 600},
                        {"key": "Female", "doc_count": 400},
                    ]
                }
            },
        }

        buckets = explorer_service.get_facet_values(
            scope="anvil", entity="donors", facet="phenotypic_sex"
        )

        assert len(buckets) == 2
        assert buckets[0].key == "Male"
        assert buckets[1].key == "Female"

    def test_get_facet_values_with_filters(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that get_facet_values applies filters."""
        mock_opensearch_client.search.return_value = {
            "hits": {"total": {"value": 100}},
            "aggregations": {"group_by": {"buckets": []}},
        }

        filters = {"organism_type": FilterSpec(values=["Human"])}

        with patch.object(explorer_service, "aggregate") as mock_agg:
            mock_agg.return_value = MagicMock(buckets=[])
            explorer_service.get_facet_values(
                scope="anvil",
                entity="donors",
                facet="phenotypic_sex",
                filters=filters,
            )

            call_args = mock_agg.call_args[0][0]
            assert call_args.filters == filters


class TestExplorerServiceHealthCheck:
    """Tests for the health_check method."""

    def test_health_check_healthy(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test health check when OpenSearch is healthy."""
        mock_opensearch_client.info.return_value = {
            "cluster_name": "test-cluster",
            "version": {"number": "2.11.0"},
        }

        result = explorer_service.health_check()

        assert result["status"] == "healthy"
        assert result["cluster_name"] == "test-cluster"
        assert result["version"] == "2.11.0"

    def test_health_check_connection_error(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test health check when connection fails."""
        # OpenSearch exceptions require specific args format
        mock_opensearch_client.info.side_effect = OSConnectionError(
            "GET", "http://localhost:9200", Exception("Connection refused")
        )

        result = explorer_service.health_check()

        assert result["status"] == "unhealthy"
        assert "error" in result

    def test_health_check_timeout(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test health check when connection times out."""
        # Use a generic exception since ConnectionTimeout has complex args
        mock_opensearch_client.info.side_effect = Exception("Connection timeout")

        result = explorer_service.health_check()

        assert result["status"] == "unhealthy"
        assert "error" in result


class TestExplorerServiceIndexResolution:
    """Tests for index name resolution."""

    def test_get_index_name_files(self, explorer_service: ExplorerService) -> None:
        """Test index name resolution for files entity."""
        index = explorer_service._get_index_name("anvil", "files")
        assert index == "anvil_files"

    def test_get_index_name_donors(self, explorer_service: ExplorerService) -> None:
        """Test index name resolution for donors entity."""
        index = explorer_service._get_index_name("anvil", "donors")
        assert index == "anvil_donors"

    def test_get_index_name_unknown_entity(
        self, explorer_service: ExplorerService
    ) -> None:
        """Test that unknown entity raises ValueError."""
        with pytest.raises(ValueError, match="Unknown entity"):
            explorer_service._get_index_name("anvil", "unknown_entity")


class TestExplorerServiceConnectionHandling:
    """Tests for connection handling."""

    def test_close_closes_client(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test that close() closes the client."""
        explorer_service.close()

        mock_opensearch_client.close.assert_called_once()
        assert explorer_service._client is None

    def test_context_manager(
        self, mock_config: ExplorerConfig, mock_opensearch_client: MagicMock
    ) -> None:
        """Test context manager usage."""
        with ExplorerService(config=mock_config) as service:
            service._client = mock_opensearch_client
            # Use the service

        # Client should be closed after exiting context
        mock_opensearch_client.close.assert_called_once()

    def test_lazy_client_creation(self, mock_config: ExplorerConfig) -> None:
        """Test that client is created lazily."""
        service = ExplorerService(config=mock_config)

        # Client should not exist yet
        assert service._client is None

        # Accessing client creates it
        with patch("services.explorer_service.OpenSearch") as mock_os:
            mock_os.return_value = MagicMock()
            client = service._get_client()

            assert client is not None
            mock_os.assert_called_once()


class TestExplorerServiceTotalParsing:
    """Tests for parsing total count from different response formats."""

    def test_parses_total_as_dict(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test parsing total when it's a dict (ES 7+ format)."""
        mock_opensearch_client.search.return_value = {
            "hits": {
                "total": {"value": 12345, "relation": "eq"},
                "hits": [],
            }
        }

        request = QueryRequest(entity="files", limit=10)
        result = explorer_service.query(request)

        assert result.count == 12345

    def test_parses_total_as_int(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test parsing total when it's an int (legacy format)."""
        mock_opensearch_client.search.return_value = {
            "hits": {
                "total": 12345,
                "hits": [],
            }
        }

        request = QueryRequest(entity="files", limit=10)
        result = explorer_service.query(request)

        assert result.count == 12345

    def test_handles_missing_total(
        self, explorer_service: ExplorerService, mock_opensearch_client: MagicMock
    ) -> None:
        """Test handling when total is missing."""
        mock_opensearch_client.search.return_value = {
            "hits": {
                "hits": [],
            }
        }

        request = QueryRequest(entity="files", limit=10)
        result = explorer_service.query(request)

        assert result.count == 0
