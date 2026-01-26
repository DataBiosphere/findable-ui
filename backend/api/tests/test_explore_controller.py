"""
Tests for the Explore Controller.

Uses FastAPI TestClient to test API endpoints.
"""

from unittest.mock import MagicMock, patch

import pytest
from fastapi.testclient import TestClient

from main import app
from services.explorer_models import FilterSpec, QueryResult


@pytest.fixture
def client() -> TestClient:
    """Create a test client."""
    return TestClient(app)


@pytest.fixture
def mock_explorer_service():
    """Mock the explorer service."""
    with patch("controllers.explore_controller._get_explorer_service") as mock:
        service = MagicMock()
        mock.return_value = service
        yield service


@pytest.fixture
def mock_session_manager():
    """Mock the session manager."""
    with patch("controllers.explore_controller.get_session_manager") as mock:
        manager = MagicMock()
        mock.return_value = manager
        yield manager


class TestQueryEndpoint:
    """Tests for POST /api/v0/explore/query."""

    def test_query_basic(
        self, client: TestClient, mock_explorer_service, mock_session_manager
    ) -> None:
        """Test basic query request."""
        mock_explorer_service.query.return_value = QueryResult(
            count=42,
            results=[{"file_id": "f1"}, {"file_id": "f2"}],
            cursor="next_cursor",
            query_time_ms=15,
        )

        response = client.post(
            "/api/v0/explore/query",
            json={
                "entity": "files",
                "filters": {},
            },
        )

        assert response.status_code == 200
        data = response.json()
        assert data["count"] == 42
        assert len(data["results"]) == 2
        assert data["cursor"] == "next_cursor"

    def test_query_with_filters(
        self, client: TestClient, mock_explorer_service, mock_session_manager
    ) -> None:
        """Test query with filters."""
        mock_explorer_service.query.return_value = QueryResult(
            count=10,
            results=[],
            query_time_ms=5,
        )

        response = client.post(
            "/api/v0/explore/query",
            json={
                "entity": "files",
                "filters": {
                    "files.file_format": {"values": [".bam"], "operator": "OR"},
                    "diagnoses.disease": {"values": ["diabetes"], "negate": True},
                },
            },
        )

        assert response.status_code == 200

        # Verify the service was called with correct filters
        call_args = mock_explorer_service.query.call_args
        request = call_args[0][0]
        assert "files.file_format" in request.filters
        assert "diagnoses.disease" in request.filters
        assert request.filters["diagnoses.disease"].negate is True

    def test_query_with_session(
        self, client: TestClient, mock_explorer_service, mock_session_manager
    ) -> None:
        """Test query with session filters."""
        mock_session_manager.get_filters.return_value = {
            "files.file_format": FilterSpec(values=[".bam"]),
        }
        mock_explorer_service.query.return_value = QueryResult(
            count=5,
            results=[],
            query_time_ms=3,
        )

        response = client.post(
            "/api/v0/explore/query",
            json={
                "entity": "files",
                "session_id": "test-session-123",
            },
        )

        assert response.status_code == 200
        mock_session_manager.get_filters.assert_called_with("test-session-123")

    def test_query_session_not_found(
        self, client: TestClient, mock_explorer_service, mock_session_manager
    ) -> None:
        """Test query with invalid session returns 404."""
        mock_session_manager.get_filters.return_value = None

        response = client.post(
            "/api/v0/explore/query",
            json={
                "entity": "files",
                "session_id": "nonexistent",
            },
        )

        assert response.status_code == 404
        assert "not found" in response.json()["detail"]


class TestCountEndpoint:
    """Tests for POST /api/v0/explore/count."""

    def test_count_basic(
        self, client: TestClient, mock_explorer_service, mock_session_manager
    ) -> None:
        """Test basic count request."""
        mock_result = MagicMock()
        mock_result.count = 100
        mock_result.filters_applied = 2
        mock_result.suggestions = None
        mock_result.partial_matches = None
        mock_explorer_service.count.return_value = mock_result

        response = client.post(
            "/api/v0/explore/count",
            json={
                "entity": "donors",
                "filters": {
                    "donors.phenotypic_sex": {"values": ["Female"]},
                },
            },
        )

        assert response.status_code == 200
        data = response.json()
        assert data["count"] == 100
        assert data["filters_applied"] == 2


