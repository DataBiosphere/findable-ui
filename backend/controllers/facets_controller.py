from fastapi import APIRouter
from pydantic import BaseModel

from backend.services.facets_service import compute_facets_from_query
from backend.services.facets_service import FacetsResponse

from backend.controllers.models import FacetsRequest

router = APIRouter(prefix="/api/v0/facets", tags=["facets"])


@router.post("")
def get_facets(payload: FacetsRequest) -> FacetsResponse:
    # NOTE: Stubbed PoC implementation. This will be replaced by
    # LLM-backed intent parsing and real facet resolution in a later step.
    # For now, delegate to the service layer so the controller stays thin.
    return compute_facets_from_query()
