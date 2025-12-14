from fastapi import APIRouter

from services.facets_service import compute_facets_from_query
from services.models import FacetsResponse
from controllers.models import FacetsRequest

router = APIRouter(prefix="/api/v0/facets", tags=["facets"])


@router.post("")
def get_facets(payload: FacetsRequest) -> FacetsResponse:
    """
    Return a stubbed query-to-facets response for PoC purposes.
    """
    return compute_facets_from_query()