class TestAggregateEndpoint:
    """Tests for POST /api/v0/explore/aggregate."""

    def test_aggregate_basic(self, client: TestClient) -> None:
        """Test basic aggregation request."""
        with patch(
            "controllers.explore_controller._get_explorer_service"
        ) as mock_service:
            service = MagicMock()
            mock_service.return_value = service

            mock_result = MagicMock()
            mock_result.total = 500
            mock_result.buckets = []
            mock_result.query_time_ms = 25
            service.aggregate.return_value = mock_result

            response = client.post(
                "/api/v0/explore/aggregate",
                json={
                    "entity": "donors",
                    "group_by": "diagnoses.disease",
                    "limit": 10,
                },
            )

            assert response.status_code == 200
            data = response.json()
            assert data["total"] == 500


class TestSessionEndpoints:
    """Tests for session management endpoints."""

    def test_create_session(self, client: TestClient, mock_session_manager) -> None:
        """Test creating a session."""
        mock_result = MagicMock()
        mock_result.session_id = "new-session-123"
        mock_result.scope = "anvil"
        mock_result.filters = {}
        mock_result.created_at = "2024-01-01T00:00:00"
        mock_result.ttl_seconds = 3600
        mock_session_manager.create.return_value = mock_result

        response = client.post(
            "/api/v0/explore/session",
            json={"scope": "anvil"},
        )

        assert response.status_code == 200
        data = response.json()
        assert data["session_id"] == "new-session-123"

    def test_get_session(self, client: TestClient, mock_session_manager) -> None:
        """Test getting session state."""
        mock_result = MagicMock()
        mock_result.session_id = "session-123"
        mock_result.scope = "anvil"
        mock_result.filters = {}
        mock_result.created_at = "2024-01-01T00:00:00"
        mock_result.updated_at = "2024-01-01T00:00:00"
        mock_result.last_query = None
        mock_result.ttl_seconds = 3600
        mock_result.expires_in_seconds = 3500
        mock_session_manager.get.return_value = mock_result

        response = client.get("/api/v0/explore/session/session-123")

        assert response.status_code == 200
        data = response.json()
        assert data["session_id"] == "session-123"

    def test_get_session_not_found(
        self, client: TestClient, mock_session_manager
    ) -> None:
        """Test getting nonexistent session returns 404."""
        mock_session_manager.get.return_value = None

        response = client.get("/api/v0/explore/session/nonexistent")

        assert response.status_code == 404

    def test_update_session(self, client: TestClient, mock_session_manager) -> None:
        """Test updating session filters."""
        mock_result = MagicMock()
        mock_result.session_id = "session-123"
        mock_result.scope = "anvil"
        mock_result.filters = {"disease": FilterSpec(values=["diabetes"])}
        mock_result.created_at = "2024-01-01T00:00:00"
        mock_result.updated_at = "2024-01-01T00:01:00"
        mock_result.last_query = None
        mock_result.ttl_seconds = 3600
        mock_result.expires_in_seconds = 3500
        mock_session_manager.update.return_value = mock_result

        response = client.patch(
            "/api/v0/explore/session/session-123",
            json={
                "add_filters": {
                    "disease": {"values": ["diabetes"]},
                },
            },
        )

        assert response.status_code == 200

    def test_delete_session(self, client: TestClient, mock_session_manager) -> None:
        """Test deleting a session."""
        mock_session_manager.delete.return_value = True

        response = client.delete("/api/v0/explore/session/session-123")

        assert response.status_code == 204

    def test_delete_session_not_found(
        self, client: TestClient, mock_session_manager
    ) -> None:
        """Test deleting nonexistent session returns 404."""
        mock_session_manager.delete.return_value = False

        response = client.delete("/api/v0/explore/session/nonexistent")

        assert response.status_code == 404


class TestHealthEndpoint:
    """Tests for GET /api/v0/explore/health."""

    def test_health_healthy(
        self, client: TestClient, mock_explorer_service, mock_session_manager
    ) -> None:
        """Test health endpoint when service is healthy."""
        mock_explorer_service.health_check.return_value = {
            "status": "healthy",
            "cluster_name": "test-cluster",
            "version": "2.11.0",
        }
        mock_session_manager.count_sessions.return_value = 5

        response = client.get("/api/v0/explore/health")

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert data["active_sessions"] == 5

    def test_health_unhealthy(
        self, client: TestClient, mock_explorer_service, mock_session_manager
    ) -> None:
        """Test health endpoint when service is unhealthy."""
        mock_explorer_service.health_check.return_value = {
            "status": "unhealthy",
            "error": "Connection refused",
        }
        mock_session_manager.count_sessions.return_value = 0

        response = client.get("/api/v0/explore/health")

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "unhealthy"
        assert "error" in data
