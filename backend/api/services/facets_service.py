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


def compute_facets_multistage(query: str) -> FacetsResponse:
    """Multi-stage extraction pipeline.

    Stage 1: Simple LLM extraction (no facet classification)
    Stage 2: OpenSearch lookup across all facets
    Stage 3: LLM normalization for unmatched terms
    Stage 4: Re-lookup normalized terms

    Args:
        query: Natural language query from user.

    Returns:
        FacetsResponse with extracted and normalized facets.
    """
    from services.config import create_opensearch_resolver
    from agents.simple_mention_extractor import SimpleMentionExtractor
    from agents.llm_mention_normalizer import LLMMentionNormalizer

    # Stage 1: Simple extraction (no facet classification)
    extractor = SimpleMentionExtractor()
    try:
        extraction_result = extractor.extract(query)
        # Extract just the text strings from mentions
        text_spans = [m.text for m in extraction_result.mentions]
        if not text_spans:
            return FacetsResponse(query=query, facets=[])
    except Exception as e:
        print(f"Error in Stage 1 extraction: {e}")
        return FacetsResponse(query=query, facets=[])

    # Stages 2-4: Normalize with OpenSearch + LLM fallback
    try:
        resolver = create_opensearch_resolver()

        if not resolver.health_check():
            print("Warning: OpenSearch is not available")
            return FacetsResponse(query=query, facets=[])

        llm_normalizer = LLMMentionNormalizer()
        normalizer = MentionNormalizer(resolver, llm_normalizer)
        facet_selections = normalizer.normalize_mentions_any_facet(text_spans)

        return FacetsResponse(query=query, facets=facet_selections)

    except Exception as e:
        print(f"Error in normalization: {e}")
        return FacetsResponse(query=query, facets=[])


def compute_facets_with_llm_and_opensearch(
    query: str, use_mock_llm: bool = False
) -> FacetsResponse:
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
    from services.anvil_config import get_anvil_facet_mapping

    if use_mock_llm:
        from tests.mock_llm_extractor import MockLLMMentionExtractor

        llm_extractor = MockLLMMentionExtractor(
            facet_name_mapping=get_anvil_facet_mapping()
        )
    else:
        from agents.llm_mention_extractor import LLMMentionExtractor
        from agents.llm_config import LLMConfig

        llm_extractor = LLMMentionExtractor(
            LLMConfig(), facet_name_mapping=get_anvil_facet_mapping()
        )

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


def _expand_response_to_descendants(
    resolver,
    response: FacetsResponse,
) -> FacetsResponse:
    """Post-process response to expand terms to ALL their descendants.

    Uses the resolver's expand_to_descendants method to find all concepts
    that have the matched term as an ancestor in the ontology hierarchy.

    Args:
        resolver: OpenSearch concept resolver with expand_to_descendants method.
        response: The agent's FacetsResponse.

    Returns:
        FacetsResponse with all descendants included for each matched term.
    """
    from services.models import FacetSelection, SelectedValue

    expanded_facets = []

    for facet_selection in response.facets:
        expanded_values = []
        seen_terms = set()

        for selected_value in facet_selection.selectedValues:
            # Expand this term to include all descendants
            descendants = resolver.expand_to_descendants(
                facet_selection.facet,
                selected_value.term,
            )

            for desc in descendants:
                display_term = desc.get("term", "")
                if display_term and display_term not in seen_terms:
                    seen_terms.add(display_term)
                    expanded_values.append(
                        SelectedValue(
                            term=display_term,
                            mention=selected_value.mention,
                            recognized=True,
                        )
                    )

            # Ensure we have at least the original term
            if selected_value.term not in seen_terms:
                seen_terms.add(selected_value.term)
                expanded_values.append(selected_value)

        expanded_facets.append(
            FacetSelection(facet=facet_selection.facet, selectedValues=expanded_values)
        )

    return FacetsResponse(
        query=response.query,
        facets=expanded_facets,
        suggested_synonyms=response.suggested_synonyms,
    )


def compute_facets_agentic(
    query: str,
    config=None,
) -> FacetsResponse:
    """Agentic facet extraction using tool-calling LLM.

    Uses an LLM agent that iteratively searches OpenSearch and reasons
    about results until it finds satisfactory facet matches. After the agent
    returns, terms are expanded to include ALL descendants via ontology hierarchy.

    Args:
        query: Natural language query from user.
        config: Optional AgenticFacetConfig. If None, uses defaults.

    Returns:
        FacetsResponse with extracted facets expanded to all descendants.
    """
    from services.config import create_opensearch_resolver
    from agents.agentic_facet_selector import AgenticFacetSelector
    from agents.agentic_facet_config import AgenticFacetConfig

    # Use default config if not provided
    if config is None:
        config = AgenticFacetConfig()

    # Create resolver and check health
    try:
        resolver = create_opensearch_resolver()

        if not resolver.health_check():
            print("Warning: OpenSearch is not available")
            return FacetsResponse(query=query, facets=[])

    except Exception as e:
        print(f"Error connecting to OpenSearch: {e}")
        return FacetsResponse(query=query, facets=[])

    # Create agent and select facets
    selector = AgenticFacetSelector(resolver, config)
    agent_response = selector.select_facets(query)

    # Post-process: expand each matched term to ALL descendants
    return _expand_response_to_descendants(resolver, agent_response)
