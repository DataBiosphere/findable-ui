"""Tests for mention normalization service."""
import pytest

from services.normalization_service import MentionNormalizer, Mention
from tests.mock_concept_resolver import MockConceptResolver


@pytest.fixture
def mock_resolver() -> MockConceptResolver:
    """Fixture providing a mock concept resolver."""
    return MockConceptResolver()


@pytest.fixture
def normalizer(mock_resolver: MockConceptResolver) -> MentionNormalizer:
    """Fixture providing a mention normalizer with mock resolver."""
    return MentionNormalizer(mock_resolver)


def test_exact_match_found(normalizer: MentionNormalizer) -> None:
    """Test normalization with exact match in fixtures."""
    mentions = [Mention(text="diabetes", facet="Diagnosis")]

    result = normalizer.normalize_mentions(mentions)

    assert len(result) == 1
    assert result[0].facet == "Diagnosis"
    assert len(result[0].selectedValues) == 1
    assert result[0].selectedValues[0].term == "MONDO:0005015"
    assert result[0].selectedValues[0].mention == "diabetes"


def test_synonym_match_found(normalizer: MentionNormalizer) -> None:
    """Test normalization with synonym match (e.g., 'latino' -> 'Hispanic or Latino')."""
    mentions = [Mention(text="latino", facet="Reported Ethnicity")]

    result = normalizer.normalize_mentions(mentions)

    assert len(result) == 1
    assert result[0].facet == "Reported Ethnicity"
    assert result[0].selectedValues[0].term == "Hispanic or Latino"
    assert result[0].selectedValues[0].mention == "latino"


def test_no_match_returns_unknown(normalizer: MentionNormalizer) -> None:
    """Test that unmatched mentions return 'unknown' as the term."""
    mentions = [Mention(text="foobar", facet="unknown")]

    result = normalizer.normalize_mentions(mentions)

    assert len(result) == 1
    assert result[0].facet == "unknown"
    assert result[0].selectedValues[0].term == "unknown"
    assert result[0].selectedValues[0].mention == "foobar"


def test_multiple_facets_with_multiple_mentions(normalizer: MentionNormalizer) -> None:
    """Test handling multiple facets with multiple mentions each."""
    mentions = [
        Mention(text="diabetes", facet="Diagnosis"),
        Mention(text="latino", facet="Reported Ethnicity"),
        Mention(text="bam", facet="File Format"),
        Mention(text="public", facet="Access"),
    ]

    result = normalizer.normalize_mentions(mentions)

    # Should have 4 facets
    assert len(result) == 4

    # Check each facet is present (order may vary due to dict)
    facet_dict = {fs.facet: fs for fs in result}

    assert "Diagnosis" in facet_dict
    assert facet_dict["Diagnosis"].selectedValues[0].term == "MONDO:0005015"

    assert "Reported Ethnicity" in facet_dict
    assert facet_dict["Reported Ethnicity"].selectedValues[0].term == "Hispanic or Latino"

    assert "File Format" in facet_dict
    assert facet_dict["File Format"].selectedValues[0].term == ".bam"

    assert "Access" in facet_dict
    assert facet_dict["Access"].selectedValues[0].term == "Granted"


def test_same_facet_multiple_values(normalizer: MentionNormalizer) -> None:
    """Test multiple mentions for the same facet (e.g., multiple diagnoses)."""
    mentions = [
        Mention(text="diabetes", facet="Diagnosis"),
        Mention(text="type 2 diabetes", facet="Diagnosis"),
    ]

    result = normalizer.normalize_mentions(mentions)

    assert len(result) == 1
    assert result[0].facet == "Diagnosis"
    assert len(result[0].selectedValues) == 2

    # Both should normalize to MONDO:0005015
    terms = [sv.term for sv in result[0].selectedValues]
    assert "MONDO:0005015" in terms


def test_mixed_known_and_unknown_mentions(normalizer: MentionNormalizer) -> None:
    """Test mix of known and unknown mentions."""
    mentions = [
        Mention(text="diabetes", facet="Diagnosis"),
        Mention(text="foobar", facet="Diagnosis"),  # Unknown mention
    ]

    result = normalizer.normalize_mentions(mentions)

    assert len(result) == 1
    assert result[0].facet == "Diagnosis"
    assert len(result[0].selectedValues) == 2

    # Check we have both a known and unknown term
    terms = [sv.term for sv in result[0].selectedValues]
    assert "MONDO:0005015" in terms
    assert "unknown" in terms


def test_empty_mentions_list(normalizer: MentionNormalizer) -> None:
    """Test handling of empty mentions list."""
    mentions = []

    result = normalizer.normalize_mentions(mentions)

    assert result == []


def test_case_insensitive_matching(normalizer: MentionNormalizer) -> None:
    """Test that matching is case-insensitive."""
    mentions = [
        Mention(text="DIABETES", facet="Diagnosis"),  # Uppercase
        Mention(text="Latino", facet="Reported Ethnicity"),  # Mixed case
    ]

    result = normalizer.normalize_mentions(mentions)

    facet_dict = {fs.facet: fs for fs in result}

    # Should still match despite case differences
    assert facet_dict["Diagnosis"].selectedValues[0].term == "MONDO:0005015"
    assert facet_dict["Reported Ethnicity"].selectedValues[0].term == "Hispanic or Latino"


def test_normalize_from_dict(normalizer: MentionNormalizer) -> None:
    """Test the normalize_from_dict convenience method."""
    mention_dicts = [
        {"text": "diabetes", "facet": "Diagnosis"},
        {"text": "bam", "facet": "File Format"},
    ]

    result = normalizer.normalize_from_dict(mention_dicts)

    assert len(result) == 2
    facet_dict = {fs.facet: fs for fs in result}

    assert "Diagnosis" in facet_dict
    assert "File Format" in facet_dict


def test_custom_fixtures() -> None:
    """Test that custom fixtures can be provided to mock resolver."""
    custom_fixtures = {
        ("CustomFacet", "custom_term"): {
            "id": "custom-id",
            "term": "CustomTerm",
            "name": "Custom Term Name",
            "facet_name": "CustomFacet",
            "match_type": "exact",
        }
    }

    mock_resolver = MockConceptResolver(fixtures=custom_fixtures)
    normalizer = MentionNormalizer(mock_resolver)

    mentions = [Mention(text="custom_term", facet="CustomFacet")]
    result = normalizer.normalize_mentions(mentions)

    assert len(result) == 1
    assert result[0].selectedValues[0].term == "CustomTerm"
