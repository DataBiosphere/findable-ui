"""
Unit tests for ETL transformer functions.

Tests the data transformation logic for converting AnVIL API responses
into OpenSearch documents.
"""

from unittest.mock import patch

import pytest

# Import from the etl module (needs PYTHONPATH to include parent)
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from etl.load_anvil_data import (
    get_first_or_none,
    transform_activity,
    transform_biosample,
    transform_dataset,
    transform_donor,
    transform_file,
)


class TestGetFirstOrNone:
    """Tests for the get_first_or_none helper function."""

    def test_returns_none_for_none_input(self) -> None:
        """Test that None input returns None."""
        assert get_first_or_none(None) is None

    def test_returns_none_for_empty_list(self) -> None:
        """Test that empty list returns None."""
        assert get_first_or_none([]) is None

    def test_returns_first_element_from_list(self) -> None:
        """Test that first element is returned from list."""
        assert get_first_or_none(["first", "second", "third"]) == "first"

    def test_returns_first_element_single_item_list(self) -> None:
        """Test single-item list."""
        assert get_first_or_none(["only"]) == "only"

    def test_extracts_key_from_first_dict(self) -> None:
        """Test extracting a key from first dict in list."""
        data = [{"id": "123", "name": "test"}, {"id": "456", "name": "other"}]
        assert get_first_or_none(data, "id") == "123"
        assert get_first_or_none(data, "name") == "test"

    def test_returns_none_for_missing_key(self) -> None:
        """Test that missing key returns None."""
        data = [{"id": "123"}]
        assert get_first_or_none(data, "nonexistent") is None

    def test_handles_boolean_value_directly(self) -> None:
        """Test that boolean values are returned directly (not treated as list)."""
        assert get_first_or_none(True) is True
        assert get_first_or_none(False) is False

    def test_handles_string_value_directly(self) -> None:
        """Test that string values are returned directly."""
        assert get_first_or_none("test_string") == "test_string"

    def test_handles_integer_value_directly(self) -> None:
        """Test that integer values are returned directly."""
        assert get_first_or_none(42) == 42
        assert get_first_or_none(0) == 0

    def test_handles_dict_value_directly(self) -> None:
        """Test that dict values are returned directly (not treated as list)."""
        data = {"key": "value"}
        assert get_first_or_none(data) == {"key": "value"}

    def test_list_of_strings(self) -> None:
        """Test list of strings returns first string."""
        assert get_first_or_none([".bam", ".cram", ".vcf"]) == ".bam"

    def test_list_of_booleans(self) -> None:
        """Test list of booleans returns first boolean."""
        assert get_first_or_none([True, False]) is True
        assert get_first_or_none([False, True]) is False


class TestTransformDataset:
    """Tests for the transform_dataset function."""

    def test_transforms_valid_dataset(self) -> None:
        """Test transformation of a valid dataset hit."""
        hit = {
            "entryId": "entry-123",
            "datasets": [
                {
                    "dataset_id": "ds-001",
                    "title": "Test Dataset",
                    "description": "A test dataset",
                    "consent_group": ["GRU"],
                    "data_use_permission": ["DUO:0000042"],
                    "principal_investigator": ["Dr. Smith"],
                    "registered_identifier": ["phs000123"],
                    "duos_id": "DUOS-123",
                    "accessible": True,
                }
            ],
        }

        result = transform_dataset(hit)

        assert result is not None
        assert result["dataset_id"] == "ds-001"
        assert result["title"] == "Test Dataset"
        assert result["description"] == "A test dataset"
        assert result["consent_group"] == "GRU"
        assert result["data_use_permission"] == "DUO:0000042"
        assert result["principal_investigator"] == "Dr. Smith"
        assert result["registered_identifier"] == "phs000123"
        assert result["duos_id"] == "DUOS-123"
        assert result["accessible"] is True

    def test_returns_none_for_empty_datasets(self) -> None:
        """Test that empty datasets list returns None."""
        hit = {"entryId": "entry-123", "datasets": []}
        assert transform_dataset(hit) is None

    def test_returns_none_for_missing_datasets(self) -> None:
        """Test that missing datasets key returns None."""
        hit = {"entryId": "entry-123"}
        assert transform_dataset(hit) is None

    def test_uses_entry_id_as_fallback(self) -> None:
        """Test that entryId is used when dataset_id is missing."""
        hit = {
            "entryId": "entry-123",
            "datasets": [{"title": "No ID Dataset"}],
        }

        result = transform_dataset(hit)

        assert result["dataset_id"] == "entry-123"

    def test_handles_missing_optional_fields(self) -> None:
        """Test handling of missing optional fields."""
        hit = {
            "datasets": [
                {
                    "dataset_id": "ds-001",
                }
            ],
        }

        result = transform_dataset(hit)

        assert result["dataset_id"] == "ds-001"
        assert result["title"] == ""
        assert result["description"] == ""
        assert result["consent_group"] is None
        assert result["accessible"] is False

    def test_includes_timestamps(self) -> None:
        """Test that timestamps are included."""
        hit = {"datasets": [{"dataset_id": "ds-001"}]}

        result = transform_dataset(hit)

        assert "created_at" in result
        assert "updated_at" in result


