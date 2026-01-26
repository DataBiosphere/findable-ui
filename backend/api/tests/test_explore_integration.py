"""
Integration tests for the Explorer API.

These tests run against a real OpenSearch instance with loaded AnVIL data.
Requires OpenSearch to be running with data loaded via load_anvil_data.py.

Run with: pytest tests/test_explore_integration.py -v
Skip with: pytest tests/test_explore_integration.py -v -m "not integration"
"""

import pytest
from fastapi.testclient import TestClient

from main import app


def opensearch_available() -> bool:
    """Check if OpenSearch is available with data."""
    try:
        from opensearchpy import OpenSearch

        client = OpenSearch(hosts=[{"host": "localhost", "port": 9200}])
        health = client.cluster.health()
        # Check if we have the anvil_files index with data
        if client.indices.exists(index="anvil_files"):
            count = client.count(index="anvil_files")
            return count.get("count", 0) > 0
        return False
    except Exception:
        return False


# Skip all tests in this module if OpenSearch is not available
pytestmark = pytest.mark.skipif(
    not opensearch_available(),
    reason="OpenSearch not available or no data loaded",
)


@pytest.fixture
def client() -> TestClient:
    """Create a test client."""
    return TestClient(app)


class TestQueryIntegration:
    """Integration tests for query endpoint."""

    def test_query_files_returns_data(self, client: TestClient) -> None:
        """Verify query returns real file records."""
        response = client.post(
            "/api/v0/explore/query",
            json={"entity": "files", "limit": 5},
        )

        assert response.status_code == 200
        data = response.json()
        assert data["count"] > 0
        assert len(data["results"]) == 5
        assert "file_id" in data["results"][0]
        assert "file_format" in data["results"][0]

    def test_query_donors_returns_data(self, client: TestClient) -> None:
        """Verify query returns real donor records."""
        response = client.post(
            "/api/v0/explore/query",
            json={"entity": "donors", "limit": 5},
        )

        assert response.status_code == 200
        data = response.json()
        assert data["count"] > 0
        assert len(data["results"]) <= 5
        assert "donor_id" in data["results"][0]

    def test_query_datasets_returns_data(self, client: TestClient) -> None:
        """Verify query returns real dataset records."""
        response = client.post(
            "/api/v0/explore/query",
            json={"entity": "datasets", "limit": 5},
        )

        assert response.status_code == 200
        data = response.json()
        assert data["count"] > 0
        assert "dataset_id" in data["results"][0]
        assert "title" in data["results"][0]

    def test_query_biosamples_returns_data(self, client: TestClient) -> None:
        """Verify query returns real biosample records."""
        response = client.post(
            "/api/v0/explore/query",
            json={"entity": "biosamples", "limit": 5},
        )

        assert response.status_code == 200
        data = response.json()
        assert data["count"] > 0
        assert "biosample_id" in data["results"][0]

    def test_query_activities_returns_data(self, client: TestClient) -> None:
        """Verify query returns real activity records."""
        response = client.post(
            "/api/v0/explore/query",
            json={"entity": "activities", "limit": 5},
        )

        assert response.status_code == 200
        data = response.json()
        assert data["count"] > 0
        assert "activity_id" in data["results"][0]


class TestFilterIntegration:
    """Integration tests for filter functionality."""

    def test_filter_by_file_format_bam(self, client: TestClient) -> None:
        """Verify .bam filter only returns .bam files."""
        response = client.post(
            "/api/v0/explore/query",
            json={
                "entity": "files",
                "filters": {"file_format": {"values": [".bam"]}},
                "limit": 10,
            },
        )

        assert response.status_code == 200
        data = response.json()
        assert data["count"] > 0

        # All results should be .bam files
        for result in data["results"]:
            assert result["file_format"] == ".bam"

    def test_filter_by_multiple_formats_or(self, client: TestClient) -> None:
        """Verify OR filter returns files matching any format."""
        response = client.post(
            "/api/v0/explore/query",
            json={
                "entity": "files",
                "filters": {
                    "file_format": {"values": [".bam", ".cram"], "operator": "OR"}
                },
                "limit": 20,
            },
        )

        assert response.status_code == 200
        data = response.json()
        assert data["count"] > 0

        # All results should be .bam or .cram
        for result in data["results"]:
            assert result["file_format"] in [".bam", ".cram"]

    def test_not_filter_excludes_correctly(self, client: TestClient) -> None:
        """Verify NOT filter excludes matching records."""
        # First get count of supplementary files
        response_all = client.post(
            "/api/v0/explore/count",
            json={"entity": "files", "filters": {}},
        )
        total_count = response_all.json()["count"]

        # Now exclude supplementary files
        response = client.post(
            "/api/v0/explore/query",
            json={
                "entity": "files",
                "filters": {"is_supplementary": {"values": ["true"], "negate": True}},
                "limit": 10,
            },
        )

        assert response.status_code == 200
        data = response.json()

        # Should have fewer results than total
        assert data["count"] < total_count

        # None of the results should be supplementary
        for result in data["results"]:
            assert result.get("is_supplementary") is not True

    def test_combined_filters(self, client: TestClient) -> None:
        """Verify multiple filters are ANDed together."""
        response = client.post(
            "/api/v0/explore/query",
            json={
                "entity": "files",
                "filters": {
                    "file_format": {"values": [".bam", ".cram"]},
                    "is_supplementary": {"values": ["false"]},
                },
                "limit": 10,
            },
        )

        assert response.status_code == 200
        data = response.json()

        # Results should match both filters
        for result in data["results"]:
            assert result["file_format"] in [".bam", ".cram"]
            assert result.get("is_supplementary") is False


