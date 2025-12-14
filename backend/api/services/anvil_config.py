"""AnVIL-specific configuration for facet name mapping.

This module contains the mapping between AnVIL API facet names and
the OpenSearch facet names used in the concept database.
"""
from typing import Dict


# Mapping from AnVIL API facet names to OpenSearch facet names
ANVIL_FACET_NAME_MAPPING: Dict[str, str] = {
    # Primary facets
    "Diagnosis": "diagnoses.disease",
    "Phenotype": "diagnoses.phenotype",
    "Reported Ethnicity": "donors.reported_ethnicity",
    "File Format": "files.file_format",
    # Access facet - NOTE: OpenSearch "accessible" only has true/false, not "Granted"
    # This is a known limitation documented in OPENSEARCH_MAPPING.md
    "Access": "accessible",
    # Additional biological/sample facets
    "Anatomical Site": "biosamples.anatomical_site",
    "Biosample Type": "biosamples.biosample_type",
    # Dataset facets
    "Consent Group": "datasets.consent_group",
    "Data Use Permission": "datasets.data_use_permission",
    # Activity/assay facets
    "Activity Type": "activities.activity_type",
    "Assay Type": "activities.assay_type",
    # File/data facets
    "Data Modality": "files.data_modality",
    "Reference Assembly": "files.reference_assembly",
    # Donor facets
    "Organism Type": "donors.organism_type",
    "Phenotypic Sex": "donors.phenotypic_sex",
}


def get_anvil_facet_mapping() -> Dict[str, str]:
    """Get the AnVIL facet name mapping.

    Returns:
        Dictionary mapping AnVIL API facet names to OpenSearch facet names.
    """
    return ANVIL_FACET_NAME_MAPPING.copy()
