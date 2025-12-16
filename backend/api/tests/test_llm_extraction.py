"""Tests for LLM-based mention extraction."""

import pytest

from services.normalization_service import Mention
from services.anvil_config import get_anvil_facet_mapping
from tests.mock_llm_extractor import MockLLMMentionExtractor


@pytest.fixture
def mock_extractor() -> MockLLMMentionExtractor:
    """Fixture providing a mock LLM extractor."""
    return MockLLMMentionExtractor()


@pytest.fixture
def mock_extractor_with_mapping() -> MockLLMMentionExtractor:
    """Fixture providing a mock LLM extractor with facet name mapping."""
    return MockLLMMentionExtractor(facet_name_mapping=get_anvil_facet_mapping())


def test_simple_query_diabetes(mock_extractor: MockLLMMentionExtractor) -> None:
    """Test extraction from simple query with one term."""
    query = "diabetes"

    mentions = mock_extractor.extract_mentions(query)

    assert len(mentions) == 1
    assert mentions[0].text == "diabetes"
    assert mentions[0].facet == "Diagnosis"


def test_multi_facet_query(mock_extractor: MockLLMMentionExtractor) -> None:
    """Test extraction from query with multiple facets."""
    query = "latino patients with diabetes"

    mentions = mock_extractor.extract_mentions(query)

    # Should extract both latino and diabetes
    assert len(mentions) >= 2

    mention_dict = {m.text: m.facet for m in mentions}
    assert "latino" in mention_dict
    assert mention_dict["latino"] == "Reported Ethnicity"
    assert "diabetes" in mention_dict
    assert mention_dict["diabetes"] == "Diagnosis"


def test_file_format_query(mock_extractor: MockLLMMentionExtractor) -> None:
    """Test extraction of file format mentions."""
    query = "bam files for analysis"

    mentions = mock_extractor.extract_mentions(query)

    assert any(m.text == "bam" and m.facet == "File Format" for m in mentions)


def test_anatomical_site_query(mock_extractor: MockLLMMentionExtractor) -> None:
    """Test extraction of anatomical site mentions."""
    query = "brain tissue samples"

    mentions = mock_extractor.extract_mentions(query)

    assert any(m.text == "brain" and m.facet == "Anatomical Site" for m in mentions)


def test_complex_multi_facet_query(mock_extractor: MockLLMMentionExtractor) -> None:
    """Test extraction from complex query with many facets."""
    query = "latino patients with diabetes and bam files from brain tissue"

    mentions = mock_extractor.extract_mentions(query)

    mention_dict = {m.text: m.facet for m in mentions}

    # Should have all four facets
    assert "latino" in mention_dict
    assert mention_dict["latino"] == "Reported Ethnicity"

    assert "diabetes" in mention_dict
    assert mention_dict["diabetes"] == "Diagnosis"

    assert "bam" in mention_dict
    assert mention_dict["bam"] == "File Format"

    assert "brain" in mention_dict
    assert mention_dict["brain"] == "Anatomical Site"


def test_unmatched_terms(mock_extractor: MockLLMMentionExtractor) -> None:
    """Test that unmatched terms are assigned to 'unmatched' facet."""
    query = "public foobar data"

    mentions = mock_extractor.extract_mentions(query)

    # Both "public" and "foobar" should be unmatched
    unmatched = [m for m in mentions if m.facet == "unmatched"]
    assert len(unmatched) >= 1

    unmatched_texts = {m.text for m in unmatched}
    assert "public" in unmatched_texts or "foobar" in unmatched_texts


def test_empty_query_returns_empty(mock_extractor: MockLLMMentionExtractor) -> None:
    """Test that empty query returns empty list."""
    assert mock_extractor.extract_mentions("") == []
    assert mock_extractor.extract_mentions("   ") == []


def test_typo_handling(mock_extractor: MockLLMMentionExtractor) -> None:
    """Test that common typos are still recognized."""
    query = "diabtes"  # Typo

    mentions = mock_extractor.extract_mentions(query)

    assert len(mentions) >= 1
    assert any(m.text == "diabtes" and m.facet == "Diagnosis" for m in mentions)