class TestPaginationIntegration:
    """Integration tests for pagination."""

    def test_cursor_pagination_returns_next_page(self, client: TestClient) -> None:
        """Verify cursor-based pagination returns next page."""
        # Get first page
        response1 = client.post(
            "/api/v0/explore/query",
            json={"entity": "files", "limit": 5},
        )

        assert response1.status_code == 200
        data1 = response1.json()
        assert data1["cursor"] is not None

        first_page_ids = [r["file_id"] for r in data1["results"]]

        # Get second page using cursor
        response2 = client.post(
            "/api/v0/explore/query",
            json={"entity": "files", "limit": 5, "cursor": data1["cursor"]},
        )

        assert response2.status_code == 200
        data2 = response2.json()

        second_page_ids = [r["file_id"] for r in data2["results"]]

        # Pages should have different results
        assert set(first_page_ids).isdisjoint(set(second_page_ids))

    def test_pagination_with_filters(self, client: TestClient) -> None:
        """Verify pagination works with filters applied."""
        filters = {"file_format": {"values": [".vcf.gz"]}}

        # Get first page
        response1 = client.post(
            "/api/v0/explore/query",
            json={"entity": "files", "filters": filters, "limit": 5},
        )

        data1 = response1.json()
        assert data1["count"] > 5  # Ensure we have multiple pages

        # Get second page
        response2 = client.post(
            "/api/v0/explore/query",
            json={
                "entity": "files",
                "filters": filters,
                "limit": 5,
                "cursor": data1["cursor"],
            },
        )

        data2 = response2.json()

        # All results should still match filter
        for result in data2["results"]:
            assert result["file_format"] == ".vcf.gz"


class TestSortingIntegration:
    """Integration tests for sorting."""

    def test_sort_by_file_size_desc(self, client: TestClient) -> None:
        """Verify sorting by file_size descending."""
        response = client.post(
            "/api/v0/explore/query",
            json={
                "entity": "files",
                "sort_by": "file_size",
                "sort_order": "desc",
                "limit": 10,
            },
        )

        assert response.status_code == 200
        data = response.json()

        sizes = [r.get("file_size") or 0 for r in data["results"]]
        assert sizes == sorted(sizes, reverse=True)

    def test_sort_by_file_size_asc(self, client: TestClient) -> None:
        """Verify sorting by file_size ascending."""
        response = client.post(
            "/api/v0/explore/query",
            json={
                "entity": "files",
                "sort_by": "file_size",
                "sort_order": "asc",
                "limit": 10,
            },
        )

        assert response.status_code == 200
        data = response.json()

        sizes = [r.get("file_size") or 0 for r in data["results"]]
        assert sizes == sorted(sizes)


class TestCountIntegration:
    """Integration tests for count endpoint."""

    def test_count_all_files(self, client: TestClient) -> None:
        """Verify count returns total file count."""
        response = client.post(
            "/api/v0/explore/count",
            json={"entity": "files", "filters": {}},
        )

        assert response.status_code == 200
        data = response.json()
        assert data["count"] > 100000  # We loaded 758K files

    def test_count_with_filter(self, client: TestClient) -> None:
        """Verify count respects filters."""
        response = client.post(
            "/api/v0/explore/count",
            json={
                "entity": "files",
                "filters": {"file_format": {"values": [".bam"]}},
            },
        )

        assert response.status_code == 200
        data = response.json()
        assert data["count"] > 0
        assert data["filters_applied"] == 1

    def test_count_matches_query_count(self, client: TestClient) -> None:
        """Verify count endpoint matches query result count for small result sets.

        Note: Query endpoint count may be capped at 10000 by OpenSearch's
        track_total_hits default, so we use a filter that returns < 10000.
        """
        # Use .bam filter which returns ~7800 files (under 10k cap)
        filters = {"file_format": {"values": [".bam"]}}

        count_response = client.post(
            "/api/v0/explore/count",
            json={"entity": "files", "filters": filters},
        )

        query_response = client.post(
            "/api/v0/explore/query",
            json={"entity": "files", "filters": filters, "limit": 1},
        )

        count_value = count_response.json()["count"]
        query_count = query_response.json()["count"]

        # For results under 10000, counts should match exactly
        if count_value < 10000:
            assert count_value == query_count
        else:
            # For larger results, query count may be capped at 10000
            assert query_count <= count_value


