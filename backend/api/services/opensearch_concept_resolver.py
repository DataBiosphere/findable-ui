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
        """
        self.client = OpenSearch(
            hosts=[{"host": host, "port": port}],
            http_compress=True,
            use_ssl=use_ssl,
            verify_certs=verify_certs,
        )
        self.index_name = "concepts"
        self.facet_name_mapping = facet_name_mapping or {}

    def resolve_mention(
        self, facet_name: str, mention: str, top_k: int = 5
    ) -> List[Dict]:
        """Resolve a user mention to facet concepts using OpenSearch.

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

        # Build the search query
        query = self._build_search_query(opensearch_facet, mention, top_k)

        try:
            # Execute the search
            response = self.client.search(index=self.index_name, body=query)

            # Parse and return results
            return self._parse_results(response)

        except Exception as e:
            # Log error and return empty results
            # In production, you might want to use proper logging
            print(f"Error querying OpenSearch: {e}")
            return []

    def _build_search_query(
        self, facet_name: str, mention: str, top_k: int
    ) -> Dict:
        """Build the OpenSearch query for concept lookup.

        Uses a multi-pronged strategy:
        1. Exact matches on term, name, and synonyms (highest priority)
        2. Fuzzy matches with boosting (typo tolerance)
        3. Synonym expansion (automatic via analyzer)

        Args:
            facet_name: The OpenSearch facet name.
            mention: The search query string.
            top_k: Number of results to return.

        Returns:
            OpenSearch query dict.
        """
        return {
            "query": {
                "bool": {
                    "must": [
                        # Must match the facet
                        {"term": {"facet_name.keyword": facet_name}}
                    ],
                    "should": [
                        # Exact matches (highest priority)
                        {"term": {"term.keyword": mention}},
                        {"term": {"name.keyword": mention}},
                        {"term": {"synonyms.keyword": mention}},
                        # Fuzzy matches with boosting
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
                        {
                            "match": {
                                "synonyms": {"query": mention, "fuzziness": "AUTO"}
                            }
                        },
                    ],
                    "minimum_should_match": 1,
                }
            },
            "size": top_k,
        }

    def _parse_results(self, response: Dict) -> List[Dict]:
        """Parse OpenSearch response into a list of concept matches.

        Args:
            response: Raw OpenSearch response dict.

        Returns:
            List of concept dicts with score, id, term, name, facet_name, metadata.
        """
        hits = response.get("hits", {}).get("hits", [])

        return [
            {
                "score": hit["_score"],
                "id": hit["_source"]["id"],
                "term": hit["_source"]["term"],
                "name": hit["_source"]["name"],
                "facet_name": hit["_source"]["facet_name"],
                "metadata": hit["_source"].get("metadata", {}),
            }
            for hit in hits
        ]

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
