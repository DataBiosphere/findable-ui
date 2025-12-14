from __future__ import annotations

from services.models import FacetsResponse


def compute_facets_from_query() -> FacetsResponse:
    """Return a stubbed query-to-facets response for PoC purposes.

    This function will later be replaced by a real implementation that uses
    LLM-backed intent parsing and facet resolution.
    """

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
