"""
Tests for the Session Manager.
"""

import time
from datetime import datetime, timedelta

import pytest

from services.explorer_models import FilterOperator, FilterSpec
from services.session_manager import SessionManager, reset_session_manager
from services.session_models import (
    CreateSessionRequest,
    SessionState,
    UpdateSessionRequest,
)


@pytest.fixture
def manager() -> SessionManager:
    """Create a fresh session manager for each test."""
    # Disable cleanup thread for tests
    return SessionManager(default_ttl=3600, enable_cleanup=False)


class TestSessionManager:
    """Tests for SessionManager."""

    def test_create_session(self, manager: SessionManager) -> None:
        """Test creating a new session."""
        request = CreateSessionRequest(scope="anvil")
        response = manager.create(request)

        assert response.session_id is not None
        assert response.scope == "anvil"
        assert response.filters == {}
        assert response.ttl_seconds == 3600

    def test_create_session_with_initial_filters(self, manager: SessionManager) -> None:
        """Test creating session with initial filters."""
        filters = {
            "disease": FilterSpec(values=["diabetes"]),
        }
        request = CreateSessionRequest(
            scope="anvil",
            initial_filters=filters,
        )
        response = manager.create(request)

        assert response.filters == filters

    def test_get_session(self, manager: SessionManager) -> None:
        """Test retrieving a session."""
        request = CreateSessionRequest(scope="anvil")
        create_response = manager.create(request)

        get_response = manager.get(create_response.session_id)

        assert get_response is not None
        assert get_response.session_id == create_response.session_id
        assert get_response.scope == "anvil"
        assert get_response.expires_in_seconds > 0

    def test_get_nonexistent_session(self, manager: SessionManager) -> None:
        """Test getting a session that doesn't exist."""
        result = manager.get("nonexistent-id")
        assert result is None

    def test_update_session_add_filters(self, manager: SessionManager) -> None:
        """Test adding filters to a session."""
        create_response = manager.create(CreateSessionRequest(scope="anvil"))

        update_request = UpdateSessionRequest(
            add_filters={
                "disease": FilterSpec(values=["diabetes"]),
                "file_format": FilterSpec(values=[".bam"]),
            }
        )

        update_response = manager.update(create_response.session_id, update_request)

        assert update_response is not None
        assert "disease" in update_response.filters
        assert "file_format" in update_response.filters

    def test_update_session_remove_filters(self, manager: SessionManager) -> None:
        """Test removing filters from a session."""
        # Create with initial filters
        filters = {
            "disease": FilterSpec(values=["diabetes"]),
            "file_format": FilterSpec(values=[".bam"]),
        }
        create_response = manager.create(
            CreateSessionRequest(scope="anvil", initial_filters=filters)
        )

        # Remove one filter
        update_request = UpdateSessionRequest(remove_filters=["file_format"])
        update_response = manager.update(create_response.session_id, update_request)

        assert update_response is not None
        assert "disease" in update_response.filters
        assert "file_format" not in update_response.filters

    def test_update_session_clear_all(self, manager: SessionManager) -> None:
        """Test clearing all filters from a session."""
        filters = {
            "disease": FilterSpec(values=["diabetes"]),
            "file_format": FilterSpec(values=[".bam"]),
        }
        create_response = manager.create(
            CreateSessionRequest(scope="anvil", initial_filters=filters)
        )

        update_request = UpdateSessionRequest(clear_all=True)
        update_response = manager.update(create_response.session_id, update_request)

        assert update_response is not None
        assert update_response.filters == {}

    def test_delete_session(self, manager: SessionManager) -> None:
        """Test deleting a session."""
        create_response = manager.create(CreateSessionRequest(scope="anvil"))

        deleted = manager.delete(create_response.session_id)
        assert deleted is True

        # Should not be found after deletion
        assert manager.get(create_response.session_id) is None

    def test_delete_nonexistent_session(self, manager: SessionManager) -> None:
        """Test deleting a session that doesn't exist."""
        deleted = manager.delete("nonexistent-id")
        assert deleted is False

    def test_get_filters(self, manager: SessionManager) -> None:
        """Test getting just filters from a session."""
        filters = {
            "disease": FilterSpec(values=["diabetes"]),
        }
        create_response = manager.create(
            CreateSessionRequest(scope="anvil", initial_filters=filters)
        )

        retrieved_filters = manager.get_filters(create_response.session_id)

        assert retrieved_filters == filters

    def test_record_query(self, manager: SessionManager) -> None:
        """Test recording query metadata."""
        create_response = manager.create(CreateSessionRequest(scope="anvil"))

        manager.record_query(
            create_response.session_id,
            entity="files",
            count=42,
        )

        session = manager.get(create_response.session_id)
        assert session is not None
        assert session.last_query is not None
        assert session.last_query["entity"] == "files"
        assert session.last_query["count"] == 42

    def test_list_sessions(self, manager: SessionManager) -> None:
        """Test listing all sessions."""
        manager.create(CreateSessionRequest(scope="anvil"))
        manager.create(CreateSessionRequest(scope="anvil"))
        manager.create(CreateSessionRequest(scope="anvil"))

        sessions = manager.list_sessions()
        assert len(sessions) == 3

    def test_count_sessions(self, manager: SessionManager) -> None:
        """Test counting sessions."""
        manager.create(CreateSessionRequest(scope="anvil"))
        manager.create(CreateSessionRequest(scope="anvil"))

        count = manager.count_sessions()
        assert count == 2


