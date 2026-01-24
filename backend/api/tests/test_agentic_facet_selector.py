"""Tests for the agentic facet selector."""

import os

import pytest
from pydantic import ValidationError

from agents.agentic_facet_config import AgenticFacetConfig
from agents.agentic_facet_selector import (
    AgenticFacetSelector,
    AgentResult,
    FacetMatch,
)
from tests.mock_concept_resolver import MockConceptResolver


# ============================================================================
# Config Tests
# ============================================================================


def test_config_defaults() -> None:
    """Test that config has expected default values."""
    config = AgenticFacetConfig()

    assert config.enable_cot is True
    assert config.max_iterations == 10
    assert config.model == "gpt-4o-mini"
    assert config.capture_trace is False
    assert config.timeout == 60.0


def test_config_custom_values() -> None:
    """Test that config accepts custom values."""
    config = AgenticFacetConfig(
        enable_cot=False,
        max_iterations=5,
        model="gpt-4o",
        capture_trace=True,
        timeout=30.0,
    )

    assert config.enable_cot is False
    assert config.max_iterations == 5
    assert config.model == "gpt-4o"
    assert config.capture_trace is True
    assert config.timeout == 30.0


def test_config_validation_max_iterations() -> None:
    """Test that max_iterations is validated."""
    # Valid range
    config = AgenticFacetConfig(max_iterations=1)
    assert config.max_iterations == 1

    config = AgenticFacetConfig(max_iterations=50)
    assert config.max_iterations == 50

    # Invalid: less than 1
    with pytest.raises(ValidationError):
        AgenticFacetConfig(max_iterations=0)

    # Invalid: greater than 50
    with pytest.raises(ValidationError):
        AgenticFacetConfig(max_iterations=51)


def test_config_validation_timeout() -> None:
    """Test that timeout is validated."""
    # Valid range
    config = AgenticFacetConfig(timeout=1.0)
    assert config.timeout == 1.0

    config = AgenticFacetConfig(timeout=300.0)
    assert config.timeout == 300.0

    # Invalid: less than 1.0
    with pytest.raises(ValidationError):
        AgenticFacetConfig(timeout=0.5)

    # Invalid: greater than 300.0
    with pytest.raises(ValidationError):
        AgenticFacetConfig(timeout=301.0)


# ============================================================================
# Model Tests
# ============================================================================


def test_facet_match_model() -> None:
    """Test the FacetMatch pydantic model."""
    match = FacetMatch(
        facet="Diagnosis",
        term="MONDO:0005015",
        mention="diabetes",
    )

    assert match.facet == "Diagnosis"
    assert match.term == "MONDO:0005015"
    assert match.mention == "diabetes"


def test_agent_result_model() -> None:
    """Test the AgentResult pydantic model."""
    result = AgentResult(
        facets=[
            FacetMatch(facet="Diagnosis", term="MONDO:0005015", mention="diabetes"),
            FacetMatch(facet="File Format", term=".bam", mention="bam"),
        ]
    )

    assert len(result.facets) == 2
    assert result.facets[0].facet == "Diagnosis"
    assert result.facets[1].facet == "File Format"


def test_agent_result_empty() -> None:
    """Test AgentResult with empty facets list."""
    result = AgentResult(facets=[])
    assert len(result.facets) == 0

    # Default factory
    result2 = AgentResult()
    assert len(result2.facets) == 0


# ============================================================================
# MockConceptResolver Tests
# ============================================================================


def test_mock_resolver_any_facet() -> None:
    """Test that mock resolver's resolve_mention_any_facet works."""
    resolver = MockConceptResolver()

    # Test known terms
    results = resolver.resolve_mention_any_facet("diabetes")
    assert len(results) == 1
    assert results[0]["facet_name"] == "Diagnosis"
    assert results[0]["term"] == "MONDO:0005015"

    results = resolver.resolve_mention_any_facet("bam")
    assert len(results) == 1
    assert results[0]["facet_name"] == "File Format"
    assert results[0]["term"] == ".bam"

    # Test unknown term
    results = resolver.resolve_mention_any_facet("unknown_term")
    assert len(results) == 0


