#!/usr/bin/env python3
"""Add Unspecified concepts to concepts-with-synonyms.json."""

import json
import hashlib

# Facets that need Unspecified concepts (excluding ones that already have them)
FACETS_TO_ADD = [
    ("diagnoses.phenotype", "phenotype"),
    ("biosamples.disease", "disease"),
    ("diagnoses.disease", "disease"),
    ("diagnoses.phenopacket", "phenopacket"),
    ("files.data_modality", "data modality"),
    ("donors.reported_ethnicity", "ethnicity"),
    ("datasets.consent_group", "consent group"),
    ("activities.assay_type", "assay type"),
    ("biosamples.anatomical_site", "anatomical site"),
    ("donors.organism_type", "organism type"),
    ("datasets.data_use_permission", "data use permission"),
    # Skip donors.phenotypic_sex - it already has Unspecified
    ("activities.data_modality", "data modality"),
    ("activities.activity_type", "activity type"),
    ("biosamples.biosample_type", "biosample type"),
    ("files.file_format", "file format"),
    ("datasets.registered_identifier", "registered identifier"),
    ("files.reference_assembly", "reference assembly"),
]


def create_unspecified_concept(facet_name: str, facet_label: str) -> dict:
    """Create an Unspecified concept for a facet.

    Args:
        facet_name: The full facet name (e.g., "diagnoses.disease")
        facet_label: The human-readable label (e.g., "disease")

    Returns:
        A concept dict matching the structure in concepts-with-synonyms.json
    """
    # Generate a consistent ID
    id_str = f"{facet_name}-unspecified"
    hash_suffix = hashlib.md5(id_str.encode()).hexdigest()[:12]
    concept_id = f"{facet_name.split('.')[1]}-{hash_suffix}"

    # Create facet-specific synonyms
    synonyms = [
        "unspecified",
        f"{facet_label} unspecified",
        "not specified",
        f"{facet_label} not specified",
        "not reported",
        f"{facet_label} not reported",
        "unknown",
        f"{facet_label} unknown",
        "missing",
        "no data",
        "n/a",
        "na",
    ]

    return {
        "id": concept_id,
        "facet_name": facet_name,
        "term": "unspecified",
        "name": "unspecified",
        "display_name": "Unspecified",
        "synonyms": synonyms,
        "metadata": {"count": 0, "auto_generated": True},
    }


def main():
    """Add Unspecified concepts to the JSON file."""
    json_file = "../opensearch/concepts-with-synonyms.json"

    # Load existing concepts
    print(f"Loading {json_file}...")
    with open(json_file, "r") as f:
        concepts = json.load(f)

    print(f"Loaded {len(concepts)} existing concepts")

    # Check which facets already have Unspecified
    existing_facets = set()
    for concept in concepts:
        if concept.get("term") == "unspecified":
            existing_facets.add(concept["facet_name"])
            print(f"  Found existing Unspecified for: {concept['facet_name']}")

    # Add Unspecified concepts for facets that don't have them
    new_concepts = []
    for facet_name, facet_label in FACETS_TO_ADD:
        if facet_name in existing_facets:
            print(f"  [SKIP] {facet_name} - already has Unspecified")
            continue

        concept = create_unspecified_concept(facet_name, facet_label)
        new_concepts.append(concept)
        print(f"  [ADD] {facet_name} -> {facet_label} unspecified")

    # Add new concepts to the list
    concepts.extend(new_concepts)

    # Save back to file
    print(f"\nSaving {len(concepts)} concepts ({len(new_concepts)} new)...")
    with open(json_file, "w") as f:
        json.dump(concepts, f, indent=2)

    print(f"Done! Added {len(new_concepts)} Unspecified concepts")
    print("\nNext: Run 'make clear' from the opensearch directory to reload")


if __name__ == "__main__":
    main()