def test_case_insensitive_matching(mock_extractor: MockLLMMentionExtractor) -> None:
    """Test that matching is case-insensitive."""
    query_lower = "diabetes"
    query_upper = "DIABETES"
    query_mixed = "Diabetes"

    mentions_lower = mock_extractor.extract_mentions(query_lower)
    mentions_upper = mock_extractor.extract_mentions(query_upper)
    mentions_mixed = mock_extractor.extract_mentions(query_mixed)

    # All should extract diabetes
    assert len(mentions_lower) >= 1
    assert len(mentions_upper) >= 1
    assert len(mentions_mixed) >= 1


def test_no_duplicate_mentions(mock_extractor: MockLLMMentionExtractor) -> None:
    """Test that duplicate mentions are not returned."""
    query = "diabetes and diabetes and more diabetes"

    mentions = mock_extractor.extract_mentions(query)

    # Should only have one diabetes mention
    diabetes_mentions = [m for m in mentions if m.text == "diabetes"]
    assert len(diabetes_mentions) == 1


def test_stats_tracking(mock_extractor: MockLLMMentionExtractor) -> None:
    """Test that usage stats are tracked."""
    mock_extractor.reset_stats()

    # Process some queries
    mock_extractor.extract_mentions("diabetes")
    mock_extractor.extract_mentions("latino patients")

    stats = mock_extractor.get_stats()

    assert stats["total_queries"] == 2
    assert stats["total_input_tokens"] > 0
    assert stats["total_output_tokens"] > 0


def test_reset_stats(mock_extractor: MockLLMMentionExtractor) -> None:
    """Test that stats can be reset."""
    mock_extractor.extract_mentions("test query")

    stats_before = mock_extractor.get_stats()
    assert stats_before["total_queries"] > 0

    mock_extractor.reset_stats()

    stats_after = mock_extractor.get_stats()
    assert stats_after["total_queries"] == 0
    assert stats_after["total_input_tokens"] == 0


def test_multi_word_mentions(mock_extractor: MockLLMMentionExtractor) -> None:
    """Test extraction of multi-word mentions."""
    query = "type 2 diabetes in african american patients"

    mentions = mock_extractor.extract_mentions(query)

    mention_texts = {m.text for m in mentions}

    # Should extract multi-word terms
    assert "type 2 diabetes" in mention_texts or "diabetes" in mention_texts
    assert "african american" in mention_texts


def test_phenotypic_sex_extraction(mock_extractor: MockLLMMentionExtractor) -> None:
    """Test extraction of phenotypic sex."""
    query = "male patients with cancer"

    mentions = mock_extractor.extract_mentions(query)

    assert any(m.text == "male" and m.facet == "Phenotypic Sex" for m in mentions)


def test_individual_phenotype_feature_as_diagnosis(
    mock_extractor_with_mapping: MockLLMMentionExtractor,
) -> None:
    """Test that individual phenotypic features are extracted as Diagnosis."""
    query = "patients with cleft palate"

    mentions = mock_extractor_with_mapping.extract_mentions(query)

    assert any(
        m.text == "cleft palate" and m.facet == "diagnoses.disease" for m in mentions
    )


def test_complex_phenotype_syndrome(
    mock_extractor_with_mapping: MockLLMMentionExtractor,
) -> None:
    """Test that complex phenotype syndromes are extracted as Phenotype."""
    query = "patients with Coffin-Siris syndrome"

    mentions = mock_extractor_with_mapping.extract_mentions(query)

    assert any(
        m.text == "Coffin-Siris syndrome" and m.facet == "diagnoses.phenotype"
        for m in mentions
    )


def test_diagnosis_vs_phenotype_distinction(
    mock_extractor_with_mapping: MockLLMMentionExtractor,
) -> None:
    """Test that the mock extractor distinguishes between Diagnosis and Phenotype."""
    query = "patients with diabetes and Epileptic Encephalopathy"

    mentions = mock_extractor_with_mapping.extract_mentions(query)

    # diabetes should be Diagnosis (diagnoses.disease)
    assert any(
        m.text == "diabetes" and m.facet == "diagnoses.disease" for m in mentions
    )
    # Epileptic Encephalopathy should be Phenotype (diagnoses.phenotype)
    assert any(
        m.text == "Epileptic Encephalopathy" and m.facet == "diagnoses.phenotype"
        for m in mentions
    )
