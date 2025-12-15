"""Integration tests for OpenSearchConceptResolver against real OpenSearch instance.

These tests require OpenSearch to be running with concepts loaded.
Tests will be skipped if OpenSearch is not available.
"""
import pytest
from opensearchpy.exceptions import ConnectionError

from services.opensearch_concept_resolver import OpenSearchConceptResolver
from services.anvil_config import ANVIL_FACET_NAME_MAPPING


def is_opensearch_available() -> bool:
    """Check if OpenSearch is running and accessible.

    Returns:
        True if OpenSearch is available, False otherwise.
    """
    try:
        resolver = OpenSearchConceptResolver()
        return resolver.health_check()
    except (ConnectionError, Exception):
        return False


# Skip all tests in this module if OpenSearch is not available
pytestmark = pytest.mark.skipif(
    not is_opensearch_available(),
    reason="OpenSearch is not available (docker-compose up required)",
)


@pytest.fixture
def resolver() -> OpenSearchConceptResolver:
    """Fixture providing an OpenSearch resolver without facet mapping."""
    return OpenSearchConceptResolver()


@pytest.fixture
def anvil_resolver() -> OpenSearchConceptResolver:
    """Fixture providing an OpenSearch resolver with AnVIL facet mapping."""
    return OpenSearchConceptResolver(facet_name_mapping=ANVIL_FACET_NAME_MAPPING)


def test_health_check(resolver: OpenSearchConceptResolver) -> None:
    """Test that health check returns True for running OpenSearch."""
    assert resolver.health_check() is True


def test_exact_match_diabetes(resolver: OpenSearchConceptResolver) -> None:
    """Test exact match for 'diabetes' in disease facet."""
    results = resolver.resolve_mention(
        facet_name="diagnoses.disease", mention="diabetes", top_k=3
    )

    # Should find results
    assert len(results) > 0

    # Check structure of results
    top_result = results[0]
    assert "score" in top_result
    assert "id" in top_result
    assert "term" in top_result
    assert "name" in top_result
    assert "facet_name" in top_result
    assert top_result["facet_name"] == "diagnoses.disease"

    # Should find diabetes-related terms
    diabetes_terms = [r["name"].lower() for r in results]
    assert any("diabetes" in term for term in diabetes_terms)


def test_synonym_match_latino(resolver: OpenSearchConceptResolver) -> None:
    """Test synonym matching for 'latino' in ethnicity facet."""
    results = resolver.resolve_mention(
        facet_name="donors.reported_ethnicity", mention="latino", top_k=5
    )

    assert len(results) > 0

    # Should find Hispanic/Latino terms
    names = [r["name"].lower() for r in results]
    assert any("latino" in name or "hispanic" in name for name in names)


def test_fuzzy_match_typo(resolver: OpenSearchConceptResolver) -> None:
    """Test fuzzy matching with typo: 'diabtes' should still find diabetes."""
    results = resolver.resolve_mention(
        facet_name="diagnoses.disease", mention="diabtes", top_k=3
    )

    # Should still find results despite typo
    assert len(results) > 0

    # Should find diabetes-related terms
    diabetes_terms = [r["name"].lower() for r in results]
    assert any("diabetes" in term for term in diabetes_terms)


def test_file_format_bam(resolver: OpenSearchConceptResolver) -> None:
    """Test searching for 'bam' file format."""
    results = resolver.resolve_mention(
        facet_name="files.file_format", mention="bam", top_k=3
    )

    assert len(results) > 0

    # Should find .bam or .bai
    terms = [r["term"] for r in results]
    assert any(".bam" in term.lower() or ".bai" in term.lower() for term in terms)


def test_no_match_returns_empty(resolver: OpenSearchConceptResolver) -> None:
    """Test that non-existent term returns empty list."""
    results = resolver.resolve_mention(
        facet_name="diagnoses.disease",
        mention="xyzabc123nonexistent",  # Gibberish that won't match
        top_k=5,
    )

    assert results == []


def test_facet_name_mapping(anvil_resolver: OpenSearchConceptResolver) -> None:
    """Test that facet name mapping works correctly."""
    # Use API facet name "Diagnosis" which should map to "diagnoses.disease"
    results = anvil_resolver.resolve_mention(
        facet_name="Diagnosis", mention="diabetes", top_k=3
    )

    assert len(results) > 0

    # Results should have the OpenSearch facet name
    assert results[0]["facet_name"] == "diagnoses.disease"


def test_multiple_facets_different_results(resolver: OpenSearchConceptResolver) -> None:
    """Test that different facets return results from the correct facet."""
    # Search for "diabetes" in disease facet
    disease_results = resolver.resolve_mention(
        facet_name="diagnoses.disease", mention="diabetes", top_k=3
    )

    # Search for "tissue" in biosample type facet
    biosample_results = resolver.resolve_mention(
        facet_name="biosamples.biosample_type", mention="tissue", top_k=3
    )

    # Both should have results
    assert len(disease_results) > 0
    assert len(biosample_results) > 0

    # Results should be from different facets
    assert disease_results[0]["facet_name"] == "diagnoses.disease"
    assert biosample_results[0]["facet_name"] == "biosamples.biosample_type"


def test_case_insensitive_search(resolver: OpenSearchConceptResolver) -> None:
    """Test that search is case-insensitive."""
    lowercase_results = resolver.resolve_mention(
        facet_name="donors.reported_ethnicity", mention="latino", top_k=3
    )

    uppercase_results = resolver.resolve_mention(
        facet_name="donors.reported_ethnicity", mention="LATINO", top_k=3
    )

    # Both should find results
    assert len(lowercase_results) > 0
    assert len(uppercase_results) > 0

    # Should find similar terms (not necessarily identical scores due to boosting)
    lowercase_names = {r["name"] for r in lowercase_results}
    uppercase_names = {r["name"] for r in uppercase_results}
    assert len(lowercase_names & uppercase_names) > 0  # Some overlap


def test_top_k_limits_results(resolver: OpenSearchConceptResolver) -> None:
    """Test that top_k parameter limits the number of results."""
    results_k1 = resolver.resolve_mention(
        facet_name="diagnoses.disease", mention="diabetes", top_k=1
    )

    results_k5 = resolver.resolve_mention(
        facet_name="diagnoses.disease", mention="diabetes", top_k=5
    )

    assert len(results_k1) == 1
    assert len(results_k5) <= 5
    assert len(results_k5) >= len(results_k1)


def test_results_sorted_by_score(resolver: OpenSearchConceptResolver) -> None:
    """Test that results are sorted by relevance score (descending)."""
    results = resolver.resolve_mention(
        facet_name="diagnoses.disease", mention="diabetes", top_k=5
    )

    if len(results) > 1:
        scores = [r["score"] for r in results]
        # Scores should be in descending order
        assert scores == sorted(scores, reverse=True)


def test_metadata_included_in_results(resolver: OpenSearchConceptResolver) -> None:
    """Test that metadata is included in results."""
    results = resolver.resolve_mention(
        facet_name="files.file_format", mention="bam", top_k=1
    )

    assert len(results) > 0
    assert "metadata" in results[0]
    # Metadata should be a dict (may be empty)
    assert isinstance(results[0]["metadata"], dict)
