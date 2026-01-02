import os
from typing import List, Dict
from fastapi import APIRouter, Query as QueryParam, HTTPException

from services.facets_service import (
    compute_facets_from_query,
    compute_facets_with_llm_and_opensearch,
)
from services.models import FacetsResponse
from controllers.models import FacetsRequest

router = APIRouter(prefix="/api/v0", tags=["facets"])


@router.post("/facets")
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
    if mode == "llm":
        # Check for API key before proceeding
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise HTTPException(
                status_code=400,
                detail={
                    "error": "Missing OpenAI API key",
                    "message": "OPENAI_API_KEY environment variable is not set. "
                    "Please set it in backend/opensearch/.env or use mode=mock for testing.",
                    "suggestion": "Try adding mode=mock to the URL for pattern matching (no API key required)",
                },
            )

        return compute_facets_with_llm_and_opensearch(
            query=payload.query, use_mock_llm=False
        )
    elif mode == "mock":
        return compute_facets_with_llm_and_opensearch(
            query=payload.query, use_mock_llm=True
        )
    else:
        # Default: stub mode (backwards compatible)
        return compute_facets_from_query()


@router.post("/extract-mentions")
def extract_mentions(payload: FacetsRequest) -> List[Dict[str, str]]:
    """Extract mentions from query using LLM (without OpenSearch normalization).

    This endpoint is used for testing LLM extraction in isolation.
    Returns raw mentions with facet assignments before normalization.

    Returns:
        List of mention dicts with 'text' and 'facet' keys
    """
    from services.llm_mention_extractor import LLMMentionExtractor
    from services.llm_config import LLMConfig
    from services.anvil_config import get_anvil_facet_mapping

    # Check for API key
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Missing OpenAI API key",
                "message": "OPENAI_API_KEY environment variable is not set. "
                "Please set it in backend/opensearch/.env",
            },
        )

    # Extract mentions using real LLM
    llm_extractor = LLMMentionExtractor(
        LLMConfig(), facet_name_mapping=get_anvil_facet_mapping()
    )

    try:
        mentions = llm_extractor.extract_mentions(payload.query)
        return [{"text": m.text, "facet": m.facet} for m in mentions]
    except Exception as e:
        raise HTTPException(
            status_code=500, detail={"error": "LLM extraction failed", "message": str(e)}
        )
