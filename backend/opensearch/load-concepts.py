#!/usr/bin/env python3
"""Load concepts into OpenSearch from JSON files."""

import json
import argparse
from opensearchpy import OpenSearch, helpers


def load_concepts(
    file_path: str, clear: bool = False, host: str = "localhost", port: int = 9200
):
    """Load concepts from JSON file into OpenSearch."""
    # Connect to OpenSearch
    client = OpenSearch(
        hosts=[{"host": host, "port": port}],
        http_compress=True,
        use_ssl=False,
        verify_certs=False,
    )
    index_name = "concepts"

    # Clear if requested
    if clear:
        print(f"Clearing index {index_name}...")
        try:
            client.delete_by_query(
                index=index_name, body={"query": {"match_all": {}}}, conflicts="proceed"
            )
            print("✓ Index cleared")
        except Exception as e:
            print(f"Note: {e}")

    # Read concepts from file
    print(f"Reading concepts from {file_path}...")
    with open(file_path, "r") as f:
        concepts = json.load(f)

    print(f"Loading {len(concepts)} concepts...")

    # Add normalized synonyms for phrase matching
    for concept in concepts:
        if "synonyms" in concept:
            # Keep original synonyms
            original_synonyms = concept["synonyms"]

            # Add normalized field for phrase matching
            # Apply same normalization as query-time:
            # - lowercase
            # - replace hyphens and underscores with spaces
            # - collapse whitespace
            concept["synonyms_normalized"] = [
                " ".join(syn.lower().replace("-", " ").replace("_", " ").split())
                for syn in original_synonyms
            ]

    # Prepare bulk actions
    actions = [
        {"_index": index_name, "_id": concept["id"], "_source": concept}
        for concept in concepts
    ]

    # Bulk insert with error handling
    success_count = 0
    error_count = 0

    try:
        success, errors = helpers.bulk(
            client, actions, raise_on_error=False, chunk_size=500, request_timeout=60
        )
        success_count = success

        if errors:
            error_count = len(errors)
            print(f"\n⚠ {error_count} errors occurred:")
            for error in errors[:5]:  # Show first 5 errors
                print(f"  - {error}")

    except Exception as e:
        print(f"Error during bulk insert: {e}")
        return

    print(f"\n✓ Successfully inserted {success_count} concepts")
    if error_count > 0:
        print(f"⚠ {error_count} errors occurred")

    # Verify count
    client.indices.refresh(index=index_name)
    result = client.count(index=index_name)
    print(f"\n📊 Total documents in index: {result['count']}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Load concepts into OpenSearch")
    parser.add_argument("--file", required=True, help="JSON file to load")
    parser.add_argument(
        "--clear", action="store_true", help="Clear index before loading"
    )
    parser.add_argument("--host", default="localhost", help="OpenSearch host")
    parser.add_argument("--port", type=int, default=9200, help="OpenSearch port")

    args = parser.parse_args()
    load_concepts(args.file, args.clear, args.host, args.port)
