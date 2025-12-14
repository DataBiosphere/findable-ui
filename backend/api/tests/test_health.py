"""Tests for health check endpoint."""
from fastapi.testclient import TestClient


def test_health_returns_ok(client: TestClient):
    """Test that /health returns 200 with status ok."""
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
