from fastapi import APIRouter, Query as QueryParam

from services.facets_service import (
    compute_facets_from_query,
    compute_facets_with_llm_and_opensearch,
)
from services.models import FacetsResponse
from controllers.models import FacetsRequest

router = APIRouter(prefix="/api/v0/facets", tags=["facets"])


@router.post("")
def get_facets(
    payload: FacetsRequest,
    mode: str = QueryParam(
        default="stub",
        description="Mode: 'stub' (hardcoded data), 'mock' (pattern matching + OpenSearch), 'llm' (OpenAI + OpenSearch)",
    ),
) -> FacetsResponse:
    """Extract facets from a natural language query.

    Supports three modes via the 'mode' query parameter:
    - **stub**: Returns hardcoded stub data (default, for backwards compatibility)
    - **mock**: Uses pattern matching for extraction + real OpenSearch for normalization (no API cost)
    - **llm**: Uses real OpenAI LLM + real OpenSearch (requires API key, costs money)

    Example queries:
        - "latino patients with diabetes"
        - "bam files for brain tissue"
        - "female patients with type 2 diabetes from blood samples"
    """
    if mode == "mock":
        return compute_facets_with_llm_and_opensearch(
            query=payload.query, use_mock_llm=True
        )
    elif mode == "llm":
        return compute_facets_with_llm_and_opensearch(
            query=payload.query, use_mock_llm=False
        )
    else:
        # Default: stub mode (backwards compatible)
        return compute_facets_from_query()
