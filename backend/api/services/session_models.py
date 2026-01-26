"""
Session models for the Explorer Service.

Defines session state and update operations for multi-turn exploration.
"""

from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel, Field

from services.explorer_models import FilterSpec


class SessionState(BaseModel):
    """
    State of an exploration session.

    Tracks filters, scope, and query history for multi-turn exploration.
    """

    session_id: str = Field(..., description="Unique session identifier")
    scope: str = Field(default="anvil", description="Configuration scope")
    filters: dict[str, FilterSpec] = Field(
        default_factory=dict, description="Current active filters"
    )
    created_at: datetime = Field(
        default_factory=datetime.utcnow, description="Session creation time"
    )
    updated_at: datetime = Field(
        default_factory=datetime.utcnow, description="Last update time"
    )
    last_query: Optional[dict[str, Any]] = Field(
        default=None, description="Last query metadata"
    )
    ttl_seconds: int = Field(
        default=3600, description="Session time-to-live in seconds"
    )

    def is_expired(self) -> bool:
        """
        Check if the session has expired.

        @returns True if session has exceeded TTL.
        """
        elapsed = (datetime.utcnow() - self.updated_at).total_seconds()
        return elapsed > self.ttl_seconds


class CreateSessionRequest(BaseModel):
    """Request to create a new session."""

    scope: str = Field(default="anvil", description="Configuration scope")
    ttl_seconds: int = Field(
        default=3600, ge=60, le=86400, description="Session TTL in seconds"
    )
    initial_filters: dict[str, FilterSpec] = Field(
        default_factory=dict, description="Optional initial filters"
    )


class CreateSessionResponse(BaseModel):
    """Response after creating a session."""

    session_id: str = Field(..., description="Created session ID")
    scope: str = Field(..., description="Configuration scope")
    filters: dict[str, FilterSpec] = Field(..., description="Initial filters")
    created_at: datetime = Field(..., description="Creation timestamp")
    ttl_seconds: int = Field(..., description="Session TTL")


class UpdateSessionRequest(BaseModel):
    """Request to update session filters."""

    add_filters: Optional[dict[str, FilterSpec]] = Field(
        default=None, description="Filters to add or update"
    )
    remove_filters: Optional[list[str]] = Field(
        default=None, description="Filter names to remove"
    )
    clear_all: bool = Field(default=False, description="If True, clear all filters")


class GetSessionResponse(BaseModel):
    """Response for getting session state."""

    session_id: str = Field(..., description="Session ID")
    scope: str = Field(..., description="Configuration scope")
    filters: dict[str, FilterSpec] = Field(..., description="Current filters")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")
    last_query: Optional[dict[str, Any]] = Field(
        default=None, description="Last query metadata"
    )
    ttl_seconds: int = Field(..., description="Session TTL")
    expires_in_seconds: int = Field(..., description="Seconds until expiration")

    @classmethod
    def from_session(cls, session: SessionState) -> "GetSessionResponse":
        """
        Create response from session state.

        @param session - Session state to convert.
        @returns Response model.
        """
        elapsed = (datetime.utcnow() - session.updated_at).total_seconds()
        expires_in = max(0, int(session.ttl_seconds - elapsed))

        return cls(
            session_id=session.session_id,
            scope=session.scope,
            filters=session.filters,
            created_at=session.created_at,
            updated_at=session.updated_at,
            last_query=session.last_query,
            ttl_seconds=session.ttl_seconds,
            expires_in_seconds=expires_in,
        )
