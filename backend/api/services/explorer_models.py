"""
Domain models for the Explorer Service.

Defines filter specifications, query results, and relaxation suggestions.
"""

from datetime import datetime
from enum import Enum
from typing import Any, Optional

from pydantic import BaseModel, Field


class FilterOperator(str, Enum):
    """Operators for combining filter values."""

    AND = "AND"
    OR = "OR"


class FilterSpec(BaseModel):
    """
    Specification for a single filter on a facet.

    Supports AND/OR operators and negation (NOT).
    """

    values: list[str] = Field(..., description="Values to filter by")
    operator: FilterOperator = Field(
        default=FilterOperator.OR, description="How to combine values (AND/OR)"
    )
    negate: bool = Field(
        default=False, description="If True, exclude these values (NOT)"
    )


class SortSpec(BaseModel):
    """Specification for sorting results."""

    field: str = Field(..., description="Field to sort by")
    order: str = Field(default="desc", description="Sort order: 'asc' or 'desc'")


class QueryRequest(BaseModel):
    """Request parameters for a query operation."""

    scope: str = Field(default="anvil", description="Configuration scope")
    entity: str = Field(..., description="Entity type to query")
    filters: dict[str, FilterSpec] = Field(
        default_factory=dict, description="Filters to apply"
    )
    return_type: str = Field(
        default="list", description="Return type: 'count', 'list', or 'ids'"
    )
    sort_by: Optional[str] = Field(default=None, description="Field to sort by")
    sort_order: str = Field(default="desc", description="Sort order: 'asc' or 'desc'")
    limit: int = Field(default=25, ge=1, le=1000, description="Maximum results")
    cursor: Optional[str] = Field(default=None, description="Pagination cursor")
    session_id: Optional[str] = Field(
        default=None, description="Session ID to use for filters"
    )


class QueryResult(BaseModel):
    """Result of a query operation."""

    count: int = Field(..., description="Total matching documents")
    results: list[dict[str, Any]] = Field(
        default_factory=list, description="Matching documents"
    )
    cursor: Optional[str] = Field(default=None, description="Cursor for next page")
    query_time_ms: Optional[int] = Field(
        default=None, description="Query execution time in ms"
    )


class CountRequest(BaseModel):
    """Request parameters for a count operation."""

    scope: str = Field(default="anvil", description="Configuration scope")
    entity: str = Field(..., description="Entity type to count")
    filters: dict[str, FilterSpec] = Field(
        default_factory=dict, description="Filters to apply"
    )
    suggest_relaxations: bool = Field(
        default=True, description="Whether to suggest filter relaxations if count is 0"
    )


class RelaxationSuggestion(BaseModel):
    """Suggestion for relaxing a filter to get more results."""

    removed_filter: str = Field(..., description="Filter that was removed")
    count: int = Field(..., description="Count with filter removed")
    description: str = Field(..., description="Human-readable description")
    remaining_filters: list[str] = Field(
        default_factory=list, description="Filters still applied"
    )


class PartialMatch(BaseModel):
    """Information about partial matches for a filter."""

    available_values: list[str] = Field(
        ..., description="Values that are available in the result set"
    )
    note: str = Field(
        ..., description="Explanation of why requested values aren't found"
    )


class CountResult(BaseModel):
    """Result of a count operation with relaxation suggestions."""

    count: int = Field(..., description="Total matching documents")
    filters_applied: int = Field(..., description="Number of filters applied")
    suggestions: Optional[list[RelaxationSuggestion]] = Field(
        default=None, description="Filter relaxation suggestions"
    )
    partial_matches: Optional[dict[str, PartialMatch]] = Field(
        default=None, description="Partial match information"
    )


class AggregateRequest(BaseModel):
    """Request parameters for an aggregation operation."""

    scope: str = Field(default="anvil", description="Configuration scope")
    entity: str = Field(..., description="Entity type to aggregate")
    filters: dict[str, FilterSpec] = Field(
        default_factory=dict, description="Filters to apply"
    )
    group_by: str = Field(..., description="Field to group by")
    limit: int = Field(default=50, ge=1, le=1000, description="Maximum buckets")


class Bucket(BaseModel):
    """A single aggregation bucket."""

    key: str = Field(..., description="Bucket key (facet value)")
    count: int = Field(..., description="Document count in bucket")


class AggregateResult(BaseModel):
    """Result of an aggregation operation."""

    total: int = Field(..., description="Total documents before grouping")
    buckets: list[Bucket] = Field(
        default_factory=list, description="Aggregation buckets"
    )
    query_time_ms: Optional[int] = Field(
        default=None, description="Query execution time in ms"
    )
