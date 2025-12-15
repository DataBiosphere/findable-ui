#!/usr/bin/env python3
"""
Convert datasets.json facets into OpenSearch concept documents.

This script:
1. Reads datasets.json from tmp/datasets.json
2. Extracts all facets and terms
3. Creates concept documents in the format:
   {
     "id": "facet-term-hash",
     "facet_name": "diagnoses.disease",
     "term": "Type 2 Diabetes",
     "name": "Type 2 Diabetes",
     "synonyms": [],
     "metadata": {}
   }
4. Outputs to concepts-from-datasets.json
"""

import json
import hashlib
from collections import defaultdict

def create_concept_id(facet_name: str, term: str) -> str:
    """Create a unique ID for a concept."""
    # Use hash of facet + term for uniqueness
    hash_input = f"{facet_name}::{term}".encode('utf-8')
    hash_digest = hashlib.md5(hash_input).hexdigest()[:12]
    # Create readable ID
    facet_short = facet_name.split('.')[-1]  # e.g., "disease" from "diagnoses.disease"
    return f"{facet_short}-{hash_digest}"

def main():
    input_file = 'tmp/datasets.json'
    output_file = 'concepts-from-datasets.json'

    print(f"Reading {input_file}...")
    with open(input_file, 'r') as f:
        data = json.load(f)

    concepts = []
    facet_counts = defaultdict(int)

    if 'termFacets' in data:
        for facet_name, facet_data in data['termFacets'].items():
            if 'terms' in facet_data:
                for term_obj in facet_data['terms']:
                    term_value = term_obj.get('term', '')

                    # Skip None or empty terms
                    if term_value is None or term_value == '':
                        term_value = 'None'

                    # Create concept document
                    concept = {
                        "id": create_concept_id(facet_name, term_value),
                        "facet_name": facet_name,
                        "term": term_value,
                        "name": term_value,  # Use term as name (can enhance later)
                        "synonyms": [],  # Can add synonyms later
                        "metadata": {
                            "count": term_obj.get('count', 0),  # Document count from facet
                        }
                    }

                    concepts.append(concept)
                    facet_counts[facet_name] += 1

    # Write to output file
    print(f"\nWriting {len(concepts)} concepts to {output_file}...")
    with open(output_file, 'w') as f:
        json.dump(concepts, f, indent=2)

    # Print summary
    print("\n=== CONVERSION SUMMARY ===")
    print(f"Total concepts created: {len(concepts)}")
    print(f"Total facets: {len(facet_counts)}")
    print("\nConcepts per facet:")
    for facet, count in sorted(facet_counts.items(), key=lambda x: -x[1]):
        print(f"  {facet}: {count}")

    print(f"\n✓ Concepts saved to {output_file}")
    print(f"\nTo load into OpenSearch:")
    print(f"  python load-concepts.py --file {output_file}")

if __name__ == "__main__":
    main()
