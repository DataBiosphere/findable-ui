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


# ============================================================================
# Negation Filtering Tests
# ============================================================================


def test_has_negation_prefix(resolver: OpenSearchConceptResolver) -> None:
    """Test detection of negation prefixes in queries."""
    # Should detect negation prefixes
    assert resolver._has_negation_prefix("non-alcoholic") is True
    assert resolver._has_negation_prefix("not hispanic") is True
    assert resolver._has_negation_prefix("anti-inflammatory") is True
    assert resolver._has_negation_prefix("no cancer") is True

    # Should not detect (no negation prefix)
    assert resolver._has_negation_prefix("hispanic") is False
    assert resolver._has_negation_prefix("alcoholic") is False
    assert resolver._has_negation_prefix("diabetes") is False
    assert resolver._has_negation_prefix("fatty liver") is False

    # Case insensitive
    assert resolver._has_negation_prefix("Non-Alcoholic") is True
    assert resolver._has_negation_prefix("NOT HISPANIC") is True


def test_filter_negation_values_with_negation_value_type(
    resolver: OpenSearchConceptResolver,
) -> None:
    """Test filtering of NEGATION_VALUE results based on query."""
    # Mock results with NEGATION_VALUE
    results = [
        {
            "term": "Hispanic or Latino",
            "modifier_role": None,
            "score": 100,
        },
        {
            "term": "Not Hispanic or Latino",
            "modifier_role": "NEGATION_VALUE",
            "score": 90,
        },
    ]

    # Query without negation prefix - should filter NEGATION_VALUE
    filtered = resolver._filter_negation_values(results, "hispanic")
    assert len(filtered) == 1
    assert filtered[0]["term"] == "Hispanic or Latino"

    # Query WITH negation prefix - should keep NEGATION_VALUE
    filtered = resolver._filter_negation_values(results, "not hispanic")
    assert len(filtered) == 2
    assert any(r["term"] == "Not Hispanic or Latino" for r in filtered)


def test_filter_negation_values_with_canonical_name_type(
    resolver: OpenSearchConceptResolver,
) -> None:
    """Test filtering of CANONICAL_NAME results based on query."""
    # Mock results with CANONICAL_NAME
    results = [
        {
            "term": "Non-alcoholic fatty liver disease",
            "modifier_role": "CANONICAL_NAME",
            "score": 100,
        },
        {
            "term": "Steatosis of liver",
            "modifier_role": None,
            "score": 80,
        },
    ]

    # Query matching negated component - should filter
    filtered = resolver._filter_negation_values(results, "alcoholic")
    assert len(filtered) == 1
    assert filtered[0]["term"] == "Steatosis of liver"

    # Query NOT matching negated component - should keep
    filtered = resolver._filter_negation_values(results, "fatty liver")
    assert len(filtered) == 2
    assert any(
        r["term"] == "Non-alcoholic fatty liver disease" for r in filtered
    )

    # Query WITH negation prefix - should keep
    filtered = resolver._filter_negation_values(results, "non-alcoholic")
    assert len(filtered) == 2


def test_filter_negation_values_no_modifier_role(
    resolver: OpenSearchConceptResolver,
) -> None:
    """Test that results without modifier_role are never filtered."""
    results = [
        {
            "term": "Diabetes mellitus",
            "modifier_role": None,
            "score": 100,
        },
        {
            "term": "Type 1 diabetes",
            "modifier_role": None,
            "score": 90,
        },
    ]

    # Should keep all results regardless of query
    filtered = resolver._filter_negation_values(results, "diabetes")
    assert len(filtered) == 2

    filtered = resolver._filter_negation_values(results, "not diabetes")
    assert len(filtered) == 2


def test_negation_filter_integration_ispanic(
    resolver: OpenSearchConceptResolver,
) -> None:
    """Integration test: 'ispanic' should NOT match 'Not Hispanic or Latino'."""
    results = resolver.resolve_mention(
        facet_name="donors.reported_ethnicity", mention="ispanic", top_k=10
    )

    # Should not contain "Not Hispanic or Latino"
    assert not any("not hispanic" in r["term"].lower() for r in results)

    # Should contain positive hispanic terms
    assert any("hispanic" in r["term"].lower() for r in results)


def test_negation_filter_integration_not_hispanic(
    resolver: OpenSearchConceptResolver,
) -> None:
    """Integration test: 'not hispanic' SHOULD match 'Not Hispanic or Latino'."""
    results = resolver.resolve_mention(
        facet_name="donors.reported_ethnicity", mention="not hispanic", top_k=10
    )

    # Should contain "Not Hispanic or Latino"
    assert any("not hispanic" in r["term"].lower() for r in results)


def test_negation_filter_integration_alcoholic(
    resolver: OpenSearchConceptResolver,
) -> None:
    """Integration test: 'alcoholic' should NOT match 'Non-alcoholic...'."""
    results = resolver.resolve_mention(
        facet_name="diagnoses.disease", mention="alcoholic", top_k=10
    )

    # Should not contain "Non-alcoholic fatty liver disease"
    assert not any("non-alcoholic" in r["term"].lower() for r in results)


def test_negation_filter_integration_fatty_liver(
    resolver: OpenSearchConceptResolver,
) -> None:
    """Integration test: 'fatty liver' SHOULD match 'Non-alcoholic...'."""
    results = resolver.resolve_mention(
        facet_name="diagnoses.disease", mention="fatty liver", top_k=10
    )

    # Should contain "Non-alcoholic fatty liver disease"
    assert any("non-alcoholic" in r["term"].lower() for r in results)


def test_negation_filter_integration_non_alcoholic(
    resolver: OpenSearchConceptResolver,
) -> None:
    """Integration test: 'non-alcoholic' SHOULD match 'Non-alcoholic...'."""
    results = resolver.resolve_mention(
        facet_name="diagnoses.disease", mention="non-alcoholic", top_k=10
    )

    # Should contain "Non-alcoholic fatty liver disease"
    assert any("non-alcoholic fatty liver" in r["term"].lower() for r in results)