class TestTransformDonor:
    """Tests for the transform_donor function."""

    def test_transforms_valid_donor(self) -> None:
        """Test transformation of a valid donor hit."""
        hit = {
            "entryId": "entry-456",
            "donors": [
                {
                    "donor_id": "donor-001",
                    "organism_type": "Human",
                    "phenotypic_sex": "Female",
                    "reported_ethnicity": ["Hispanic or Latino"],
                    "genetic_ancestry": ["European"],
                    "accessible": True,
                }
            ],
            "datasets": [{"dataset_id": "ds-001"}],
        }

        result = transform_donor(hit)

        assert result is not None
        assert result["donor_id"] == "donor-001"
        assert result["dataset_id"] == "ds-001"
        assert result["organism_type"] == "Human"
        assert result["phenotypic_sex"] == "Female"
        assert result["reported_ethnicity"] == "Hispanic or Latino"
        assert result["genetic_ancestry"] == "European"
        assert result["accessible"] is True

    def test_returns_none_for_empty_donors(self) -> None:
        """Test that empty donors list returns None."""
        hit = {"entryId": "entry-456", "donors": []}
        assert transform_donor(hit) is None

    def test_returns_none_for_missing_donors(self) -> None:
        """Test that missing donors key returns None."""
        hit = {"entryId": "entry-456"}
        assert transform_donor(hit) is None

    def test_uses_entry_id_as_fallback(self) -> None:
        """Test that entryId is used when donor_id is missing."""
        hit = {
            "entryId": "entry-456",
            "donors": [{"organism_type": "Human"}],
        }

        result = transform_donor(hit)

        assert result["donor_id"] == "entry-456"

    def test_handles_missing_dataset(self) -> None:
        """Test handling when dataset is missing."""
        hit = {
            "donors": [{"donor_id": "donor-001"}],
        }

        result = transform_donor(hit)

        assert result["donor_id"] == "donor-001"
        assert result["dataset_id"] is None

    def test_handles_multiple_datasets_takes_first(self) -> None:
        """Test that first dataset is used when multiple exist."""
        hit = {
            "donors": [{"donor_id": "donor-001"}],
            "datasets": [
                {"dataset_id": "ds-first"},
                {"dataset_id": "ds-second"},
            ],
        }

        result = transform_donor(hit)

        assert result["dataset_id"] == "ds-first"


