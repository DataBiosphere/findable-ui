#!/usr/bin/env python3
"""Add 'Unspecified' concepts to facets with null values in the AnVIL API."""

from opensearchpy import OpenSearch
import uuid

# Facets that have null values and need Unspecified concepts
FACETS_WITH_NULL = [
    "diagnoses.phenotype",
    "biosamples.disease",
    "diagnoses.disease",
    "diagnoses.phenopacket",
    "files.data_modality",
    "donors.reported_ethnicity",
    "datasets.consent_group",
    "activities.assay_type",
    "biosamples.anatomical_site",
    "donors.organism_type",
    "datasets.data_use_permission",
    "donors.phenotypic_sex",
    "activities.data_modality",
    "activities.activity_type",
    "biosamples.biosample_type",
    "files.file_format",
    "datasets.registered_identifier",
    "files.reference_assembly",
]


def create_unspecified_concept(facet_name: str) -> dict:
    """Create an Unspecified concept document for a facet.

    Args:
        facet_name: The facet name (e.g., "diagnoses.disease")

    Returns:
        A concept document dict with Unspecified term and relevant synonyms
    """
    return {
        "id": f"{facet_name.replace('.', '-')}-unspecified",
        "facet_name": facet_name,
        "term": "Unspecified",
        "name": "Unspecified",
        "synonyms": [
            "unspecified",
            "not specified",
            "not reported",
            "unknown",
            "missing",
            "N/A",
            "na",
        ],
        "metadata": {
            "description": "Represents null or unspecified values in this facet",
            "auto_generated": True,
        },
    }


def add_unspecified_concepts(
    host: str = "localhost", port: int = 9200, dry_run: bool = False
):
    """Add Unspecified concepts to OpenSearch for all facets with null values.

    Args:
        host: OpenSearch host
        port: OpenSearch port
        dry_run: If True, print concepts without adding them
    """
    client = OpenSearch(
        hosts=[{"host": host, "port": port}],
        http_compress=True,
        use_ssl=False,
        verify_certs=False,
    )

    index_name = "concepts"

    print(f"Adding Unspecified concepts to {len(FACETS_WITH_NULL)} facets...")
    print()

    added_count = 0
    skipped_count = 0

    for facet_name in FACETS_WITH_NULL:
        concept_doc = create_unspecified_concept(facet_name)
        doc_id = concept_doc["id"]

        if dry_run:
            print(f"[DRY RUN] Would add: {facet_name} -> {doc_id}")
            print(f"  Synonyms: {', '.join(concept_doc['synonyms'])}")
            added_count += 1
            continue

        # Check if concept already exists
        try:
            existing = client.get(index=index_name, id=doc_id)
            print(f"[SKIP] {facet_name} -> {doc_id} (already exists)")
            skipped_count += 1
            continue
        except Exception:
            # Document doesn't exist, we can add it
            pass

        # Add the concept
        try:
            client.index(index=index_name, id=doc_id, body=concept_doc, refresh=True)
            print(f"[ADD] {facet_name} -> {doc_id}")
            added_count += 1
        except Exception as e:
            print(f"[ERROR] Failed to add {facet_name}: {e}")

    print()
    print(f"Summary:")
    print(f"  Added: {added_count}")
    print(f"  Skipped: {skipped_count}")
    print(f"  Total: {len(FACETS_WITH_NULL)}")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Add Unspecified concepts to OpenSearch"
    )
    parser.add_argument(
        "--host", default="localhost", help="OpenSearch host (default: localhost)"
    )
    parser.add_argument(
        "--port", type=int, default=9200, help="OpenSearch port (default: 9200)"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print concepts without adding them",
    )

    args = parser.parse_args()

    add_unspecified_concepts(host=args.host, port=args.port, dry_run=args.dry_run)
