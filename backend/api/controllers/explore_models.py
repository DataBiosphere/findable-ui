"""
Request and response models for the Explore API.

These models are used by FastAPI for request validation and response serialization.
"""

from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel, Field

from services.explorer_models import (
    Bucket,
    FilterSpec,
    PartialMatch,
    RelaxationSuggestion,
)


# ============================================================================
# Query Endpoint Models
# ============================================================================


class QueryRequest(BaseModel):
    """Request body for POST /explore/query."""

    scope: str = Field(default="anvil", description="Configuration scope")
    entity: str = Field(
        ..., description="Entity type to query (e.g., 'files', 'donors')"
    )
    filters: dict[str, FilterSpec] = Field(
        default_factory=dict,
        description="Filters to apply. Keys are facet names, values are FilterSpec objects.",
    )
    return_type: str = Field(
        default="list",
        description="What to return: 'count', 'list', or 'ids'",
    )
    sort_by: Optional[str] = Field(
        default=None,
        description="Field to sort by",
    )
    sort_order: str = Field(
        default="desc",
        description="Sort order: 'asc' or 'desc'",
    )
    limit: int = Field(
        default=25,
        ge=1,
        le=1000,
        description="Maximum number of results to return",
    )
    cursor: Optional[str] = Field(
        default=None,
        description="Pagination cursor from previous response",
    )
    session_id: Optional[str] = Field(
        default=None,
        description="Session ID to use filters from",
    )


class QueryResponse(BaseModel):
    """Response body for POST /explore/query."""

    count: int = Field(..., description="Total number of matching documents")
    results: list[dict[str, Any]] = Field(
        default_factory=list,
        description="Matching documents",
    )
    cursor: Optional[str] = Field(
        default=None,
        description="Cursor for fetching next page",
    )
    query_time_ms: Optional[int] = Field(
        default=None,
        description="Query execution time in milliseconds",
    )


# ============================================================================
# Count Endpoint Models
# ============================================================================


class CountRequest(BaseModel):
    """Request body for POST /explore/count."""

    scope: str = Field(default="anvil", description="Configuration scope")
    entity: str = Field(..., description="Entity type to count")
    filters: dict[str, FilterSpec] = Field(
        default_factory=dict,
        description="Filters to apply",
    )
    suggest_relaxations: bool = Field(
        default=True,
        description="Whether to suggest filter relaxations if count is 0",
    )


class CountResponse(BaseModel):
    """Response body for POST /explore/count."""

    count: int = Field(..., description="Number of matching documents")
    filters_applied: int = Field(..., description="Number of filters applied")
    suggestions: Optional[list[RelaxationSuggestion]] = Field(
        default=None,
        description="Suggested filter relaxations (when count is 0)",
    )
    partial_matches: Optional[dict[str, PartialMatch]] = Field(
        default=None,
        description="Partial match information for filters",
    )


# ============================================================================
# Aggregate Endpoint Models
# ============================================================================


class AggregateRequest(BaseModel):
    """Request body for POST /explore/aggregate."""

    scope: str = Field(default="anvil", description="Configuration scope")
    entity: str = Field(..., description="Entity type to aggregate")
    filters: dict[str, FilterSpec] = Field(
        default_factory=dict,
        description="Filters to apply before aggregation",
    )
    group_by: str = Field(..., description="Field to group by")
    limit: int = Field(
        default=50,
        ge=1,
        le=1000,
        description="Maximum number of buckets to return",
    )


class AggregateResponse(BaseModel):
    """Response body for POST /explore/aggregate."""

    total: int = Field(..., description="Total documents before grouping")
    buckets: list[Bucket] = Field(
        default_factory=list,
        description="Aggregation buckets with counts",
    )
    query_time_ms: Optional[int] = Field(
        default=None,
        description="Query execution time in milliseconds",
    )


# ============================================================================
# Session Endpoint Models
# ============================================================================


class CreateSessionRequest(BaseModel):
    """Request body for POST /explore/session."""

    scope: str = Field(default="anvil", description="Configuration scope")
    ttl_seconds: int = Field(
        default=3600,
        ge=60,
        le=86400,
        description="Session time-to-live in seconds (1 minute to 24 hours)",
    )
    initial_filters: dict[str, FilterSpec] = Field(
        default_factory=dict,
        description="Optional initial filters",
    )


class CreateSessionResponse(BaseModel):
    """Response body for POST /explore/session."""

    session_id: str = Field(..., description="Created session ID")
    scope: str = Field(..., description="Configuration scope")
    filters: dict[str, FilterSpec] = Field(..., description="Initial filters")
    created_at: datetime = Field(..., description="Creation timestamp")
    ttl_seconds: int = Field(..., description="Session TTL in seconds")


class UpdateSessionRequest(BaseModel):
    """Request body for PATCH /explore/session/{id}."""

    add_filters: Optional[dict[str, FilterSpec]] = Field(
        default=None,
        description="Filters to add or update",
    )
    remove_filters: Optional[list[str]] = Field(
        default=None,
        description="Filter names to remove",
    )
    clear_all: bool = Field(
        default=False,
        description="If True, clear all existing filters",
    )


class GetSessionResponse(BaseModel):
    """Response body for GET /explore/session/{id}."""

    session_id: str = Field(..., description="Session ID")
    scope: str = Field(..., description="Configuration scope")
    filters: dict[str, FilterSpec] = Field(..., description="Current filters")
    created_at: datetime = Field(..., description="Creation timestamp")
    updated_at: datetime = Field(..., description="Last update timestamp")
    last_query: Optional[dict[str, Any]] = Field(
        default=None,
        description="Metadata from last query",
    )
    ttl_seconds: int = Field(..., description="Session TTL in seconds")
    expires_in_seconds: int = Field(..., description="Seconds until expiration")


# ============================================================================
# Health Endpoint Models
# ============================================================================


class ExploreHealthResponse(BaseModel):
    """Response body for GET /explore/health."""

    status: str = Field(..., description="Service status: 'healthy' or 'unhealthy'")
    cluster_name: Optional[str] = Field(
        default=None,
        description="OpenSearch cluster name",
    )
    version: Optional[str] = Field(
        default=None,
        description="OpenSearch version",
    )
    active_sessions: int = Field(..., description="Number of active sessions")
    error: Optional[str] = Field(
        default=None,
        description="Error message if unhealthy",
    )
