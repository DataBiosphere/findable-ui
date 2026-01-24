"""Service for normalizing mentions to canonical facet values."""

from typing import List, Dict, Optional
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

    Supports optional multi-stage normalization with LLM fallback:
    - Stage 2: OpenSearch lookup
    - Stage 3: LLM normalization (if no match found)
    - Stage 4: Re-lookup with normalized term

    Also supports ontology hierarchy expansion:
    - When enabled, matching "diabetes" also returns all diabetes subtypes
      (Type 1, Type 2, etc.) via is_a relationships from the ontology.
    """

    def __init__(
        self, concept_resolver, llm_normalizer=None, expand_hierarchy: bool = True
    ):
        """Initialize the normalizer.

        Args:
            concept_resolver: Any object with a resolve_mention(facet_name, mention, top_k) method.
                This allows for dependency injection of either a real OpenSearch resolver
                or a mock resolver for testing.
            llm_normalizer: Optional LLM-based normalizer for Stage 3.
                If provided, unmatched terms will be normalized and re-looked up.
            expand_hierarchy: If True, expand matches to include descendants via
                ontology hierarchy (is_a relationships). Default: True.
        """
        self.resolver = concept_resolver
        self.llm_normalizer = llm_normalizer
        self.expand_hierarchy = expand_hierarchy

    def _resolve_with_optional_expansion(
        self, facet_name: str, mention_text: str, top_k: int = 20
    ) -> List[Dict]:
        """Resolve mention, optionally with hierarchy expansion.

        Args:
            facet_name: The facet name to search within.
            mention_text: The mention text to resolve.
            top_k: Number of results to return.

        Returns:
            List of matching concepts.
        """
        # Use expansion if enabled and resolver supports it
        if self.expand_hierarchy and hasattr(
            self.resolver, "resolve_mention_with_expansion"
        ):
            return self.resolver.resolve_mention_with_expansion(
                facet_name=facet_name, mention=mention_text, top_k=top_k
            )
        return self.resolver.resolve_mention(
            facet_name=facet_name, mention=mention_text, top_k=top_k
        )

    def _resolve_any_facet_with_optional_expansion(
        self, mention_text: str, top_k: int = 20
    ) -> List[Dict]:
        """Resolve mention across all facets, optionally with hierarchy expansion.

        Args:
            mention_text: The mention text to resolve.
            top_k: Number of results to return.

        Returns:
            List of matching concepts.
        """
        # Use expansion if enabled and resolver supports it
        if self.expand_hierarchy and hasattr(
            self.resolver, "resolve_mention_any_facet_with_expansion"
        ):
            return self.resolver.resolve_mention_any_facet_with_expansion(
                mention=mention_text, top_k=top_k
            )
        return self.resolver.resolve_mention_any_facet(
            mention=mention_text, top_k=top_k
        )

    def normalize_mentions(self, mentions: List[Mention]) -> List[FacetSelection]:
        """Normalize a list of mentions to canonical facet values.

        Args:
            mentions: List of Mention objects with text and facet assignments.

        Returns:
            List of FacetSelection objects grouped by facet with normalized terms.
        """
        # Group mentions by facet (using database facet names)
        facet_groups: Dict[str, List[SelectedValue]] = defaultdict(list)

        for mention in mentions:
            # Resolve the mention using the concept resolver
            # Use top_k=1 to get only the best match - post-expansion will find descendants
            results = self._resolve_with_optional_expansion(
                facet_name=mention.facet, mention_text=mention.text, top_k=1
            )

            # Stage 3-4: LLM normalization fallback if no results
            if not results and self.llm_normalizer:
                normalized_text = self.llm_normalizer.normalize(mention.text)
                # Only re-lookup if normalization changed the text
                if normalized_text.lower() != mention.text.lower():
                    results = self._resolve_with_optional_expansion(
                        facet_name=mention.facet, mention_text=normalized_text, top_k=1
                    )

            # Determine the normalized terms and actual facet name
            if results:
                for result in results:
                    term = result["term"]
                    database_facet_name = result["facet_name"]
                    selected_value = SelectedValue(term=term, mention=mention.text)
                    facet_groups[database_facet_name].append(selected_value)
            else:
                # No match found - return the mention as-is with recognized=False
                # This distinguishes from database null values (which would be "Unspecified")
                term = mention.text
                database_facet_name = mention.facet
                selected_value = SelectedValue(
                    term=term, mention=mention.text, recognized=False
                )
                facet_groups[database_facet_name].append(selected_value)

        # Convert to list of FacetSelection objects
        facet_selections = [
            FacetSelection(facet=facet, selectedValues=values)
            for facet, values in facet_groups.items()
        ]

        return facet_selections

    def normalize_mentions_any_facet(
        self, text_spans: List[str]
    ) -> List[FacetSelection]:
        """Normalize text spans to facet values, searching across all facets.

        Used in multi-stage pipeline where facets are not pre-assigned.
        OpenSearch determines the facet based on best match.

        Args:
            text_spans: List of extracted text spans (no facet assignment).

        Returns:
            List of FacetSelection objects grouped by facet with normalized terms.
        """
        facet_groups: Dict[str, List[SelectedValue]] = defaultdict(list)

        for span in text_spans:
            # Stage 2: OpenSearch lookup across all facets (with optional expansion)
            results = self._resolve_any_facet_with_optional_expansion(
                mention_text=span, top_k=20
            )

            # Stage 3-4: LLM normalization fallback if no results
            if not results and self.llm_normalizer:
                normalized_text = self.llm_normalizer.normalize(span)
                # Only re-lookup if normalization changed the text
                if normalized_text.lower() != span.lower():
                    results = self._resolve_any_facet_with_optional_expansion(
                        mention_text=normalized_text, top_k=20
                    )

            if results:
                for result in results:
                    term = result["term"]
                    database_facet_name = result["facet_name"]
                    selected_value = SelectedValue(term=term, mention=span)
                    facet_groups[database_facet_name].append(selected_value)
            else:
                # No match found - return with recognized=False
                selected_value = SelectedValue(
                    term=span, mention=span, recognized=False
                )
                facet_groups["unknown"].append(selected_value)

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
        mentions = [Mention(text=m["text"], facet=m["facet"]) for m in mention_dicts]
        return self.normalize_mentions(mentions)
