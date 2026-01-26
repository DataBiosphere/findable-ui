"""
Session manager for multi-turn exploration.

Provides in-memory session storage with TTL-based expiration.
Designed for easy swap to Redis in the future.
"""

import logging
import threading
import time
import uuid
from datetime import datetime
from typing import Any, Optional

from services.explorer_models import FilterSpec
from services.session_models import (
    CreateSessionRequest,
    CreateSessionResponse,
    GetSessionResponse,
    SessionState,
    UpdateSessionRequest,
)

logger = logging.getLogger(__name__)

# Default session TTL (1 hour)
DEFAULT_TTL_SECONDS = 3600

# Cleanup interval (5 minutes)
CLEANUP_INTERVAL_SECONDS = 300


class SessionManager:
    """
    Manages exploration sessions with in-memory storage.

    Features:
    - Thread-safe operations with RLock
    - TTL-based expiration
    - Background cleanup thread
    - Singleton pattern support

    Future: Designed for easy swap to Redis storage.
    """

    def __init__(
        self,
        default_ttl: int = DEFAULT_TTL_SECONDS,
        enable_cleanup: bool = True,
    ):
        """
        Initialize the session manager.

        @param default_ttl - Default TTL for new sessions in seconds.
        @param enable_cleanup - Whether to enable background cleanup thread.
        """
        self._sessions: dict[str, SessionState] = {}
        self._lock = threading.RLock()
        self._default_ttl = default_ttl
        self._cleanup_thread: Optional[threading.Thread] = None
        self._stop_cleanup = threading.Event()

        if enable_cleanup:
            self._start_cleanup_thread()

    def _start_cleanup_thread(self) -> None:
        """Start the background cleanup thread."""
        self._cleanup_thread = threading.Thread(
            target=self._cleanup_loop,
            daemon=True,
            name="SessionCleanup",
        )
        self._cleanup_thread.start()
        logger.info("Session cleanup thread started")

    def _cleanup_loop(self) -> None:
        """Background loop that removes expired sessions."""
        while not self._stop_cleanup.wait(CLEANUP_INTERVAL_SECONDS):
            self._cleanup_expired()

    def _cleanup_expired(self) -> int:
        """
        Remove expired sessions.

        @returns Number of sessions removed.
        """
        removed = 0
        with self._lock:
            expired_ids = [
                sid for sid, session in self._sessions.items() if session.is_expired()
            ]
            for sid in expired_ids:
                del self._sessions[sid]
                removed += 1

        if removed > 0:
            logger.info(f"Cleaned up {removed} expired sessions")

        return removed

    def create(self, request: CreateSessionRequest) -> CreateSessionResponse:
        """
        Create a new session.

        @param request - Session creation request.
        @returns Created session response.
        """
        session_id = str(uuid.uuid4())
        now = datetime.utcnow()

        session = SessionState(
            session_id=session_id,
            scope=request.scope,
            filters=request.initial_filters.copy(),
            created_at=now,
            updated_at=now,
            ttl_seconds=request.ttl_seconds,
        )

        with self._lock:
            self._sessions[session_id] = session

        logger.info(f"Created session {session_id} with scope {request.scope}")

        return CreateSessionResponse(
            session_id=session_id,
            scope=session.scope,
            filters=session.filters,
            created_at=session.created_at,
            ttl_seconds=session.ttl_seconds,
        )

    def get(self, session_id: str) -> Optional[GetSessionResponse]:
        """
        Get session state by ID.

        @param session_id - Session ID to retrieve.
        @returns Session response or None if not found/expired.
        """
        with self._lock:
            session = self._sessions.get(session_id)

            if session is None:
                return None

            if session.is_expired():
                del self._sessions[session_id]
                logger.info(f"Session {session_id} expired")
                return None

            # Touch the session to update access time
            session.updated_at = datetime.utcnow()

            return GetSessionResponse.from_session(session)

    def update(
        self,
        session_id: str,
        request: UpdateSessionRequest,
    ) -> Optional[GetSessionResponse]:
        """
        Update session filters.

        @param session_id - Session ID to update.
        @param request - Update request with filter changes.
        @returns Updated session response or None if not found.
        """
        with self._lock:
            session = self._sessions.get(session_id)

            if session is None:
                return None

            if session.is_expired():
                del self._sessions[session_id]
                return None

            # Clear all filters if requested
            if request.clear_all:
                session.filters = {}

            # Remove specified filters
            if request.remove_filters:
                for filter_name in request.remove_filters:
                    session.filters.pop(filter_name, None)

            # Add/update filters
            if request.add_filters:
                session.filters.update(request.add_filters)

            session.updated_at = datetime.utcnow()

            logger.debug(
                f"Updated session {session_id}: {len(session.filters)} filters"
            )

            return GetSessionResponse.from_session(session)

    def delete(self, session_id: str) -> bool:
        """
        Delete a session.

        @param session_id - Session ID to delete.
        @returns True if deleted, False if not found.
        """
        with self._lock:
            if session_id in self._sessions:
                del self._sessions[session_id]
                logger.info(f"Deleted session {session_id}")
                return True
            return False

    def get_filters(self, session_id: str) -> Optional[dict[str, FilterSpec]]:
        """
        Get just the filters from a session.

        Convenience method for use in query operations.

        @param session_id - Session ID.
        @returns Filter dict or None if session not found.
        """
        with self._lock:
            session = self._sessions.get(session_id)

            if session is None or session.is_expired():
                return None

            return session.filters.copy()

    def record_query(
        self,
        session_id: str,
        entity: str,
        count: int,
    ) -> None:
        """
        Record query metadata on a session.

        @param session_id - Session ID.
        @param entity - Entity that was queried.
        @param count - Result count.
        """
        with self._lock:
            session = self._sessions.get(session_id)

            if session is None or session.is_expired():
                return

            session.last_query = {
                "entity": entity,
                "count": count,
                "timestamp": datetime.utcnow().isoformat(),
            }
            session.updated_at = datetime.utcnow()

    def list_sessions(self) -> list[str]:
        """
        List all active session IDs.

        @returns List of session IDs.
        """
        with self._lock:
            return [
                sid
                for sid, session in self._sessions.items()
                if not session.is_expired()
            ]

    def count_sessions(self) -> int:
        """
        Get count of active sessions.

        @returns Number of active sessions.
        """
        with self._lock:
            return sum(
                1 for session in self._sessions.values() if not session.is_expired()
            )

    def shutdown(self) -> None:
        """Shutdown the session manager and cleanup thread."""
        self._stop_cleanup.set()
        if self._cleanup_thread and self._cleanup_thread.is_alive():
            self._cleanup_thread.join(timeout=5)
        logger.info("Session manager shutdown")


# Singleton instance
_session_manager_instance: Optional[SessionManager] = None


def get_session_manager() -> SessionManager:
    """
    Get or create the Session Manager singleton.

    @returns Session Manager instance.
    """
    global _session_manager_instance

    if _session_manager_instance is None:
        _session_manager_instance = SessionManager()

    return _session_manager_instance


def reset_session_manager() -> None:
    """Reset the Session Manager singleton."""
    global _session_manager_instance

    if _session_manager_instance:
        _session_manager_instance.shutdown()
    _session_manager_instance = None
