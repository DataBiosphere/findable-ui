"""Test the facets service with normalizer integration."""

import pytest

from services.facets_service import compute_facets_with_normalizer
from tests.mock_concept_resolver import MockConceptResolver


@pytest.fixture
def mock_resolver() -> MockConceptResolver:
    """Fixture providing a mock concept resolver."""
    return MockConceptResolver()


def test_compute_facets_with_normalizer(mock_resolver: MockConceptResolver) -> None:
    """Test the full facets computation with normalizer."""
    query = "public bam files for latino patients with diabetes"

    result = compute_facets_with_normalizer(query, mock_resolver)

    # Check the query is preserved
    assert result.query == query

    # Check we have facets
    assert len(result.facets) > 0

    # Convert to dict for easier checking
    facet_dict = {fs.facet: fs for fs in result.facets}

    # Verify Access facet
    assert "Access" in facet_dict
    access_values = facet_dict["Access"].selectedValues
    assert len(access_values) == 1
    assert access_values[0].term == "Granted"
    assert access_values[0].mention == "public"

    # Verify File Format facet
    assert "File Format" in facet_dict
    format_values = facet_dict["File Format"].selectedValues
    assert len(format_values) == 1
    assert format_values[0].term == ".bam"
    assert format_values[0].mention == "bam"

    # Verify Reported Ethnicity facet
    assert "Reported Ethnicity" in facet_dict
    ethnicity_values = facet_dict["Reported Ethnicity"].selectedValues
    assert len(ethnicity_values) == 1
    assert ethnicity_values[0].term == "Hispanic or Latino"
    assert ethnicity_values[0].mention == "latino"

    # Verify Diagnosis facet
    assert "Diagnosis" in facet_dict
    diagnosis_values = facet_dict["Diagnosis"].selectedValues
    assert len(diagnosis_values) == 2

    # Check diabetes normalized correctly
    diabetes_value = next(v for v in diagnosis_values if v.mention == "diabetes")
    assert diabetes_value.term == "MONDO:0005015"

    # Check unknown mention
    foobaz_value = next(v for v in diagnosis_values if v.mention == "foobaz")
    assert foobaz_value.term == "unknown"

    # Verify unknown facet
    assert "unknown" in facet_dict
    unknown_values = facet_dict["unknown"].selectedValues
    assert len(unknown_values) == 1
    assert unknown_values[0].mention == "foobar"
    assert unknown_values[0].term == "unknown"


def test_normalizer_produces_same_structure_as_stub() -> None:
    """Verify normalizer output matches the stub structure (backward compatibility)."""
    from services.facets_service import compute_facets_from_query

    # Get stub response
    stub_response = compute_facets_from_query()

    # Get normalizer response with mock resolver
    mock_resolver = MockConceptResolver()
    normalizer_response = compute_facets_with_normalizer(
        "public bam files for latino foobar patients with diabetes or foobaz",
        mock_resolver,
    )

    # Both should have the same structure
    assert isinstance(stub_response.query, str)
    assert isinstance(normalizer_response.query, str)

    # Both should have facets
    assert len(stub_response.facets) > 0
    assert len(normalizer_response.facets) > 0

    # Facet structure should match
    for facet_selection in normalizer_response.facets:
        assert hasattr(facet_selection, "facet")
        assert hasattr(facet_selection, "selectedValues")
        assert all(
            hasattr(sv, "term") and hasattr(sv, "mention")
            for sv in facet_selection.selectedValues
        )