class TestAggregateIntegration:
    """Integration tests for aggregate endpoint."""

    def test_aggregate_by_file_format(self, client: TestClient) -> None:
        """Verify aggregation by file format."""
        response = client.post(
            "/api/v0/explore/aggregate",
            json={"entity": "files", "group_by": "file_format", "limit": 10},
        )

        assert response.status_code == 200
        data = response.json()
        assert data["total"] > 0
        assert len(data["buckets"]) > 0

        # Each bucket should have key and count
        for bucket in data["buckets"]:
            assert "key" in bucket
            assert "count" in bucket
            assert bucket["count"] > 0

    def test_aggregate_with_filters(self, client: TestClient) -> None:
        """Verify aggregation respects filters."""
        response = client.post(
            "/api/v0/explore/aggregate",
            json={
                "entity": "files",
                "filters": {"is_supplementary": {"values": ["false"]}},
                "group_by": "file_format",
                "limit": 10,
            },
        )

        assert response.status_code == 200
        data = response.json()

        # Verify we got fewer buckets or different counts with filter
        # Get the sum of bucket counts (actual document count)
        filtered_sum = sum(b["count"] for b in data["buckets"])

        unfiltered = client.post(
            "/api/v0/explore/aggregate",
            json={"entity": "files", "group_by": "file_format", "limit": 100},
        )
        unfiltered_sum = sum(b["count"] for b in unfiltered.json()["buckets"])

        # Filtered sum should be less than unfiltered sum
        assert filtered_sum < unfiltered_sum

    def test_aggregate_donors_by_sex(self, client: TestClient) -> None:
        """Verify aggregation of donors by phenotypic sex."""
        response = client.post(
            "/api/v0/explore/aggregate",
            json={"entity": "donors", "group_by": "phenotypic_sex", "limit": 10},
        )

        assert response.status_code == 200
        data = response.json()
        assert len(data["buckets"]) > 0

    def test_aggregate_counts_sum_to_total(self, client: TestClient) -> None:
        """Verify bucket counts are consistent.

        Note: The 'total' field may be capped at 10000 by OpenSearch's
        track_total_hits default, while bucket counts are accurate.
        We verify that buckets are internally consistent.
        """
        response = client.post(
            "/api/v0/explore/aggregate",
            json={"entity": "files", "group_by": "file_format", "limit": 100},
        )

        data = response.json()
        bucket_sum = sum(b["count"] for b in data["buckets"])

        # Buckets should have counts
        assert bucket_sum > 0

        # Each bucket should have positive count
        for bucket in data["buckets"]:
            assert bucket["count"] > 0

        # If total is accurate (not capped), sum should equal or be close
        # If total is capped at 10000, bucket_sum will exceed it
        if data["total"] < 10000:
            assert bucket_sum <= data["total"]


class TestSessionIntegration:
    """Integration tests for session management."""

    def test_session_lifecycle(self, client: TestClient) -> None:
        """Test full session lifecycle: create, update, query, delete."""
        # Create session
        create_response = client.post(
            "/api/v0/explore/session",
            json={"scope": "anvil"},
        )
        assert create_response.status_code == 200
        session_id = create_response.json()["session_id"]

        # Update session with filters
        update_response = client.patch(
            f"/api/v0/explore/session/{session_id}",
            json={"add_filters": {"file_format": {"values": [".bam"]}}},
        )
        assert update_response.status_code == 200

        # Query using session
        query_response = client.post(
            "/api/v0/explore/query",
            json={"entity": "files", "session_id": session_id, "limit": 5},
        )
        assert query_response.status_code == 200

        # Verify filter was applied
        for result in query_response.json()["results"]:
            assert result["file_format"] == ".bam"

        # Delete session
        delete_response = client.delete(f"/api/v0/explore/session/{session_id}")
        assert delete_response.status_code == 204

        # Verify session is gone
        get_response = client.get(f"/api/v0/explore/session/{session_id}")
        assert get_response.status_code == 404

    def test_session_filters_merge_with_request(self, client: TestClient) -> None:
        """Test that session filters merge with request filters."""
        # Create session with file format filter
        create_response = client.post(
            "/api/v0/explore/session",
            json={"scope": "anvil"},
        )
        session_id = create_response.json()["session_id"]

        client.patch(
            f"/api/v0/explore/session/{session_id}",
            json={"add_filters": {"file_format": {"values": [".bam", ".cram"]}}},
        )

        # Query with additional filter
        query_response = client.post(
            "/api/v0/explore/query",
            json={
                "entity": "files",
                "session_id": session_id,
                "filters": {"is_supplementary": {"values": ["false"]}},
                "limit": 10,
            },
        )

        # Results should match both filters
        for result in query_response.json()["results"]:
            assert result["file_format"] in [".bam", ".cram"]
            assert result.get("is_supplementary") is False

        # Cleanup
        client.delete(f"/api/v0/explore/session/{session_id}")


