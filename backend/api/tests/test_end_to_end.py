"""End-to-end tests for complete LLM + OpenSearch workflow."""
import pytest
from opensearchpy.exceptions import ConnectionError

from services.facets_service import compute_facets_with_llm_and_opensearch
from services.opensearch_concept_resolver import OpenSearchConceptResolver


def is_opensearch_available() -> bool:
    """Check if OpenSearch is running."""
    try:
        resolver = OpenSearchConceptResolver()
        return resolver.health_check()
    except (ConnectionError, Exception):
        return False


# Skip if OpenSearch not available
pytestmark = pytest.mark.skipif(
    not is_opensearch_available(),
    reason="OpenSearch not available (docker-compose up required)",
)


def test_end_to_end_simple_query() -> None:
    """Test complete workflow with simple query using mock LLM."""
    query = "diabetes"

    result = compute_facets_with_llm_and_opensearch(query, use_mock_llm=True)

    assert result.query == query
    assert len(result.facets) > 0

    # Should have extracted and normalized diabetes
    facet_dict = {fs.facet: fs for fs in result.facets}

    # Should return database facet name "diagnoses.disease"
    diagnosis_facets = [
        fs for fs in result.facets if fs.facet == "diagnoses.disease"
    ]

    assert len(diagnosis_facets) > 0


def test_end_to_end_multi_facet_query() -> None:
    """Test complete workflow with multi-facet query."""
    query = "latino patients with diabetes and bam files"

    result = compute_facets_with_llm_and_opensearch(query, use_mock_llm=True)

    assert result.query == query
    assert len(result.facets) >= 2  # Should have multiple facets

    # Check that we have facet selections
    facets_found = {fs.facet for fs in result.facets}
    print(f"Facets found: {facets_found}")

    # Should have extracted multiple different facets
    assert len(facets_found) >= 2


def test_end_to_end_with_unknown_terms() -> None:
    """Test that unknown terms are handled gracefully."""
    query = "foobar xyzabc unknown_term_123"

    result = compute_facets_with_llm_and_opensearch(query, use_mock_llm=True)

    assert result.query == query

    # Mock extractor will assign these to "unmatched" facet
    # OpenSearch won't find them, so they should return "unknown" term
    unmatched_facets = [fs for fs in result.facets if "unmatched" in fs.facet.lower()]

    if unmatched_facets:
        # Check that unknown terms get "unknown" as the term
        for facet_selection in unmatched_facets:
            for selected_value in facet_selection.selectedValues:
                assert selected_value.term == "unknown"


def test_end_to_end_empty_query() -> None:
    """Test that empty query returns empty response."""
    result = compute_facets_with_llm_and_opensearch("", use_mock_llm=True)

    assert result.query == ""
    assert result.facets == []


def test_end_to_end_complex_query() -> None:
    """Test complex query with many facets."""
    query = "latino female patients with type 2 diabetes from brain tissue bam files"

    result = compute_facets_with_llm_and_opensearch(query, use_mock_llm=True)

    assert result.query == query
    assert len(result.facets) >= 3  # Should extract multiple facets

    # Get all mention texts
    all_mentions = []
    for fs in result.facets:
        for sv in fs.selectedValues:
            all_mentions.append(sv.mention)

    print(f"Extracted mentions: {all_mentions}")

    # Should have extracted some key terms
    mention_set = {m.lower() for m in all_mentions}

    # Check for at least some of the expected mentions
    expected_found = 0
    if "latino" in mention_set:
        expected_found += 1
    if "diabetes" in mention_set or "type 2 diabetes" in mention_set:
        expected_found += 1
    if "bam" in mention_set:
        expected_found += 1
    if "brain" in mention_set:
        expected_found += 1

    assert expected_found >= 2, f"Should find at least 2 expected mentions, found {expected_found}"
