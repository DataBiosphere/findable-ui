"""AnVIL-specific configuration for facet name mapping.

This module contains the mapping between AnVIL API facet names and
the OpenSearch facet names used in the concept database.
"""
from typing import Dict


# Mapping from AnVIL/Pydantic AI facet names to OpenSearch facet names
# These facet names match the ones used in llm_mention_extractor.py (FacetName Literal)
ANVIL_FACET_NAME_MAPPING: Dict[str, str] = {
    # Primary facets
    "Diagnosis": "diagnoses.disease",
    "Reported Ethnicity": "donors.reported_ethnicity",
    "File Format": "files.file_format",
    "Anatomical Site": "biosamples.anatomical_site",
    "BioSample Type": "biosamples.biosample_type",
    # Dataset facets
    "Consent Group": "datasets.consent_group",
    "Data Modality": "files.data_modality",
    # Donor facets
    "Organism Type": "donors.organism_type",
    "Phenotypic Sex": "donors.phenotypic_sex",
    # Unmatched terms - no OpenSearch mapping
    "unmatched": "unmatched",
    # Legacy mappings (for backwards compatibility)
    "Phenotype": "diagnoses.phenotype",
    "Data Use Permission": "datasets.data_use_permission",
    "Activity Type": "activities.activity_type",
    "Assay Type": "activities.assay_type",
    "Reference Assembly": "files.reference_assembly",
}


def get_anvil_facet_mapping() -> Dict[str, str]:
    """Get the AnVIL facet name mapping.

    Returns:
        Dictionary mapping AnVIL API facet names to OpenSearch facet names.
    """
    return ANVIL_FACET_NAME_MAPPING.copy()