class TestTransformBiosample:
    """Tests for the transform_biosample function."""

    def test_transforms_valid_biosample(self) -> None:
        """Test transformation of a valid biosample hit."""
        hit = {
            "entryId": "entry-789",
            "biosamples": [
                {
                    "biosample_id": "bs-001",
                    "anatomical_site": "Blood",
                    "biosample_type": "Normal",
                    "disease": "Diabetes",
                    "donor_age_at_collection": {"gte": 40, "lte": 50},
                    "donor_age_at_collection_unit": "years",
                    "accessible": True,
                }
            ],
            "donors": [{"donor_id": "donor-001"}],
            "datasets": [{"dataset_id": "ds-001"}],
        }

        result = transform_biosample(hit)

        assert result is not None
        assert result["biosample_id"] == "bs-001"
        assert result["donor_id"] == "donor-001"
        assert result["dataset_id"] == "ds-001"
        assert result["anatomical_site"] == "Blood"
        assert result["biosample_type"] == "Normal"
        assert result["disease"] == "Diabetes"
        assert result["donor_age_at_collection_lower_bound"] == 40
        assert result["donor_age_at_collection_upper_bound"] == 50
        assert result["donor_age_at_collection_unit"] == "years"

    def test_returns_none_for_empty_biosamples(self) -> None:
        """Test that empty biosamples list returns None."""
        hit = {"entryId": "entry-789", "biosamples": []}
        assert transform_biosample(hit) is None

    def test_handles_missing_age_range(self) -> None:
        """Test handling when age range is missing."""
        hit = {
            "biosamples": [{"biosample_id": "bs-001"}],
        }

        result = transform_biosample(hit)

        assert result["donor_age_at_collection_lower_bound"] is None
        assert result["donor_age_at_collection_upper_bound"] is None

    def test_handles_null_age_range(self) -> None:
        """Test handling when age range is null."""
        hit = {
            "biosamples": [
                {
                    "biosample_id": "bs-001",
                    "donor_age_at_collection": None,
                }
            ],
        }

        result = transform_biosample(hit)

        assert result["donor_age_at_collection_lower_bound"] is None
        assert result["donor_age_at_collection_upper_bound"] is None


class TestTransformFile:
    """Tests for the transform_file function."""

    def test_transforms_single_file(self) -> None:
        """Test transformation of a hit with one file."""
        hit = {
            "entryId": "entry-abc",
            "files": [
                {
                    "file_format": [".bam"],
                    "file_size": 1000000,
                    "count": 1,
                    "data_modality": ["WGS"],
                    "reference_assembly": ["GRCh38"],
                    "is_supplementary": False,
                }
            ],
            "donors": [{"donor_id": "donor-001"}],
            "datasets": [{"dataset_id": "ds-001"}],
            "biosamples": [{"biosample_id": "bs-001"}],
        }

        result = transform_file(hit)

        assert len(result) == 1
        assert result[0]["file_id"] == "entry-abc_.bam"
        assert result[0]["file_format"] == ".bam"
        assert result[0]["file_size"] == 1000000
        assert result[0]["file_count"] == 1
        assert result[0]["data_modality"] == "WGS"
        assert result[0]["reference_assembly"] == "GRCh38"
        assert result[0]["is_supplementary"] is False
        assert result[0]["donor_id"] == "donor-001"
        assert result[0]["dataset_id"] == "ds-001"
        assert result[0]["biosample_id"] == "bs-001"

    def test_transforms_multiple_files(self) -> None:
        """Test transformation of a hit with multiple files."""
        hit = {
            "entryId": "entry-abc",
            "files": [
                {"file_format": [".bam"], "file_size": 1000000},
                {"file_format": [".cram"], "file_size": 500000},
                {"file_format": [".vcf.gz"], "file_size": 100000},
            ],
            "datasets": [{"dataset_id": "ds-001"}],
        }

        result = transform_file(hit)

        assert len(result) == 3
        assert result[0]["file_format"] == ".bam"
        assert result[1]["file_format"] == ".cram"
        assert result[2]["file_format"] == ".vcf.gz"

    def test_returns_empty_list_for_no_files(self) -> None:
        """Test that empty files list returns empty list."""
        hit = {"entryId": "entry-abc", "files": []}
        assert transform_file(hit) == []

    def test_returns_empty_list_for_missing_files(self) -> None:
        """Test that missing files key returns empty list."""
        hit = {"entryId": "entry-abc"}
        assert transform_file(hit) == []

    def test_handles_boolean_is_supplementary(self) -> None:
        """Test that boolean is_supplementary is handled correctly."""
        hit = {
            "entryId": "entry-abc",
            "files": [
                {"file_format": [".bam"], "is_supplementary": True},
                {"file_format": [".cram"], "is_supplementary": False},
            ],
        }

        result = transform_file(hit)

        assert result[0]["is_supplementary"] is True
        assert result[1]["is_supplementary"] is False

    def test_handles_list_is_supplementary(self) -> None:
        """Test that list is_supplementary extracts first value."""
        hit = {
            "entryId": "entry-abc",
            "files": [
                {"file_format": [".bam"], "is_supplementary": [True]},
            ],
        }

        result = transform_file(hit)

        assert result[0]["is_supplementary"] is True

    def test_generates_composite_file_id(self) -> None:
        """Test that file_id is generated from entryId and format."""
        hit = {
            "entryId": "abc-123-def",
            "files": [{"file_format": [".bam"]}],
        }

        result = transform_file(hit)

        assert result[0]["file_id"] == "abc-123-def_.bam"

    def test_handles_unknown_format(self) -> None:
        """Test handling when file_format is missing."""
        hit = {
            "entryId": "entry-abc",
            "files": [{"file_size": 1000}],
        }

        result = transform_file(hit)

        assert result[0]["file_format"] == "unknown"
        assert result[0]["file_id"] == "entry-abc_unknown"

    def test_default_file_count(self) -> None:
        """Test that file_count defaults to 1."""
        hit = {
            "entryId": "entry-abc",
            "files": [{"file_format": [".bam"]}],
        }

        result = transform_file(hit)

        assert result[0]["file_count"] == 1

    def test_accessible_always_true(self) -> None:
        """Test that accessible is always True for files."""
        hit = {
            "entryId": "entry-abc",
            "files": [{"file_format": [".bam"]}],
        }

        result = transform_file(hit)

        assert result[0]["accessible"] is True


