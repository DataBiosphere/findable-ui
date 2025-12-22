#!/usr/bin/env python3
"""
Map AnVIL data modality terms to ontology references.

Keeps AnVIL terms as display names, adds:
- Broad modal category (high-level categorization)
- EDAM ID (canonical reference)
"""
import json

CONCEPTS_FILE = (
    "/Users/dave/projects/findable-ui/backend/opensearch/concepts-with-synonyms.json"
)

# Mapping of AnVIL terms to ontologies
ONTOLOGY_MAPPINGS = {
    "genome": {
        "modal_category": "genomic",
        "modal_uri": "https://datamodel.terra.bio/BioCoreTerms#0000009",
        "edam_id": "data_3497",  # DNA sequence data
        "edam_uri": "http://edamontology.org/data_3497",
    },
    "whole genome": {
        "modal_category": "whole genome",
        "modal_uri": "https://datamodel.terra.bio/BioCoreTerms#0000012",
        "edam_id": "data_3498",  # Whole genome sequencing data
        "edam_uri": "http://edamontology.org/data_3498",
    },
    "methylation": {
        "modal_category": "DNA methylation",
        "modal_uri": "https://datamodel.terra.bio/BioCoreTerms#0000008",
        "edam_id": "data_3207",  # Methylation data
        "edam_uri": "http://edamontology.org/data_3207",
    },
    "single-cell rna sequencing assay": {
        "modal_category": "transcriptomic nontargeted",
        "modal_uri": "https://datamodel.terra.bio/BioCoreTerms#0000026",
        "edam_id": "data_3112",  # RNA-seq data (generic, EDAM doesn't have specific scRNA-seq yet)
        "edam_uri": "http://edamontology.org/data_3112",
        "notes": "EDAM data_3935 exists for 'Single cell RNA sequencing data' but not widely used",
    },
    "single-nucleus rna sequencing assay": {
        "modal_category": "transcriptomic nontargeted",
        "modal_uri": "https://datamodel.terra.bio/BioCoreTerms#0000026",
        "edam_id": "data_3112",  # RNA-seq data
        "edam_uri": "http://edamontology.org/data_3112",
    },
    "single-cell atac-seq": {
        "modal_category": "DNA chromatin accessibility",
        "modal_uri": "https://datamodel.terra.bio/BioCoreTerms#0000007",
        "edam_id": "data_3998",  # ATAC-seq data
        "edam_uri": "http://edamontology.org/data_3998",
    },
    "single-nucleus atac-seq": {
        "modal_category": "DNA chromatin accessibility",
        "modal_uri": "https://datamodel.terra.bio/BioCoreTerms#0000007",
        "edam_id": "data_3998",  # ATAC-seq data
        "edam_uri": "http://edamontology.org/data_3998",
    },
    "pacbio whole genome sequencing": {
        "modal_category": "whole genome",
        "modal_uri": "https://datamodel.terra.bio/BioCoreTerms#0000012",
        "edam_id": "data_3498",  # Whole genome sequencing data
        "edam_uri": "http://edamontology.org/data_3498",
        "notes": "PacBio is a platform/technology, not in standard ontologies",
    },
    "share-seq": {
        "modal_category": "transcriptomic nontargeted",
        "modal_uri": "https://datamodel.terra.bio/BioCoreTerms#0000026",
        "edam_id": "data_3112",  # RNA-seq data (SHARE-seq does both RNA and ATAC)
        "edam_uri": "http://edamontology.org/data_3112",
        "notes": "SHARE-seq is multimodal (RNA+ATAC), primary focus is transcriptomic",
    },
    "none": {
        "modal_category": None,
        "modal_uri": None,
        "edam_id": None,
        "edam_uri": None,
        "notes": "Special value for missing data",
    },
    "unspecified": {
        "modal_category": None,
        "modal_uri": None,
        "edam_id": None,
        "edam_uri": None,
        "notes": "Special value for unspecified data",
    },
}


def add_ontology_mappings():
    """Add ontology mappings to data modality concepts."""
    with open(CONCEPTS_FILE, "r") as f:
        concepts = json.load(f)

    updated_count = 0

    for concept in concepts:
        if concept.get("facet_name") != "files.data_modality":
            continue

        term = concept.get("term")
        if term in ONTOLOGY_MAPPINGS:
            mapping = ONTOLOGY_MAPPINGS[term]

            # Add ontology metadata
            if "ontology" not in concept:
                concept["ontology"] = {}

            concept["ontology"]["broad_modal"] = {
                "category": mapping["modal_category"],
                "uri": mapping["modal_uri"],
            }

            concept["ontology"]["edam"] = {
                "id": mapping["edam_id"],
                "uri": mapping["edam_uri"],
            }

            if "notes" in mapping:
                concept["ontology"]["notes"] = mapping["notes"]

            updated_count += 1
            print(f"✓ Mapped '{term}'")
            print(f"  → modal: {mapping['modal_category']}")
            print(f"  → EDAM: {mapping['edam_id']}")
            if "notes" in mapping:
                print(f"  → Note: {mapping['notes']}")
            print()

    # Write back
    with open(CONCEPTS_FILE, "w") as f:
        json.dump(concepts, f, indent=2)

    print(f"\n✓ Updated {updated_count} data modality concepts with ontology mappings")
    print(f"✓ Saved to {CONCEPTS_FILE}")


if __name__ == "__main__":
    add_ontology_mappings()