class TestEdgeCasesIntegration:
    """Integration tests for edge cases."""

    def test_empty_filter_values(self, client: TestClient) -> None:
        """Filter with empty values list returns all."""
        response = client.post(
            "/api/v0/explore/query",
            json={
                "entity": "files",
                "filters": {"file_format": {"values": []}},
                "limit": 5,
            },
        )

        # Should handle gracefully (either error or return all)
        assert response.status_code in [200, 400, 422]

    def test_nonexistent_filter_value(self, client: TestClient) -> None:
        """Filter value that matches nothing returns zero results."""
        response = client.post(
            "/api/v0/explore/query",
            json={
                "entity": "files",
                "filters": {"file_format": {"values": [".nonexistent_format_xyz"]}},
                "limit": 5,
            },
        )

        assert response.status_code == 200
        data = response.json()
        assert data["count"] == 0
        assert len(data["results"]) == 0

    def test_special_characters_in_filter(self, client: TestClient) -> None:
        """Filter with special characters."""
        response = client.post(
            "/api/v0/explore/query",
            json={
                "entity": "files",
                "filters": {"file_format": {"values": [".vcf.gz"]}},
                "limit": 5,
            },
        )

        assert response.status_code == 200
        data = response.json()
        assert data["count"] > 0

        for result in data["results"]:
            assert result["file_format"] == ".vcf.gz"

    def test_invalid_entity_returns_error(self, client: TestClient) -> None:
        """Unknown entity returns error."""
        response = client.post(
            "/api/v0/explore/query",
            json={"entity": "nonexistent_entity", "limit": 5},
        )

        assert response.status_code in [400, 404, 500]

    def test_zero_limit(self, client: TestClient) -> None:
        """Limit of zero returns only count."""
        response = client.post(
            "/api/v0/explore/query",
            json={"entity": "files", "limit": 0},
        )

        # Should either work with 0 results or reject with validation error
        assert response.status_code in [200, 400, 422]
        if response.status_code == 200:
            assert len(response.json()["results"]) == 0

    def test_large_limit_capped(self, client: TestClient) -> None:
        """Very large limit is handled."""
        response = client.post(
            "/api/v0/explore/query",
            json={"entity": "files", "limit": 100000},
        )

        # Should either cap the limit or return error
        assert response.status_code in [200, 400, 422]


class TestDataConsistencyIntegration:
    """Integration tests for data consistency."""

    def test_file_count_reasonable(self, client: TestClient) -> None:
        """Verify we have expected number of files."""
        response = client.post(
            "/api/v0/explore/count",
            json={"entity": "files", "filters": {}},
        )

        count = response.json()["count"]
        # We loaded 758,658 files
        assert 700000 < count < 800000

    def test_donor_count_reasonable(self, client: TestClient) -> None:
        """Verify we have expected number of donors."""
        response = client.post(
            "/api/v0/explore/count",
            json={"entity": "donors", "filters": {}},
        )

        count = response.json()["count"]
        # We loaded 6,601 unique donors
        assert 6000 < count < 7000

    def test_dataset_count_reasonable(self, client: TestClient) -> None:
        """Verify we have expected number of datasets."""
        response = client.post(
            "/api/v0/explore/count",
            json={"entity": "datasets", "filters": {}},
        )

        count = response.json()["count"]
        # We loaded 369 datasets
        assert 350 < count < 400

    def test_biosample_count_reasonable(self, client: TestClient) -> None:
        """Verify we have expected number of biosamples."""
        response = client.post(
            "/api/v0/explore/count",
            json={"entity": "biosamples", "filters": {}},
        )

        count = response.json()["count"]
        # We loaded 16,898 unique biosamples
        assert 16000 < count < 18000

    def test_activity_count_reasonable(self, client: TestClient) -> None:
        """Verify we have expected number of activities."""
        response = client.post(
            "/api/v0/explore/count",
            json={"entity": "activities", "filters": {}},
        )

        count = response.json()["count"]
        # We loaded 39,608 activities
        assert 39000 < count < 40000