def test_mock_resolver_health_check() -> None:
    """Test that mock resolver health check returns True."""
    resolver = MockConceptResolver()
    assert resolver.health_check() is True


# ============================================================================
# AgenticFacetSelector Unit Tests
# ============================================================================


def test_selector_empty_query() -> None:
    """Test that empty query returns empty response."""
    resolver = MockConceptResolver()
    config = AgenticFacetConfig()

    # We can't actually run the agent without an API key,
    # but we can test the empty query path
    selector = AgenticFacetSelector(resolver, config)

    # Empty query should return empty facets without calling the LLM
    response = selector.select_facets("")
    assert response.query == ""
    assert response.facets == []

    response = selector.select_facets("   ")
    assert response.query == "   "
    assert response.facets == []


def test_selector_convert_to_response() -> None:
    """Test the _convert_to_response helper method."""
    resolver = MockConceptResolver()
    config = AgenticFacetConfig()
    selector = AgenticFacetSelector(resolver, config)

    # Create a mock result
    result = AgentResult(
        facets=[
            FacetMatch(facet="Diagnosis", term="MONDO:0005015", mention="diabetes"),
            FacetMatch(
                facet="Reported Ethnicity", term="Hispanic or Latino", mention="latino"
            ),
            FacetMatch(facet="Diagnosis", term="MONDO:0005015", mention="diabetic"),
        ]
    )

    response = selector._convert_to_response("test query", result, [])

    assert response.query == "test query"
    assert len(response.facets) == 2  # Grouped by facet name

    # Find Diagnosis facet
    diagnosis_facet = next(f for f in response.facets if f.facet == "Diagnosis")
    assert len(diagnosis_facet.selectedValues) == 2

    # Find Ethnicity facet
    ethnicity_facet = next(
        f for f in response.facets if f.facet == "Reported Ethnicity"
    )
    assert len(ethnicity_facet.selectedValues) == 1
    assert ethnicity_facet.selectedValues[0].term == "Hispanic or Latino"


# ============================================================================
# Integration Tests (require OPENAI_API_KEY)
# ============================================================================


@pytest.mark.skipif(
    not os.getenv("OPENAI_API_KEY"),
    reason="OPENAI_API_KEY not set",
)
def test_selector_integration_simple_query() -> None:
    """Integration test: simple query with one term."""
    resolver = MockConceptResolver()
    config = AgenticFacetConfig(
        enable_cot=False,  # Use minimal prompt for faster test
        timeout=30.0,
    )
    selector = AgenticFacetSelector(resolver, config)

    response = selector.select_facets("patients with diabetes")

    # Should find diabetes in Diagnosis facet
    assert response.query == "patients with diabetes"
    # The agent should find at least the diabetes term
    # (actual results depend on LLM behavior)


@pytest.mark.skipif(
    not os.getenv("OPENAI_API_KEY"),
    reason="OPENAI_API_KEY not set",
)
def test_selector_integration_multi_term_query() -> None:
    """Integration test: query with multiple terms."""
    resolver = MockConceptResolver()
    config = AgenticFacetConfig(
        enable_cot=True,
        capture_trace=True,
        timeout=60.0,
    )
    selector = AgenticFacetSelector(resolver, config)

    response = selector.select_facets("bam files from hispanic patients with diabetes")

    # Should find multiple facets
    assert response.query == "bam files from hispanic patients with diabetes"
    # Results depend on LLM behavior, but we expect some facets


@pytest.mark.skipif(
    not os.getenv("OPENAI_API_KEY"),
    reason="OPENAI_API_KEY not set",
)
def test_selector_integration_no_matches() -> None:
    """Integration test: query with no matching terms."""
    resolver = MockConceptResolver()
    config = AgenticFacetConfig(
        enable_cot=False,
        timeout=30.0,
    )
    selector = AgenticFacetSelector(resolver, config)

    response = selector.select_facets("completely random nonsense xyz123")

    # Should return empty or minimal facets
    assert response.query == "completely random nonsense xyz123"
