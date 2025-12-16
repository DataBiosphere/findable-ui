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
