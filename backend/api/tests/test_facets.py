"""Tests for facets endpoint."""

from fastapi.testclient import TestClient


def test_facets_endpoint_returns_200(client: TestClient):
    """Test that facets endpoint returns 200 OK."""
    response = client.post("/api/v0/facets", json={"query": "test query"})

    assert response.status_code == 200


def test_facets_response_structure(client: TestClient):
    """Test that facets response has expected structure."""
    response = client.post("/api/v0/facets", json={"query": "test"})

    data = response.json()
    assert "query" in data
    assert "facets" in data
    assert isinstance(data["facets"], list)


def test_facets_returns_stubbed_data(client: TestClient):
    """Test that facets returns stubbed facet data."""
    response = client.post("/api/v0/facets", json={"query": "test"})

    data = response.json()
    # Should have some stubbed facets
    assert len(data["facets"]) > 0

    # Each facet should have required fields
    for facet in data["facets"]:
        assert "facet" in facet
        assert "selectedValues" in facet
