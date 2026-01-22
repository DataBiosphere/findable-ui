"""Mock concept resolver for testing mention normalization."""

from typing import Dict, List, Optional


# Test fixture data mapping (facet_name, mention) -> concept result
CONCEPT_FIXTURES: Dict[tuple[str, str], Optional[Dict]] = {
    # Diagnosis facet
    ("Diagnosis", "diabetes"): {
        "id": "MONDO:0005015",
        "term": "MONDO:0005015",
        "name": "Diabetes Mellitus",
        "facet_name": "Diagnosis",
        "match_type": "synonym",
    },
    ("Diagnosis", "type 2 diabetes"): {
        "id": "MONDO:0005015",
        "term": "MONDO:0005015",
        "name": "Type 2 Diabetes Mellitus",
        "facet_name": "Diagnosis",
        "match_type": "exact",
    },
    # Reported Ethnicity facet
    ("Reported Ethnicity", "latino"): {
        "id": "ethnicity-hispanic-latino",
        "term": "Hispanic or Latino",
        "name": "Hispanic or Latino",
        "facet_name": "Reported Ethnicity",
        "match_type": "synonym",
    },
    ("Reported Ethnicity", "hispanic"): {
        "id": "ethnicity-hispanic-latino",
        "term": "Hispanic or Latino",
        "name": "Hispanic or Latino",
        "facet_name": "Reported Ethnicity",
        "match_type": "synonym",
    },
    # File Format facet
    ("File Format", "bam"): {
        "id": "format-bam",
        "term": ".bam",
        "name": "Binary Alignment Map",
        "facet_name": "File Format",
        "match_type": "synonym",
    },
    ("File Format", ".bam"): {
        "id": "format-bam",
        "term": ".bam",
        "name": "Binary Alignment Map",
        "facet_name": "File Format",
        "match_type": "exact",
    },
    # Access facet
    ("Access", "public"): {
        "id": "access-granted",
        "term": "Granted",
        "name": "Granted",
        "facet_name": "Access",
        "match_type": "synonym",
    },
    ("Access", "granted"): {
        "id": "access-granted",
        "term": "Granted",
        "name": "Granted",
        "facet_name": "Access",
        "match_type": "exact",
    },
}


class MockConceptResolver:
    """Mock concept resolver that returns fixture data for testing.

    This mock simulates the behavior of the real OpenSearch-based concept
    resolver but uses predefined fixture data instead of querying a database.
    """

    def __init__(self, fixtures: Optional[Dict] = None):
        """Initialize the mock resolver.

        Args:
            fixtures: Optional custom fixture data. If None, uses CONCEPT_FIXTURES.
        """
        self.fixtures = fixtures if fixtures is not None else CONCEPT_FIXTURES

    def resolve_mention(
        self, facet_name: str, mention: str, top_k: int = 5
    ) -> List[Dict]:
        """Resolve a user mention to facet concepts using fixture data.

        Args:
            facet_name: The facet to search within (e.g., "Diagnosis").
            mention: The user's query string (e.g., "diabetes").
            top_k: Number of results to return (ignored in mock, always returns 0 or 1).

        Returns:
            List of matching concepts with scores. Empty list if no match found.
        """
        # Normalize mention to lowercase for case-insensitive matching
        key = (facet_name, mention.lower())

        result = self.fixtures.get(key)

        if result is None:
            return []

        # Add a mock score
        return [{"score": 1.0, **result}]

    def resolve_mention_any_facet(self, mention: str, top_k: int = 5) -> List[Dict]:
        """Resolve a mention searching across ALL facets in fixtures.

        Used in agentic pipeline when facet is unknown.

        Args:
            mention: The user's query string.
            top_k: Number of top results to return (ignored in mock).

        Returns:
            List of matching concepts with scores from any facet.
        """
        mention_lower = mention.lower()
        results = []

        # Search through all fixtures for matches on the mention
        for (facet_name, fixture_mention), concept in self.fixtures.items():
            if fixture_mention == mention_lower and concept is not None:
                results.append({"score": 1.0, **concept})

        return results[:top_k]

    def resolve_mention_any_facet_with_expansion(
        self, mention: str, top_k: int = 10
    ) -> List[Dict]:
        """Resolve a mention with ontology hierarchy expansion.

        In the mock, this behaves the same as resolve_mention_any_facet
        since we don't have real ontology hierarchy data in fixtures.

        Args:
            mention: The user's query string.
            top_k: Number of top results to return.

        Returns:
            List of matching concepts with scores from any facet.
        """
        return self.resolve_mention_any_facet(mention, top_k)

    def get_all_descendants(
        self, facet_name: str, ontology_id: str, include_self: bool = True
    ) -> List[Dict]:
        """Get all descendants of a concept by ontology_id.

        In the mock, returns empty list since we don't have hierarchy data.

        Args:
            facet_name: The facet to search within.
            ontology_id: The ontology ID to find descendants of.
            include_self: If True, also returns the concept with this ontology_id.

        Returns:
            Empty list (no hierarchy data in mock).
        """
        return []

    def expand_to_descendants(self, facet_name: str, term: str) -> List[Dict]:
        """Expand a term to include all its descendants.

        In the mock, returns just the direct match since we don't have hierarchy.

        Args:
            facet_name: The facet to search within.
            term: The term to expand.

        Returns:
            List with just the matched term (no expansion in mock).
        """
        return self.resolve_mention(facet_name, term, top_k=1)

    def health_check(self) -> bool:
        """Check if the resolver is healthy.

        Returns:
            Always True for mock resolver.
        """
        return True