class TestSessionExpiration:
    """Tests for session expiration."""

    def test_session_is_expired(self) -> None:
        """Test session expiration check."""
        session = SessionState(
            session_id="test",
            scope="anvil",
            ttl_seconds=1,
            updated_at=datetime.utcnow() - timedelta(seconds=2),
        )

        assert session.is_expired() is True

    def test_session_not_expired(self) -> None:
        """Test session not expired."""
        session = SessionState(
            session_id="test",
            scope="anvil",
            ttl_seconds=3600,
            updated_at=datetime.utcnow(),
        )

        assert session.is_expired() is False

    def test_expired_session_not_returned(self) -> None:
        """Test that expired sessions are not returned by get()."""
        manager = SessionManager(default_ttl=3600, enable_cleanup=False)

        # Create session
        response = manager.create(CreateSessionRequest(scope="anvil"))

        # Manually expire the session by modifying updated_at
        with manager._lock:
            session = manager._sessions[response.session_id]
            session.updated_at = datetime.utcnow() - timedelta(seconds=7200)
            session.ttl_seconds = 60  # Set short TTL directly

        # Should return None for expired session
        result = manager.get(response.session_id)
        assert result is None


class TestThreadSafety:
    """Tests for thread-safe operations."""

    def test_concurrent_creates(self) -> None:
        """Test concurrent session creation."""
        import concurrent.futures

        manager = SessionManager(enable_cleanup=False)

        def create_session() -> str:
            response = manager.create(CreateSessionRequest(scope="anvil"))
            return response.session_id

        with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
            futures = [executor.submit(create_session) for _ in range(100)]
            session_ids = [f.result() for f in futures]

        # All session IDs should be unique
        assert len(set(session_ids)) == 100
        assert manager.count_sessions() == 100

    def test_concurrent_updates(self) -> None:
        """Test concurrent session updates."""
        import concurrent.futures

        manager = SessionManager(enable_cleanup=False)
        response = manager.create(CreateSessionRequest(scope="anvil"))
        session_id = response.session_id

        def add_filter(i: int) -> None:
            manager.update(
                session_id,
                UpdateSessionRequest(
                    add_filters={f"filter_{i}": FilterSpec(values=[f"value_{i}"])}
                ),
            )

        with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
            futures = [executor.submit(add_filter, i) for i in range(50)]
            concurrent.futures.wait(futures)

        # All filters should be added
        session = manager.get(session_id)
        assert session is not None
        assert len(session.filters) == 50
