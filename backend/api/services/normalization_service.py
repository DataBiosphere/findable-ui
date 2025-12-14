"""Service for normalizing mentions to canonical facet values."""
from typing import List, Dict
from collections import defaultdict

from services.models import FacetSelection, SelectedValue


class Mention:
    """Represents a mention extracted from a query with its tentative facet assignment.

    Attributes:
        text: The original mention text from the query.
        facet: The tentative facet assignment.
    """

    def __init__(self, text: str, facet: str):
        """Initialize a mention.

        Args:
            text: The original mention text.
            facet: The tentative facet assignment.
        """
        self.text = text
        self.facet = facet


class MentionNormalizer:
    """Normalizes user mentions to canonical facet values using a concept resolver.

    This service takes mentions (extracted from user queries) and normalizes them
    by looking them up in a concept database. It handles unknown terms by marking
    them as "unknown".
    """

    def __init__(self, concept_resolver):
        """Initialize the normalizer.

        Args:
            concept_resolver: Any object with a resolve_mention(facet_name, mention, top_k) method.
                This allows for dependency injection of either a real OpenSearch resolver
                or a mock resolver for testing.
        """
        self.resolver = concept_resolver

    def normalize_mentions(self, mentions: List[Mention]) -> List[FacetSelection]:
        """Normalize a list of mentions to canonical facet values.

        Args:
            mentions: List of Mention objects with text and facet assignments.

        Returns:
            List of FacetSelection objects grouped by facet with normalized terms.
        """
        # Group mentions by facet
        facet_groups: Dict[str, List[SelectedValue]] = defaultdict(list)

        for mention in mentions:
            # Resolve the mention using the concept resolver
            results = self.resolver.resolve_mention(
                facet_name=mention.facet, mention=mention.text, top_k=1
            )

            # Determine the normalized term
            if results:
                # Use the top match
                term = results[0]["term"]
            else:
                # No match found - mark as unknown
                term = "unknown"

            # Create a SelectedValue
            selected_value = SelectedValue(term=term, mention=mention.text)
            facet_groups[mention.facet].append(selected_value)

        # Convert to list of FacetSelection objects
        facet_selections = [
            FacetSelection(facet=facet, selectedValues=values)
            for facet, values in facet_groups.items()
        ]

        return facet_selections

    def normalize_from_dict(self, mention_dicts: List[Dict]) -> List[FacetSelection]:
        """Normalize mentions from dictionary format.

        Args:
            mention_dicts: List of dicts with 'text' and 'facet' keys.

        Returns:
            List of FacetSelection objects.
        """
        mentions = [
            Mention(text=m["text"], facet=m["facet"]) for m in mention_dicts
        ]
        return self.normalize_mentions(mentions)