class TestTransformActivity:
    """Tests for the transform_activity function."""

    def test_transforms_single_activity(self) -> None:
        """Test transformation of a hit with one activity."""
        hit = {
            "entryId": "entry-xyz",
            "activities": [
                {
                    "activity_type": ["Sequencing"],
                    "assay_type": ["WGS"],
                    "data_modality": ["Genomic"],
                }
            ],
            "datasets": [{"dataset_id": "ds-001"}],
        }

        result = transform_activity(hit)

        assert len(result) == 1
        assert result[0]["activity_id"] == "entry-xyz_0"
        assert result[0]["activity_type"] == "Sequencing"
        assert result[0]["assay_type"] == "WGS"
        assert result[0]["data_modality"] == "Genomic"
        assert result[0]["dataset_id"] == "ds-001"
        assert result[0]["reference_assembly"] is None

    def test_transforms_multiple_activities(self) -> None:
        """Test transformation of a hit with multiple activities."""
        hit = {
            "entryId": "entry-xyz",
            "activities": [
                {"activity_type": ["Sequencing"]},
                {"activity_type": ["Analysis"]},
                {"activity_type": ["QC"]},
            ],
            "datasets": [{"dataset_id": "ds-001"}],
        }

        result = transform_activity(hit)

        assert len(result) == 3
        assert result[0]["activity_id"] == "entry-xyz_0"
        assert result[1]["activity_id"] == "entry-xyz_1"
        assert result[2]["activity_id"] == "entry-xyz_2"

    def test_returns_empty_list_for_no_activities(self) -> None:
        """Test that empty activities list returns empty list."""
        hit = {"entryId": "entry-xyz", "activities": []}
        assert transform_activity(hit) == []

    def test_returns_empty_list_for_missing_activities(self) -> None:
        """Test that missing activities key returns empty list."""
        hit = {"entryId": "entry-xyz"}
        assert transform_activity(hit) == []

    def test_activity_id_includes_index(self) -> None:
        """Test that activity_id includes the index for uniqueness."""
        hit = {
            "entryId": "test-entry",
            "activities": [
                {"activity_type": ["A"]},
                {"activity_type": ["B"]},
            ],
        }

        result = transform_activity(hit)

        assert result[0]["activity_id"] == "test-entry_0"
        assert result[1]["activity_id"] == "test-entry_1"

    def test_accessible_always_true(self) -> None:
        """Test that accessible is always True for activities."""
        hit = {
            "entryId": "entry-xyz",
            "activities": [{"activity_type": ["Test"]}],
        }

        result = transform_activity(hit)

        assert result[0]["accessible"] is True

    def test_includes_timestamps(self) -> None:
        """Test that timestamps are included."""
        hit = {
            "entryId": "entry-xyz",
            "activities": [{"activity_type": ["Test"]}],
        }

        result = transform_activity(hit)

        assert "created_at" in result[0]
        assert "updated_at" in result[0]


