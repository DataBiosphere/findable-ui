"""
FastAPI controller for the Explore API.

Provides endpoints for querying, counting, aggregating, and session management.
"""

import logging
import os
from typing import Optional

from fastapi import APIRouter, HTTPException, status

from controllers.explore_models import (
    AggregateRequest,
    AggregateResponse,
    CountRequest,
    CountResponse,
    CreateSessionRequest,
    CreateSessionResponse,
    ExploreHealthResponse,
    GetSessionResponse,
    QueryRequest,
    QueryResponse,
    UpdateSessionRequest,
)
from services.explorer_models import (
    AggregateRequest as ServiceAggregateRequest,
    CountRequest as ServiceCountRequest,
    QueryRequest as ServiceQueryRequest,
)
from services.explorer_service import ExplorerService, get_explorer_service
from services.session_manager import get_session_manager
from services.session_models import (
    CreateSessionRequest as ServiceCreateSessionRequest,
    UpdateSessionRequest as ServiceUpdateSessionRequest,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v0/explore", tags=["explore"])


def _get_explorer_service() -> ExplorerService:
    """
    Get the Explorer Service instance.

    @returns Explorer Service configured from environment.
    """
    host = os.getenv("OPENSEARCH_HOST", "localhost")
    port = int(os.getenv("OPENSEARCH_PORT", "9200"))
    return get_explorer_service(host=host, port=port)


# ============================================================================
# Query Endpoints
# ============================================================================


@router.post("/query", response_model=QueryResponse)
async def query(request: QueryRequest) -> QueryResponse:
    """
    Query entities with filters, sorting, and pagination.

    Supports:
    - AND/OR/NOT filters on any facet
    - Sorting by any sortable field
    - Cursor-based pagination
    - Session integration for persistent filters

    Returns matching documents or just count/IDs based on return_type.
    """
    service = _get_explorer_service()
    session_manager = get_session_manager()

    # Get session filters if session_id provided
    session_filters = None
    if request.session_id:
        session_filters = session_manager.get_filters(request.session_id)
        if session_filters is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Session {request.session_id} not found or expired",
            )

    try:
        # Convert to service request
        service_request = ServiceQueryRequest(
            scope=request.scope,
            entity=request.entity,
            filters=request.filters,
            return_type=request.return_type,
            sort_by=request.sort_by,
            sort_order=request.sort_order,
            limit=request.limit,
            cursor=request.cursor,
        )

        result = service.query(service_request, session_filters=session_filters)

        # Record query on session if applicable
        if request.session_id:
            session_manager.record_query(
                request.session_id,
                entity=request.entity,
                count=result.count,
            )

        return QueryResponse(
            count=result.count,
            results=result.results,
            cursor=result.cursor,
            query_time_ms=result.query_time_ms,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    except Exception as e:
        logger.error(f"Query error: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )


@router.post("/count", response_model=CountResponse)
async def count(request: CountRequest) -> CountResponse:
    """
    Count documents matching filters.

    When count is 0 and suggest_relaxations is True, returns suggestions
    for filter relaxations that would yield results.
    """
    service = _get_explorer_service()

    try:
        service_request = ServiceCountRequest(
            scope=request.scope,
            entity=request.entity,
            filters=request.filters,
            suggest_relaxations=request.suggest_relaxations,
        )

        result = service.count(service_request)

        return CountResponse(
            count=result.count,
            filters_applied=result.filters_applied,
            suggestions=result.suggestions,
            partial_matches=result.partial_matches,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    except Exception as e:
        logger.error(f"Count error: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )


@router.post("/aggregate", response_model=AggregateResponse)
async def aggregate(request: AggregateRequest) -> AggregateResponse:
    """
    Aggregate documents by a field with optional filters.

    Returns buckets with counts for each unique value of the group_by field.
    """
    service = _get_explorer_service()

    try:
        service_request = ServiceAggregateRequest(
            scope=request.scope,
            entity=request.entity,
            filters=request.filters,
            group_by=request.group_by,
            limit=request.limit,
        )

        result = service.aggregate(service_request)

        return AggregateResponse(
            total=result.total,
            buckets=result.buckets,
            query_time_ms=result.query_time_ms,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    except Exception as e:
        logger.error(f"Aggregate error: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error",
        )


# ============================================================================
# Session Endpoints
# ============================================================================


@router.post("/session", response_model=CreateSessionResponse)
async def create_session(request: CreateSessionRequest) -> CreateSessionResponse:
    """
    Create a new exploration session.

    Sessions store filter state for multi-turn exploration.
    """
    session_manager = get_session_manager()

    service_request = ServiceCreateSessionRequest(
        scope=request.scope,
        ttl_seconds=request.ttl_seconds,
        initial_filters=request.initial_filters,
    )

    result = session_manager.create(service_request)

    return CreateSessionResponse(
        session_id=result.session_id,
        scope=result.scope,
        filters=result.filters,
        created_at=result.created_at,
        ttl_seconds=result.ttl_seconds,
    )


@router.get("/session/{session_id}", response_model=GetSessionResponse)
async def get_session(session_id: str) -> GetSessionResponse:
    """
    Get current state of an exploration session.
    """
    session_manager = get_session_manager()

    result = session_manager.get(session_id)

    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Session {session_id} not found or expired",
        )

    return GetSessionResponse(
        session_id=result.session_id,
        scope=result.scope,
        filters=result.filters,
        created_at=result.created_at,
        updated_at=result.updated_at,
        last_query=result.last_query,
        ttl_seconds=result.ttl_seconds,
        expires_in_seconds=result.expires_in_seconds,
    )


@router.patch("/session/{session_id}", response_model=GetSessionResponse)
async def update_session(
    session_id: str,
    request: UpdateSessionRequest,
) -> GetSessionResponse:
    """
    Update filters on an exploration session.

    Can add filters, remove filters, or clear all filters.
    """
    session_manager = get_session_manager()

    service_request = ServiceUpdateSessionRequest(
        add_filters=request.add_filters,
        remove_filters=request.remove_filters,
        clear_all=request.clear_all,
    )

    result = session_manager.update(session_id, service_request)

    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Session {session_id} not found or expired",
        )

    return GetSessionResponse(
        session_id=result.session_id,
        scope=result.scope,
        filters=result.filters,
        created_at=result.created_at,
        updated_at=result.updated_at,
        last_query=result.last_query,
        ttl_seconds=result.ttl_seconds,
        expires_in_seconds=result.expires_in_seconds,
    )


@router.delete("/session/{session_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_session(session_id: str) -> None:
    """
    Delete an exploration session.
    """
    session_manager = get_session_manager()

    deleted = session_manager.delete(session_id)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Session {session_id} not found",
        )


# ============================================================================
# Health Endpoint
# ============================================================================


@router.get("/health", response_model=ExploreHealthResponse)
async def health() -> ExploreHealthResponse:
    """
    Check health of the Explorer Service.
    """
    service = _get_explorer_service()
    session_manager = get_session_manager()

    health_status = service.health_check()
    active_sessions = session_manager.count_sessions()

    return ExploreHealthResponse(
        status=health_status.get("status", "unknown"),
        cluster_name=health_status.get("cluster_name"),
        version=health_status.get("version"),
        active_sessions=active_sessions,
        error=health_status.get("error"),
    )
