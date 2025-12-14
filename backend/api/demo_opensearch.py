#!/usr/bin/env python3
"""Demo script showing OpenSearch resolver in action.

Run this to see the complete Phase 3 workflow with real OpenSearch lookups.
"""
from services.facets_service import compute_facets_with_opensearch


def main() -> None:
    """Run the demo."""
    print("=" * 60)
    print("OpenSearch Concept Resolver Demo")
    print("=" * 60)
    print()

    query = "latino patients with diabetes and bam files"
    print(f"Query: {query}")
    print()

    print("Calling compute_facets_with_opensearch()...")
    print()

    result = compute_facets_with_opensearch(query)

    print("Results:")
    print(f"  Query: {result.query}")
    print(f"  Facets found: {len(result.facets)}")
    print()

    for facet in result.facets:
        print(f"  [{facet.facet}]")
        for value in facet.selectedValues:
            print(f"    - '{value.mention}' → '{value.term}'")
        print()

    print("=" * 60)
    print()
    print("Explanation:")
    print("  • Mentions are stubbed (Phase 2 will add LLM extraction)")
    print("  • Normalization uses REAL OpenSearch database")
    print("  • 'diabetes' → real disease concept from OpenSearch")
    print("  • 'latino' → real ethnicity concept from OpenSearch")
    print("  • 'bam' → real file format concept from OpenSearch")
    print("  • 'unknown_term_xyz' → returns 'unknown' (not in database)")
    print()


if __name__ == "__main__":
    main()
