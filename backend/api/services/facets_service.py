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
