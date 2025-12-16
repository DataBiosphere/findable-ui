#!/usr/bin/env python3
"""Demo of complete LLM + OpenSearch workflow.

This demonstrates the full Phase 2 + Phase 3 implementation:
- Phase 2: LLM-based mention extraction
- Phase 3: OpenSearch-based normalization
"""
from services.facets_service import compute_facets_with_llm_and_opensearch


def demo_with_mock_llm():
    """Demo using mock LLM (no API cost)."""
    print("=" * 70)
    print("DEMO: Complete Workflow with Mock LLM + Real OpenSearch")
    print("=" * 70)
    print()

    queries = [
        "latino patients with diabetes",
        "bam files for brain tissue",
        "female patients with type 2 diabetes from blood samples",
    ]

    for query in queries:
        print(f"Query: '{query}'")
        print()

        result = compute_facets_with_llm_and_opensearch(query, use_mock_llm=True)

        if not result.facets:
            print("  No facets extracted")
            print()
            continue

        print(f"  Extracted {len(result.facets)} facet(s):")
        for facet in result.facets:
            print(f"  [{facet.facet}]")
            for value in facet.selectedValues:
                normalized = (
                    f" → {value.term}" if value.term != "unknown" else " → (not found)"
                )
                print(f"    '{value.mention}'{normalized}")
        print()

    print("=" * 70)
    print()
    print("How it works:")
    print("  1. Mock LLM extracts mentions using pattern matching")
    print("  2. Mentions are normalized against REAL OpenSearch database")
    print("  3. Results show: mention text → normalized term from database")
    print()


def demo_with_real_llm():
    """Demo using real OpenAI LLM (requires API key, costs money)."""
    print("=" * 70)
    print("DEMO: Complete Workflow with Real LLM + Real OpenSearch")
    print("=" * 70)
    print()
    print("⚠️  This uses the real OpenAI API and will cost money!")
    print()

    query = input("Enter a natural language query (or press Enter to skip): ").strip()

    if not query:
        print("Skipped.")
        return

    print()
    print(f"Query: '{query}'")
    print()
    print("Calling OpenAI API...")

    result = compute_facets_with_llm_and_opensearch(query, use_mock_llm=False)

    if not result.facets:
        print("  No facets extracted")
        return

    print(f"  Extracted {len(result.facets)} facet(s):")
    for facet in result.facets:
        print(f"  [{facet.facet}]")
        for value in facet.selectedValues:
            normalized = (
                f" → {value.term}" if value.term != "unknown" else " → (not found)"
            )
            print(f"    '{value.mention}'{normalized}")
    print()

    print("=" * 70)


if __name__ == "__main__":
    # Always run mock demo
    demo_with_mock_llm()

    # Optionally run real LLM demo
    print()
    choice = input("Run demo with REAL LLM? (costs money) [y/N]: ").strip().lower()
    if choice == "y":
        print()
        demo_with_real_llm()
    else:
        print()
        print("Skipping real LLM demo.")
        print()
        print("To test with real LLM, ensure:")
        print("  - OPENAI_API_KEY is set in backend/opensearch/.env")
        print("  - OpenSearch is running (docker-compose up)")
        print("  - Then run: python demo_complete_workflow.py")
        print()
