"""Pytest configuration and fixtures."""
import sys
from pathlib import Path

# Add parent directory to Python path so imports work
sys.path.insert(0, str(Path(__file__).parent.parent))

import pytest
from fastapi.testclient import TestClient
from main import app


@pytest.fixture
def client():
    """
    FastAPI test client fixture.

    Provides a test client for making requests to the API.
    Automatically handles app lifespan events.
    """
    return TestClient(app)
