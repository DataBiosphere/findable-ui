"""OpenSearch-based concept resolver for normalizing mentions to canonical terms."""

from typing import Dict, List, Optional
from opensearchpy import OpenSearch


class OpenSearchConceptResolver:
    """Resolves user mentions to canonical facet terms using OpenSearch.

    This resolver queries the OpenSearch concept database to find matching
    concepts based on fuzzy matching, synonym expansion, and exact matches.

    The resolver is schema-agnostic - it searches the OpenSearch index directly
    using the facet names provided. Optional facet name mapping can be provided
    for applications that need to translate between different naming conventions.
    """

    def __init__(
        self,
        host: str = "localhost",
        port: int = 9200,
        use_ssl: bool = False,
        verify_certs: bool = False,
        facet_name_mapping: Optional[Dict[str, str]] = None,
        min_score: float = 50.0,
        exact_min_score: float = 50.0,
        fuzzy_min_score: float = 15.0,
    ):
        """Initialize the OpenSearch concept resolver.

        Args:
            host: OpenSearch host (default: localhost).
            port: OpenSearch port (default: 9200).
            use_ssl: Whether to use SSL (default: False).
            verify_certs: Whether to verify SSL certificates (default: False).
            facet_name_mapping: Optional mapping from application facet names to
                OpenSearch facet names. If None, facet names are used as-is.
                Example: {"Diagnosis": "diagnoses.disease"}
            min_score: Deprecated. Use exact_min_score and fuzzy_min_score instead.
                Kept for backward compatibility.
            exact_min_score: Minimum score for exact matches (default: 50.0).
                Exact matches use term.exact matching with boost=10.0.
            fuzzy_min_score: Minimum score for fuzzy matches (default: 15.0).
                Only used if no exact matches found (two-pass query).
        """
        self.client = OpenSearch(
            hosts=[{"host": host, "port": port}],
            http_compress=True,
            use_ssl=use_ssl,
            verify_certs=verify_certs,
            pool_maxsize=20,  # Allow up to 20 concurrent connections
            timeout=30,  # 30 second timeout for requests
            max_retries=3,  # Retry failed requests up to 3 times
            retry_on_timeout=True,  # Retry on timeout
        )
        self.index_name = "concepts"
        self.facet_name_mapping = facet_name_mapping or {}
        # Support both old and new parameter styles
        self.exact_min_score = exact_min_score if exact_min_score != 50.0 else min_score
        self.fuzzy_min_score = fuzzy_min_score

    def _normalize_mention(self, mention: str) -> str:
        """Normalize mention for consistent matching.

        Handles:
        - Lowercasing
        - Hyphen/space/underscore equivalence (single-cell ↔ single_cell ↔ single cell)
        - Whitespace normalization (trim and collapse)

        Args:
            mention: Raw mention text

        Returns:
            Normalized mention string
        """
        normalized = mention.lower().strip()

        # Replace hyphens and underscores with spaces for phrase equivalence
        # "single-cell" → "single cell"
        # "rna_seq" → "rna seq"
        # "single_cell_rna-seq" → "single cell rna seq"
        normalized = normalized.replace("-", " ")
        normalized = normalized.replace("_", " ")

        # Collapse multiple spaces to single space
        normalized = " ".join(normalized.split())

        return normalized

    def resolve_mention(
        self, facet_name: str, mention: str, top_k: int = 5
    ) -> List[Dict]:
        """Resolve a user mention to facet concepts using two-pass matching.

        Pass 1: Exact matches only (keyword matching with high threshold)
        Pass 2: Fuzzy matches if no exact results (typo tolerance with lower threshold)

        Args:
            facet_name: The facet name (will be mapped if mapping provided).
            mention: The user's query string (e.g., "diabetes", "latino").
            top_k: Number of top results to return (default: 5).

        Returns:
            List of matching concepts with scores, sorted by relevance.
            Each concept dict contains: score, id, term, name, facet_name, metadata.
            Returns empty list if no matches found.
        """
        # Map facet name if mapping provided
        opensearch_facet = self.facet_name_mapping.get(facet_name, facet_name)

        # Normalize the mention for consistent matching
        mention_normalized = self._normalize_mention(mention)

        try:
            # Pass 1: Try exact matches only
            exact_query = self._build_search_query(
                opensearch_facet, mention_normalized, top_k, exact_only=True
            )
            exact_response = self.client.search(index=self.index_name, body=exact_query)
            exact_results = self._parse_results(
                exact_response, min_score=self.exact_min_score
            )

            # If we found exact matches, filter and return them
            if exact_results:
                # Apply score gap filter to remove weaker substring matches
                # Use 60% threshold to keep valid synonyms (e.g., HP codes, related terms)
                # while still filtering very weak substring matches
                exact_results = self._apply_score_gap_filter(
                    exact_results, max_score_gap_percent=60.0
                )
                return self._filter_negation_values(exact_results, mention)

            # Pass 2: Fall back to fuzzy matching if no exact matches
            fuzzy_query = self._build_search_query(
                opensearch_facet, mention_normalized, top_k, exact_only=False
            )
            fuzzy_response = self.client.search(index=self.index_name, body=fuzzy_query)
            fuzzy_results = self._parse_results(
                fuzzy_response, min_score=self.fuzzy_min_score
            )

            # Apply score gap filter to reduce false positives from fuzzy matching
            # Use large gap (60%) for fuzzy matching to allow related terms
            # (e.g., "diabtes" → all diabetes subtypes, "epilepsy" → Epilepsy + HP code)
            # Higher than exact (20%) because fuzzy matches include related terms with varied scores
            fuzzy_results = self._apply_score_gap_filter(
                fuzzy_results, max_score_gap_percent=60.0
            )

            # Filter negation values from fuzzy results
            return self._filter_negation_values(fuzzy_results, mention)

        except Exception as e:
            # Log error and return empty results
            # In production, you might want to use proper logging
            print(f"Error querying OpenSearch: {e}")
            return []

    def _build_search_query(
        self, facet_name: str, mention: str, top_k: int, exact_only: bool = False
    ) -> Dict:
        """Build the OpenSearch query for concept lookup.

        Args:
            facet_name: The OpenSearch facet name.
            mention: The search query string.
            top_k: Number of results to return.
            exact_only: If True, only include exact keyword matches.
                       If False, include both exact and fuzzy matches.

        Returns:
            OpenSearch query dict.
        """
        should_clauses = [
            # Exact matches (keyword matching) - highest priority
            {"term": {"term.exact": {"value": mention, "boost": 10.0}}},
            {"term": {"name.exact": {"value": mention, "boost": 10.0}}},
            {"term": {"synonyms.exact": {"value": mention, "boost": 10.0}}},
            # Normalized phrase matches (benefits from hyphen/space normalization)
            # Lower boost (5.0) so exact keyword matches score higher than substring matches
            {
                "match_phrase": {
                    "synonyms_normalized": {
                        "query": mention,
                        "boost": 5.0,
                    }
                }
            },
        ]

        # Add fuzzy matching clauses only if not exact_only
        if not exact_only:
            should_clauses.extend(
                [
                    {
                        "match": {
                            "term": {
                                "query": mention,
                                "fuzziness": "AUTO",
                                "boost": 2.0,
                            }
                        }
                    },
                    {
                        "match": {
                            "name": {
                                "query": mention,
                                "fuzziness": "AUTO",
                                "boost": 1.5,
                            }
                        }
                    },
                    {"match": {"synonyms": {"query": mention, "fuzziness": "AUTO"}}},
                ]
            )

        return {
            "query": {
                "bool": {
                    "must": [{"term": {"facet_name.keyword": facet_name}}],
                    "should": should_clauses,
                    "minimum_should_match": 1,
                }
            },
            "size": top_k,
        }

    def _parse_results(self, response: Dict, min_score: float) -> List[Dict]:
        """Parse OpenSearch response into a list of concept matches.

        Args:
            response: Raw OpenSearch response dict.
            min_score: Minimum score threshold for accepting results.

        Returns:
            List of concept dicts with score, id, term, name, facet_name, metadata.
            Only includes results with score >= min_score threshold.
        """
        hits = response.get("hits", {}).get("hits", [])

        return [
            {
                "score": hit["_score"],
                "id": hit["_source"]["id"],
                "term": hit["_source"].get("display_name", hit["_source"]["term"]),
                "name": hit["_source"]["name"],
                "facet_name": hit["_source"]["facet_name"],
                "metadata": hit["_source"].get("metadata", {}),
                "modifier_role": hit["_source"].get("modifier_role"),
                "ontology_id": hit["_source"].get("ontology_id"),
            }
            for hit in hits
            if hit["_score"] >= min_score
        ]

    def _apply_score_gap_filter(
        self, results: List[Dict], max_score_gap_percent: float = 10.0
    ) -> List[Dict]:
        """Filter results to only include those within a score gap of the top result.

        This helps reduce false positives from fuzzy matching by only keeping results
        that are close in score to the best match.

        Args:
            results: List of results sorted by score (descending).
            max_score_gap_percent: Maximum percentage gap from top score (default: 10%).
                For example, if top score is 100 and gap is 10%, only results with
                score >= 90 are kept.

        Returns:
            Filtered list of results within the score gap.
        """
        if not results:
            return results

        top_score = results[0]["score"]
        min_acceptable_score = top_score * (1 - max_score_gap_percent / 100)

        return [r for r in results if r["score"] >= min_acceptable_score]

    def _has_negation_prefix(self, query: str) -> bool:
        """Check if query starts with a negation prefix.

        Args:
            query: The query string to check.

        Returns:
            True if query starts with negation prefix, False otherwise.
        """
        query_lower = query.lower().strip()
        negation_prefixes = ["non-", "non ", "not ", "anti-", "no "]
        return any(query_lower.startswith(prefix) for prefix in negation_prefixes)

    def _filter_negation_values(self, results: List[Dict], query: str) -> List[Dict]:
        """Filter out negated results based on query and modifier_role.

        Args:
            results: List of concept matches.
            query: The original query string.

        Returns:
            Filtered list of concept matches.
        """
        query_lower = query.lower().strip()
        query_has_negation = self._has_negation_prefix(query_lower)

        filtered_results = []
        for r in results:
            modifier_role = r.get("modifier_role")
            term_lower = r.get("term", "").lower()

            # If query has negation prefix, ONLY keep NEGATION_VALUE concepts
            # This prevents "non hispanic" from matching regular "Hispanic" concepts
            if query_has_negation:
                if modifier_role != "NEGATION_VALUE":
                    continue  # Skip non-negated concepts when query is negated

            # NEGATION_VALUE: Filter if query lacks negation prefix
            if modifier_role == "NEGATION_VALUE" and not query_has_negation:
                continue  # Skip this result

            # CANONICAL_NAME: Filter if query matches negated component
            # Example: "alcoholic" should not match "non-alcoholic fatty liver"
            # But "fatty liver" SHOULD match "non-alcoholic fatty liver"
            if modifier_role == "CANONICAL_NAME":
                # Check if term has negation prefix
                negation_prefix_found = None
                for prefix in ["non-", "non ", "not ", "anti-"]:
                    if term_lower.startswith(prefix):
                        negation_prefix_found = prefix
                        break

                if negation_prefix_found and not query_has_negation:
                    # Extract the negated component (first word/token after prefix)
                    # "non-alcoholic fatty liver" → negated component is "alcoholic"
                    after_prefix = term_lower[len(negation_prefix_found) :].strip()
                    # Get first word (up to space or hyphen)
                    negated_component = after_prefix.split()[0] if after_prefix else ""
                    negated_component = negated_component.split("-")[0]

                    # Only filter if query specifically matches the negated component
                    # "alcoholic" matches "alcoholic" → FILTER
                    # "fatty liver" does not match "alcoholic" → KEEP
                    if query_lower == negated_component or query_lower.startswith(
                        negated_component
                    ):
                        continue  # Skip this result

            filtered_results.append(r)

        return filtered_results

    def resolve_mention_with_expansion(
        self, facet_name: str, mention: str, top_k: int = 10
    ) -> List[Dict]:
        """Resolve mention and expand to include descendants via ontology hierarchy.

        First finds a direct match, then queries for concepts that have the matched
        term as an ancestor (i.e., descendants of the matched concept).

        Args:
            facet_name: The facet name (will be mapped if mapping provided).
            mention: The user's query string (e.g., "diabetes").
            top_k: Number of top results to return (default: 10).

        Returns:
            List of matching concepts including descendants, sorted by relevance.
            Returns empty list if no matches found.
        """
        # Map facet name if mapping provided
        opensearch_facet = self.facet_name_mapping.get(facet_name, facet_name)

        # Normalize the mention for consistent matching
        mention_normalized = self._normalize_mention(mention)

        # First, find direct matches to get the matched term
        direct_results = self.resolve_mention(facet_name, mention, top_k=1)

        if not direct_results:
            return []

        # Get the matched term's name and ontology_id for expansion
        matched_name = direct_results[0]["name"]
        matched_ontology_id = direct_results[0].get("ontology_id")

        try:
            # Query for concepts that have this term as an ancestor (descendants)
            # Also include the original match
            expansion_query = self._build_expansion_query(
                opensearch_facet,
                mention_normalized,
                matched_name,
                matched_ontology_id,
                top_k,
            )
            response = self.client.search(index=self.index_name, body=expansion_query)
            results = self._parse_results(response, min_score=0.0)

            # Filter negation values
            return self._filter_negation_values(results, mention)

        except Exception as e:
            print(f"Error in expansion query: {e}")
            # Fall back to direct results
            return direct_results

    def _build_expansion_query(
        self,
        facet_name: str,
        mention: str,
        matched_name: str,
        matched_ontology_id: str | None,
        top_k: int,
    ) -> Dict:
        """Build query to find a concept and its descendants.

        Args:
            facet_name: The OpenSearch facet name.
            mention: The normalized search query string.
            matched_name: The human-readable name of the matched concept.
            matched_ontology_id: The ontology ID of the matched concept (e.g., MONDO:0005015).
            top_k: Number of results to return.

        Returns:
            OpenSearch query dict.
        """
        should_clauses = [
            # Direct matches using original mention
            {"term": {"term.exact": {"value": mention, "boost": 10.0}}},
            {"term": {"name.exact": {"value": mention, "boost": 10.0}}},
            {"term": {"synonyms.exact": {"value": mention, "boost": 10.0}}},
            {"match_phrase": {"synonyms_normalized": {"query": mention, "boost": 5.0}}},
            # Direct matches using resolved name (for typo handling)
            {"term": {"name.exact": {"value": matched_name, "boost": 8.0}}},
            # Match concepts containing the resolved name (for typo expansion)
            {"match_phrase": {"name": {"query": matched_name, "boost": 4.0}}},
            {
                "match_phrase": {
                    "synonyms_normalized": {"query": matched_name, "boost": 3.0}
                }
            },
        ]

        # Add ancestor matching - find descendants by matching ancestors field
        # Match by name (ancestors are stored as human-readable names)
        should_clauses.append(
            {"term": {"ancestors": {"value": matched_name, "boost": 3.0}}}
        )
        # Also match by ontology_id if available
        if matched_ontology_id:
            should_clauses.append(
                {"term": {"ancestors": {"value": matched_ontology_id, "boost": 3.0}}}
            )

        return {
            "query": {
                "bool": {
                    "must": [{"term": {"facet_name.keyword": facet_name}}],
                    "should": should_clauses,
                    "minimum_should_match": 1,
                }
            },
            "size": top_k,
        }

    def resolve_mention_any_facet(self, mention: str, top_k: int = 5) -> List[Dict]:
        """Resolve a mention searching across ALL facets.

        Used in multi-stage pipeline when facet is unknown.
        Returns the best matches across all facets with their facet names.

        Args:
            mention: The user's query string.
            top_k: Number of top results to return.

        Returns:
            List of matching concepts with scores, including facet_name.
        """
        mention_normalized = self._normalize_mention(mention)

        try:
            # Build query without facet filter
            query = self._build_search_query_any_facet(mention_normalized, top_k)
            response = self.client.search(index=self.index_name, body=query)

            # Try exact matches first
            exact_results = self._parse_results(
                response, min_score=self.exact_min_score
            )

            if exact_results:
                exact_results = self._apply_score_gap_filter(
                    exact_results, max_score_gap_percent=60.0
                )
                return self._filter_negation_values(exact_results, mention)

            # Fall back to fuzzy matching
            fuzzy_query = self._build_search_query_any_facet(
                mention_normalized, top_k, exact_only=False
            )
            fuzzy_response = self.client.search(index=self.index_name, body=fuzzy_query)
            fuzzy_results = self._parse_results(
                fuzzy_response, min_score=self.fuzzy_min_score
            )

            fuzzy_results = self._apply_score_gap_filter(
                fuzzy_results, max_score_gap_percent=60.0
            )

            return self._filter_negation_values(fuzzy_results, mention)

        except Exception as e:
            print(f"Error querying OpenSearch (any facet): {e}")
            return []

    def resolve_mention_any_facet_with_expansion(
        self, mention: str, top_k: int = 10
    ) -> List[Dict]:
        """Resolve mention with expansion, searching across ALL facets.

        First finds a direct match, then expands to include descendants
        via ontology hierarchy.

        Args:
            mention: The user's query string.
            top_k: Number of top results to return.

        Returns:
            List of matching concepts including descendants.
        """
        mention_normalized = self._normalize_mention(mention)

        # First, find direct matches
        direct_results = self.resolve_mention_any_facet(mention, top_k=1)

        if not direct_results:
            return []

        # Get matched term info
        matched_name = direct_results[0]["name"]
        matched_facet = direct_results[0]["facet_name"]
        matched_ontology_id = direct_results[0].get("ontology_id")

        try:
            # Query for concepts in the same facet with this term as ancestor
            expansion_query = self._build_expansion_query(
                matched_facet,
                mention_normalized,
                matched_name,
                matched_ontology_id,
                top_k,
            )
            response = self.client.search(index=self.index_name, body=expansion_query)
            results = self._parse_results(response, min_score=0.0)

            return self._filter_negation_values(results, mention)

        except Exception as e:
            print(f"Error in expansion query (any facet): {e}")
            return direct_results

    def _build_search_query_any_facet(
        self, mention: str, top_k: int, exact_only: bool = True
    ) -> Dict:
        """Build OpenSearch query without facet filter.

        Args:
            mention: The search query string.
            top_k: Number of results to return.
            exact_only: If True, only include exact keyword matches.

        Returns:
            OpenSearch query dict.
        """
        should_clauses = [
            {"term": {"term.exact": {"value": mention, "boost": 10.0}}},
            {"term": {"name.exact": {"value": mention, "boost": 10.0}}},
            {"term": {"synonyms.exact": {"value": mention, "boost": 10.0}}},
            {"match_phrase": {"synonyms_normalized": {"query": mention, "boost": 5.0}}},
        ]

        if not exact_only:
            should_clauses.extend(
                [
                    {
                        "match": {
                            "term": {
                                "query": mention,
                                "fuzziness": "AUTO",
                                "boost": 2.0,
                            }
                        }
                    },
                    {
                        "match": {
                            "name": {
                                "query": mention,
                                "fuzziness": "AUTO",
                                "boost": 1.5,
                            }
                        }
                    },
                    {"match": {"synonyms": {"query": mention, "fuzziness": "AUTO"}}},
                ]
            )

        return {
            "query": {
                "bool": {
                    "should": should_clauses,
                    "minimum_should_match": 1,
                }
            },
            "size": top_k,
        }

    def get_all_descendants(
        self, facet_name: str, ontology_id: str, include_self: bool = True
    ) -> List[Dict]:
        """Get ALL concepts that have the given ontology_id as an ancestor.

        This returns the complete set of descendants in the ontology hierarchy,
        not limited by top_k. Useful for expanding a parent concept to all its
        subtypes.

        Args:
            facet_name: The facet to search within (e.g., "diagnoses.disease").
            ontology_id: The ontology ID to find descendants of (e.g., "MONDO:0005015").
            include_self: If True, also returns the concept with this ontology_id.

        Returns:
            List of concept dicts representing all descendants.
        """
        # Map facet name if mapping provided
        opensearch_facet = self.facet_name_mapping.get(facet_name, facet_name)

        try:
            should_clauses = [
                # Find concepts that have this ontology_id in their ancestors
                {"term": {"ancestors": {"value": ontology_id}}}
            ]

            if include_self:
                # Also include the concept itself
                should_clauses.append(
                    {"term": {"ontology_id.keyword": {"value": ontology_id}}}
                )

            query = {
                "query": {
                    "bool": {
                        "must": [{"term": {"facet_name.keyword": opensearch_facet}}],
                        "should": should_clauses,
                        "minimum_should_match": 1,
                    }
                },
                "size": 1000,  # Get all descendants (adjust if needed)
            }

            response = self.client.search(index=self.index_name, body=query)
            return self._parse_results(response, min_score=0.0)

        except Exception as e:
            print(f"Error getting descendants: {e}")
            return []

    def expand_to_descendants(self, facet_name: str, term: str) -> List[Dict]:
        """Expand a term to include all its descendants via ontology hierarchy.

        First looks up the term to get its ontology_id, then finds all concepts
        that have that ontology_id as an ancestor.

        Args:
            facet_name: The facet to search within.
            term: The term to expand (will be looked up to get ontology_id).

        Returns:
            List of concept dicts including the original and all descendants.
            Returns list with just the original term if no ontology_id found.
        """
        # First, look up the term to get its ontology_id
        results = self.resolve_mention(facet_name, term, top_k=1)

        if not results:
            return []

        matched = results[0]
        ontology_id = matched.get("ontology_id")

        if not ontology_id:
            # No ontology_id, can't expand - return just the original
            return results

        # Get all descendants
        return self.get_all_descendants(facet_name, ontology_id, include_self=True)

    def health_check(self) -> bool:
        """Check if OpenSearch is accessible and the concepts index exists.

        Returns:
            True if healthy, False otherwise.
        """
        try:
            # Check cluster health
            health = self.client.cluster.health()
            if health["status"] not in ["green", "yellow"]:
                return False

            # Check if concepts index exists
            return self.client.indices.exists(index=self.index_name)

        except Exception:
            return False
