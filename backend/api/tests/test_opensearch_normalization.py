"""Unit tests for OpenSearch mention normalization.

Tests the _normalize_mention() method in OpenSearchConceptResolver.
"""

import pytest

from services.opensearch_concept_resolver import OpenSearchConceptResolver


@pytest.fixture
def resolver() -> OpenSearchConceptResolver:
    """Fixture providing an OpenSearch resolver."""
    return OpenSearchConceptResolver()


def test_normalize_lowercase(resolver: OpenSearchConceptResolver) -> None:
    """Test that normalization converts to lowercase."""
    assert resolver._normalize_mention("DIABETES") == "diabetes"
    assert resolver._normalize_mention("Latino") == "latino"
    assert resolver._normalize_mention("RNA-Seq") == "rna seq"


def test_normalize_trim_whitespace(resolver: OpenSearchConceptResolver) -> None:
    """Test that normalization trims leading/trailing whitespace."""
    assert resolver._normalize_mention("  diabetes  ") == "diabetes"
    assert resolver._normalize_mention("\tlatino\n") == "latino"
    assert resolver._normalize_mention(" rna seq ") == "rna seq"


def test_normalize_collapse_multiple_spaces(
    resolver: OpenSearchConceptResolver,
) -> None:
    """Test that multiple spaces are collapsed to single space."""
    assert resolver._normalize_mention("single  cell") == "single cell"
    assert resolver._normalize_mention("rna   seq") == "rna seq"
    assert resolver._normalize_mention("type  2   diabetes") == "type 2 diabetes"


def test_normalize_hyphen_to_space(resolver: OpenSearchConceptResolver) -> None:
    """Test that hyphens are converted to spaces."""
    assert resolver._normalize_mention("single-cell") == "single cell"
    assert resolver._normalize_mention("rna-seq") == "rna seq"
    assert resolver._normalize_mention("non-alcoholic") == "non alcoholic"
    assert resolver._normalize_mention("coffin-siris") == "coffin siris"


def test_normalize_underscore_to_space(resolver: OpenSearchConceptResolver) -> None:
    """Test that underscores are converted to spaces."""
    assert resolver._normalize_mention("rna_seq") == "rna seq"
    assert resolver._normalize_mention("single_cell") == "single cell"
    assert resolver._normalize_mention("whole_genome") == "whole genome"


def test_normalize_combined_hyphen_underscore(
    resolver: OpenSearchConceptResolver,
) -> None:
    """Test normalization with both hyphens and underscores."""
    assert resolver._normalize_mention("single-cell_rna-seq") == "single cell rna seq"
    assert resolver._normalize_mention("single_cell-rna_seq") == "single cell rna seq"


def test_normalize_hyphen_underscore_equivalence(
    resolver: OpenSearchConceptResolver,
) -> None:
    """Test that hyphen and underscore variants normalize to the same result."""
    # All three should normalize to the same thing
    hyphen_result = resolver._normalize_mention("single-cell-rna-seq")
    underscore_result = resolver._normalize_mention("single_cell_rna_seq")
    space_result = resolver._normalize_mention("single cell rna seq")

    assert hyphen_result == underscore_result == space_result == "single cell rna seq"


def test_normalize_complex_combination(resolver: OpenSearchConceptResolver) -> None:
    """Test normalization with combination of all transformations."""
    # Uppercase + hyphens + underscores + multiple spaces + trim
    input_str = "  Single-Cell_RNA-Seq  Data  "
    expected = "single cell rna seq data"

    assert resolver._normalize_mention(input_str) == expected


def test_normalize_empty_string(resolver: OpenSearchConceptResolver) -> None:
    """Test normalization of empty string."""
    assert resolver._normalize_mention("") == ""
    assert resolver._normalize_mention("   ") == ""


def test_normalize_single_word(resolver: OpenSearchConceptResolver) -> None:
    """Test normalization of single word (no spaces)."""
    assert resolver._normalize_mention("diabetes") == "diabetes"
    assert resolver._normalize_mention("DIABETES") == "diabetes"
    assert resolver._normalize_mention("  diabetes  ") == "diabetes"


def test_normalize_preserves_alphanumeric(resolver: OpenSearchConceptResolver) -> None:
    """Test that alphanumeric characters are preserved."""
    assert resolver._normalize_mention("type-2-diabetes") == "type 2 diabetes"
    assert resolver._normalize_mention("vcf.gz") == "vcf.gz"
    assert resolver._normalize_mention("coffin-siris-2") == "coffin siris 2"


def test_normalize_real_world_examples(resolver: OpenSearchConceptResolver) -> None:
    """Test normalization with real-world query examples."""
    # Data modality variants
    assert resolver._normalize_mention("scRNA-seq") == "scrna seq"
    assert resolver._normalize_mention("scRNA_seq") == "scrna seq"
    assert resolver._normalize_mention("sc-RNA-seq") == "sc rna seq"

    # Disease names
    assert (
        resolver._normalize_mention("Alzheimer's") == "alzheimer's"
    )  # Preserves apostrophe
    assert (
        resolver._normalize_mention("coffin-siris syndrome") == "coffin siris syndrome"
    )

    # File formats
    assert resolver._normalize_mention("vcf.gz") == "vcf.gz"  # Preserves period
    assert resolver._normalize_mention("BAM") == "bam"