class TestTransformersWithRealData:
    """Tests using realistic AnVIL API response structures."""

    def test_dataset_real_structure(self) -> None:
        """Test with realistic dataset API response."""
        hit = {
            "entryId": "98d0da06-2f25-4b02-8b40-d4d3fbaf6baf",
            "datasets": [
                {
                    "dataset_id": "38442466-8bcf-17ed-393e-058a0ed8d25d",
                    "title": "ANVIL_1000G_PRIMED_data_model",
                    "description": "1000 Genomes Project data",
                    "consent_group": ["GRU", "HMB"],
                    "data_use_permission": ["DUO:0000042"],
                    "principal_investigator": ["Dr. Jane Smith", "Dr. John Doe"],
                    "registered_identifier": ["phs000123.v1.p1"],
                    "duos_id": None,
                    "accessible": True,
                }
            ],
        }

        result = transform_dataset(hit)

        assert result["dataset_id"] == "38442466-8bcf-17ed-393e-058a0ed8d25d"
        assert result["title"] == "ANVIL_1000G_PRIMED_data_model"
        # Should take first value from lists
        assert result["consent_group"] == "GRU"
        assert result["principal_investigator"] == "Dr. Jane Smith"

    def test_donor_real_structure(self) -> None:
        """Test with realistic donor API response."""
        hit = {
            "entryId": "b3f5967d-964c-408b-a5f6-67ef279fb8b5",
            "datasets": [
                {
                    "title": "ANVIL_T2T",
                    "dataset_id": "1c39e90e-463c-9853-793e-7e4c8f081815",
                }
            ],
            "donors": [
                {
                    "donor_id": "0008dbc5-d9ac-f555-5bcd-be02a14fc665",
                    "organism_type": "Human",
                    "phenotypic_sex": "Female",
                    "reported_ethnicity": ["Not Hispanic or Latino"],
                    "genetic_ancestry": ["European", "African"],
                    "accessible": True,
                }
            ],
        }

        result = transform_donor(hit)

        assert result["donor_id"] == "0008dbc5-d9ac-f555-5bcd-be02a14fc665"
        assert result["dataset_id"] == "1c39e90e-463c-9853-793e-7e4c8f081815"
        assert result["phenotypic_sex"] == "Female"
        assert result["reported_ethnicity"] == "Not Hispanic or Latino"
        assert result["genetic_ancestry"] == "European"  # First value

    def test_file_real_structure(self) -> None:
        """Test with realistic file API response."""
        hit = {
            "entryId": "abc123-def456",
            "datasets": [{"dataset_id": "ds-001", "title": "Test Dataset"}],
            "donors": [{"donor_id": "donor-001"}],
            "biosamples": [{"biosample_id": "bs-001"}],
            "files": [
                {
                    "file_format": [".fastq.gz"],
                    "file_size": 5000000000,
                    "count": 2,
                    "data_modality": ["Whole Genome Sequencing"],
                    "reference_assembly": [],
                    "is_supplementary": False,
                },
                {
                    "file_format": [".cram"],
                    "file_size": 15000000000,
                    "count": 1,
                    "data_modality": ["Whole Genome Sequencing"],
                    "reference_assembly": ["GRCh38"],
                    "is_supplementary": False,
                },
            ],
        }

        result = transform_file(hit)

        assert len(result) == 2

        # First file
        assert result[0]["file_format"] == ".fastq.gz"
        assert result[0]["file_size"] == 5000000000
        assert result[0]["file_count"] == 2
        assert result[0]["reference_assembly"] is None  # Empty list

        # Second file
        assert result[1]["file_format"] == ".cram"
        assert result[1]["reference_assembly"] == "GRCh38"
