from __future__ import annotations

from services.models import FacetsResponse
from services.normalization_service import MentionNormalizer, Mention


def compute_facets_from_query(query: str = "", concept_resolver=None) -> FacetsResponse:
    """Return a stubbed query-to-facets response for PoC purposes.

    This function will later be replaced by a real implementation that uses
    LLM-backed intent parsing and facet resolution.

    Args:
        query: The user's natural language query.
        concept_resolver: Optional concept resolver for mention normalization.
            If provided, enables normalization workflow. If None, returns stub data.

    Returns:
        FacetsResponse with normalized facet selections.
    """

    # Example of how to use the normalizer (will be activated in Phase 2):
    # if concept_resolver:
    #     # Step 1: Extract mentions from query using LLM (Phase 2)
    #     mentions = extract_mentions_with_llm(query)
    #
    #     # Step 2: Normalize mentions using concept resolver
    #     normalizer = MentionNormalizer(concept_resolver)
    #     facet_selections = normalizer.normalize_mentions(mentions)
    #
    #     return FacetsResponse(query=query, facets=facet_selections)

    # For now, return stubbed data
    stub_query = "public bam files for latino foobar patients with diabetes or foobaz"
    return FacetsResponse.model_validate(
        {
            "query": "public bam files for latino foobar patients with diabetes or foobaz",
            "facets": [
                {
                    "facet": "Access",
                    "selectedValues": [
                        {
                            "term": "Granted",
                            "mention": "public",
                        }
                    ],
                },
                {
                    "facet": "Diagnosis",
                    "selectedValues": [
                        {
                            "term": "MONDO:0005015",
                            "mention": "diabetes",  # Mention resolved but value does not exist in dev
                        },
                        {
                            "term": "unknown",
                            "mention": "foobaz",  # Mention resolved to a disease but does not match a known term
                        },
                    ],
                },
                {
                    "facet": "File Format",
                    "selectedValues": [
                        {
                            "term": ".bam",
                            "mention": "bam",
                        }
                    ],
                },
                {
                    "facet": "Reported Ethnicity",
                    "selectedValues": [
                        {
                            "term": "Hispanic or Latino",
                            "mention": "latino",
                        },
                    ],
                },
                {
                    "facet": "unknown",
                    "selectedValues": [
                        {
                            "term": "unknown",
                            "mention": "foobar",  # Mention not resolved to a facet or facet term
                        }
                    ],
                },
            ],
        }
    )


def compute_facets_with_normalizer(query: str, concept_resolver) -> FacetsResponse:
    """Example showing how to use the normalizer with extracted mentions.

    This demonstrates the Phase 1 normalization workflow. In Phase 2, the stubbed
    mentions will be replaced with real LLM-based extraction.

    Args:
        query: The user's natural language query.
        concept_resolver: The concept resolver (mock or real OpenSearch).

    Returns:
        FacetsResponse with normalized facet selections.
    """
    # Stubbed mentions extraction (will be replaced by LLM in Phase 2)
    # For now, manually create mentions from the example query
    stubbed_mentions = [
        Mention(text="public", facet="Access"),
        Mention(text="bam", facet="File Format"),
        Mention(text="latino", facet="Reported Ethnicity"),
        Mention(text="foobar", facet="unknown"),  # Unknown mention
        Mention(text="diabetes", facet="Diagnosis"),
        Mention(text="foobaz", facet="Diagnosis"),  # Will be unknown
    ]

    # Normalize mentions using the concept resolver
    normalizer = MentionNormalizer(concept_resolver)
    facet_selections = normalizer.normalize_mentions(stubbed_mentions)

    return FacetsResponse(query=query, facets=facet_selections)


def compute_facets_with_opensearch(query: str) -> FacetsResponse:
    """Demonstration using real OpenSearch concept resolver.

    This shows the complete Phase 3 workflow with real OpenSearch lookups.
    Still uses stubbed mention extraction (Phase 2 will add LLM).

    Args:
        query: The user's natural language query.

    Returns:
        FacetsResponse with facets normalized against real OpenSearch database.

    Note:
        Requires OpenSearch to be running with concepts loaded.
        Falls back to empty response if OpenSearch is unavailable.
    """
    from services.config import create_opensearch_resolver

    # Create the real OpenSearch resolver with AnVIL config
    try:
        resolver = create_opensearch_resolver()

        # Check if OpenSearch is available
        if not resolver.health_check():
            print("Warning: OpenSearch is not available")
            return FacetsResponse(query=query, facets=[])

    except Exception as e:
        print(f"Error connecting to OpenSearch: {e}")
        return FacetsResponse(query=query, facets=[])

    # Stubbed mentions extraction (will be replaced by LLM in Phase 2)
    # Using AnVIL API facet names (will be mapped by resolver)
    stubbed_mentions = [
        Mention(text="bam", facet="File Format"),
        Mention(text="latino", facet="Reported Ethnicity"),
        Mention(text="diabetes", facet="Diagnosis"),
        Mention(text="unknown_term_xyz", facet="Diagnosis"),  # Will not match
    ]

    # Normalize mentions using the real OpenSearch resolver
    normalizer = MentionNormalizer(resolver)
    facet_selections = normalizer.normalize_mentions(stubbed_mentions)

    return FacetsResponse(query=query, facets=facet_selections)


def compute_facets_with_llm_and_opensearch(query: str, use_mock_llm: bool = False) -> FacetsResponse:
    """Complete Phase 2+3 workflow: LLM extraction + OpenSearch normalization.

    This is the COMPLETE implementation combining:
    - Phase 2: LLM-based mention extraction
    - Phase 3: OpenSearch-based normalization

    Args:
        query: Natural language query from user.
        use_mock_llm: If True, uses mock LLM extractor (for testing).
            If False, uses real OpenAI API (requires API key).

    Returns:
        FacetsResponse with LLM-extracted and OpenSearch-normalized facets.

    Note:
        Requires both OpenAI API key and OpenSearch to be running.
    """
    from services.config import create_opensearch_resolver

    # Step 1: Extract mentions using LLM
    if use_mock_llm:
        from tests.mock_llm_extractor import MockLLMMentionExtractor
        llm_extractor = MockLLMMentionExtractor()
    else:
        from services.llm_mention_extractor import LLMMentionExtractor
        from services.llm_config import LLMConfig
        llm_extractor = LLMMentionExtractor(LLMConfig())

    try:
        mentions = llm_extractor.extract_mentions(query)

        if not mentions:
            return FacetsResponse(query=query, facets=[])

    except Exception as e:
        print(f"Error extracting mentions: {e}")
        return FacetsResponse(query=query, facets=[])

    # Step 2: Normalize mentions using OpenSearch
    try:
        resolver = create_opensearch_resolver()

        if not resolver.health_check():
            print("Warning: OpenSearch is not available")
            return FacetsResponse(query=query, facets=[])

        normalizer = MentionNormalizer(resolver)
        facet_selections = normalizer.normalize_mentions(mentions)

        return FacetsResponse(query=query, facets=facet_selections)

    except Exception as e:
        print(f"Error normalizing mentions: {e}")
        return FacetsResponse(query=query, facets=[])
