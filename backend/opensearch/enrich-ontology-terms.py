#!/usr/bin/env python3
"""
Enrich concepts with ontology term names using EBI OLS API.

This script:
1. Identifies concepts with ontology IDs (HP:, OMIM:, ORPHA:, etc.)
2. Looks up the human-readable name from ontology APIs
3. Updates the concept's name and adds synonyms
4. Saves enriched concepts to a new file

APIs used:
- EBI OLS (Ontology Lookup Service): https://www.ebi.ac.uk/ols/
- EBI OxO (Ontology Xref Service): https://www.ebi.ac.uk/spot/oxo/
- Supports: HP, MONDO, UBERON, CL, OBI, and many more
"""

import json
import time
import re
from typing import Dict, Optional, List
import urllib.request
import urllib.parse
import urllib.error


class OntologyEnricher:
    """Enrich ontology terms using EBI OLS and OxO APIs."""

    def __init__(
        self,
        fetch_ancestors: bool = False,
        map_to_mondo: bool = False,
        map_text_to_mondo: bool = False,
        fuzzy_match: bool = False,
    ):
        """Initialize the enricher.

        Args:
            fetch_ancestors: If True, fetch ancestor chain for ontology terms.
            map_to_mondo: If True, map OMIM/ORPHA codes to MONDO IDs via OxO.
            map_text_to_mondo: If True, map plain text disease names to MONDO IDs.
            fuzzy_match: If True, try fuzzy matching for text names after exact fails.
        """
        self.cache = {}
        self.ancestors_cache = {}
        self.mondo_cache = {}
        self.mondo_name_cache = {}
        self.ols_base = "https://www.ebi.ac.uk/ols/api"
        self.ols4_base = "https://www.ebi.ac.uk/ols4/api"
        self.oxo_base = "https://www.ebi.ac.uk/spot/oxo/api"
        self.fetch_ancestors = fetch_ancestors
        self.map_to_mondo = map_to_mondo
        self.map_text_to_mondo = map_text_to_mondo
        self.fuzzy_match = fuzzy_match
        self.stats = {
            "total": 0,
            "enriched": 0,
            "failed": 0,
            "cached": 0,
            "ancestors": 0,
            "mondo_mapped": 0,
            "text_to_mondo": 0,
            "text_to_mondo_fuzzy": 0,
            "case_normalized": 0,
        }

    def is_ontology_id(self, term: str) -> bool:
        """Check if term looks like an ontology ID."""
        # Pattern: PREFIX:NUMBER (e.g., HP:0001250, OMIM:614231, omim:117000)
        return bool(re.match(r"^[A-Za-z]+:\d+$", term))

    def lookup_term(self, ontology_id: str) -> Optional[Dict]:
        """
        Look up ontology term details from EBI OLS.

        Args:
            ontology_id: Ontology ID like "HP:0001250"

        Returns:
            Dict with label, description, and synonyms, or None if not found
        """
        # Check cache first
        if ontology_id in self.cache:
            self.stats["cached"] += 1
            return self.cache[ontology_id]

        # Parse ontology prefix and ID
        if ":" not in ontology_id:
            return None

        prefix, term_id = ontology_id.split(":", 1)
        prefix_upper = prefix.upper()

        # Map prefixes to OLS ontology names
        ontology_map = {
            "HP": "hp",
            "MONDO": "mondo",
            "OMIM": "omim",
            "ORPHA": "ordo",
            "UBERON": "uberon",
            "CL": "cl",
            "OBI": "obi",
            "HGNC": "hgnc",
        }

        ontology_name = ontology_map.get(prefix_upper)
        if not ontology_name:
            return None

        # Construct OLS API URL
        # Double-encode the IRI (OLS requirement)
        iri = f"http://purl.obolibrary.org/obo/{prefix_upper}_{term_id}"
        encoded_iri = urllib.parse.quote(urllib.parse.quote(iri, safe=""), safe="")
        url = f"{self.ols_base}/ontologies/{ontology_name}/terms/{encoded_iri}"

        try:
            # Make API request with retry
            for attempt in range(3):
                try:
                    with urllib.request.urlopen(url, timeout=10) as response:
                        data = json.loads(response.read().decode("utf-8"))

                    result = {
                        "label": data.get("label", ontology_id),
                        "description": (
                            data.get("description", [None])[0]
                            if data.get("description")
                            else None
                        ),
                        "synonyms": data.get("synonyms", []),
                    }

                    # Cache the result
                    self.cache[ontology_id] = result
                    return result

                except urllib.error.HTTPError as e:
                    if e.code == 404:
                        # Term not found
                        return None
                    elif e.code == 429:
                        # Rate limit - wait and retry
                        time.sleep(2**attempt)
                        continue
                    else:
                        raise

                except urllib.error.URLError:
                    # Network error - retry
                    if attempt < 2:
                        time.sleep(1)
                        continue
                    return None

        except Exception as e:
            print(f"  ⚠ Error looking up {ontology_id}: {e}")
            return None

        return None

    def lookup_ancestors(self, ontology_id: str) -> List[str]:
        """Fetch all ancestors for an ontology term from EBI OLS.

        Args:
            ontology_id: Ontology ID like "HP:0001250"

        Returns:
            List of ancestor ontology IDs (e.g., ["MONDO:0005027", "HP:0001250"]).
        """
        # Check cache first
        if ontology_id in self.ancestors_cache:
            return self.ancestors_cache[ontology_id]

        if ":" not in ontology_id:
            return []

        prefix, term_id = ontology_id.split(":", 1)
        prefix_upper = prefix.upper()

        # Map prefixes to OLS ontology names
        ontology_map = {
            "HP": "hp",
            "MONDO": "mondo",
            "OMIM": "omim",
            "ORPHA": "ordo",
            "UBERON": "uberon",
            "CL": "cl",
            "OBI": "obi",
            "HGNC": "hgnc",
        }

        ontology_name = ontology_map.get(prefix_upper)
        if not ontology_name:
            return []

        # Construct OLS API URL for ancestors
        # Double-encode the IRI (OLS requirement)
        iri = f"http://purl.obolibrary.org/obo/{prefix_upper}_{term_id}"
        encoded_iri = urllib.parse.quote(urllib.parse.quote(iri, safe=""), safe="")
        url = (
            f"{self.ols_base}/ontologies/{ontology_name}/terms/{encoded_iri}/ancestors"
        )

        try:
            for attempt in range(3):
                try:
                    with urllib.request.urlopen(url, timeout=10) as response:
                        data = json.loads(response.read().decode("utf-8"))

                    # Extract ancestor ontology IDs (e.g., MONDO:0005027)
                    ancestors = []
                    for term in data.get("_embedded", {}).get("terms", []):
                        # OLS returns obo_id like "MONDO:0005027" or short_form like "MONDO_0005027"
                        obo_id = term.get("obo_id")
                        if obo_id:
                            ancestors.append(obo_id)
                        else:
                            # Fallback to short_form, converting underscore to colon
                            short_form = term.get("short_form", "")
                            if "_" in short_form:
                                ancestors.append(short_form.replace("_", ":", 1))

                    # Cache the result
                    self.ancestors_cache[ontology_id] = ancestors
                    return ancestors

                except urllib.error.HTTPError as e:
                    if e.code == 404:
                        return []
                    elif e.code == 429:
                        time.sleep(2**attempt)
                        continue
                    else:
                        raise

                except urllib.error.URLError:
                    if attempt < 2:
                        time.sleep(1)
                        continue
                    return []

        except Exception as e:
            print(f"  ⚠ Error fetching ancestors for {ontology_id}: {e}")
            return []

        return []

    def lookup_mondo_mapping(self, ontology_id: str) -> Optional[str]:
        """Map OMIM or ORPHA code to MONDO ID via OxO API.

        Args:
            ontology_id: Ontology ID like "OMIM:117000" or "ORPHA:319"

        Returns:
            MONDO ID like "MONDO:0007294" if mapping found, None otherwise
        """
        # Check cache first
        if ontology_id in self.mondo_cache:
            return self.mondo_cache[ontology_id]

        if ":" not in ontology_id:
            return None

        prefix = ontology_id.split(":")[0].upper()
        if prefix not in ("OMIM", "ORPHA"):
            return None

        # Normalize to uppercase and convert ORPHA: to Orphanet: for OxO
        term_id = ontology_id.split(":")[1]
        if prefix == "ORPHA":
            oxo_id = f"Orphanet:{term_id}"
        else:
            oxo_id = f"{prefix}:{term_id}"

        # OxO API URL - search for mappings from this ID
        url = f"{self.oxo_base}/mappings?fromId={urllib.parse.quote(oxo_id)}"

        try:
            for attempt in range(3):
                try:
                    with urllib.request.urlopen(url, timeout=10) as response:
                        data = json.loads(response.read().decode("utf-8"))

                    # Look for MONDO mapping in results
                    mappings = data.get("_embedded", {}).get("mappings", [])
                    for mapping in mappings:
                        from_term = mapping.get("fromTerm", {})
                        curie = from_term.get("curie", "")
                        if curie.startswith("MONDO:"):
                            self.mondo_cache[ontology_id] = curie
                            return curie

                    # No MONDO mapping found
                    self.mondo_cache[ontology_id] = None
                    return None

                except urllib.error.HTTPError as e:
                    if e.code == 404:
                        return None
                    elif e.code == 429:
                        time.sleep(2**attempt)
                        continue
                    else:
                        raise

                except urllib.error.URLError:
                    if attempt < 2:
                        time.sleep(1)
                        continue
                    return None

        except Exception as e:
            print(f"  ⚠ Error looking up MONDO mapping for {ontology_id}: {e}")
            return None

        return None

    def normalize_for_comparison(self, text: str) -> str:
        """Normalize text for fuzzy comparison.

        Removes punctuation differences (hyphens, apostrophes) and normalizes whitespace.
        Also handles possessive forms (alzheimer's → alzheimer).
        """
        # Lowercase
        text = text.lower()
        # Remove possessive 's (alzheimer's → alzheimer)
        text = re.sub(r"'s\b", "", text)
        text = re.sub(r"'s\b", "", text)  # curly apostrophe
        # Remove remaining apostrophes and hyphens
        text = text.replace("'", "").replace("'", "").replace("-", " ")
        # Normalize whitespace
        text = " ".join(text.split())
        return text

    def is_subtype_name(self, name: str) -> bool:
        """Check if name looks like a numbered subtype (e.g., 'disease 17', 'type 1')."""
        name_lower = name.lower()
        # Trailing numbers like "disease 17"
        if re.search(r"\s+\d+$", name_lower):
            return True
        # "type X" or "susceptibility to X" patterns
        if re.search(r"\b(susceptibility|subtype)\s+(to\s+)?\d", name_lower):
            return True
        return False

    def compute_similarity(self, query: str, candidate: str) -> float:
        """Compute similarity score between query and candidate.

        Returns a score from 0 to 1, where 1 is identical after normalization.
        """
        query_norm = self.normalize_for_comparison(query)
        candidate_norm = self.normalize_for_comparison(candidate)

        # Exact match after normalization
        if query_norm == candidate_norm:
            return 1.0

        # Word-based Jaccard similarity
        query_words = set(query_norm.split())
        candidate_words = set(candidate_norm.split())

        if not query_words or not candidate_words:
            return 0.0

        intersection = len(query_words & candidate_words)
        union = len(query_words | candidate_words)

        return intersection / union if union > 0 else 0.0

    def find_best_fuzzy_match(
        self, query: str, candidates: List[Dict]
    ) -> Optional[Dict]:
        """Find the best fuzzy match from candidates, preferring parent concepts.

        Args:
            query: The search query (e.g., "alzheimer's disease")
            candidates: List of OLS search result dicts with 'label' and 'obo_id'

        Returns:
            Best matching candidate dict, or None if no good match
        """
        scored_candidates = []

        for c in candidates:
            label = c.get("label", "")
            similarity = self.compute_similarity(query, label)

            # Require minimum 70% similarity
            if similarity < 0.7:
                continue

            # Penalize subtypes - we want parent concepts for hierarchy expansion
            is_subtype = self.is_subtype_name(label)
            # Subtypes get a penalty but aren't rejected
            adjusted_score = similarity - (0.3 if is_subtype else 0)

            scored_candidates.append((adjusted_score, similarity, is_subtype, c))

        if not scored_candidates:
            return None

        # Sort by adjusted score (descending), then by original similarity
        scored_candidates.sort(key=lambda x: (-x[0], -x[1]))

        # Return the best match
        return scored_candidates[0][3]

    def lookup_mondo_by_name(
        self, name: str, allow_fuzzy: bool = False
    ) -> Optional[str]:
        """Look up MONDO ID by label match using OLS4 search API.

        Args:
            name: Disease name like "diabetes mellitus" or "epilepsy"
            allow_fuzzy: If True, accept fuzzy matches (normalized string comparison)

        Returns:
            MONDO ID like "MONDO:0005015" if match found, None otherwise
        """
        # Check cache first
        name_lower = name.lower()
        cache_key = f"{name_lower}:fuzzy={allow_fuzzy}"
        if cache_key in self.mondo_name_cache:
            return self.mondo_name_cache[cache_key]

        # Skip special values
        if name_lower in ("none", "other", "unknown", "unspecified", ""):
            self.mondo_name_cache[cache_key] = None
            return None

        # OLS4 search API - exact=true for exact matching, omit for fuzzy
        encoded_name = urllib.parse.quote(name)
        if allow_fuzzy:
            url = f"{self.ols4_base}/search?q={encoded_name}&ontology=mondo&rows=5"
        else:
            url = f"{self.ols4_base}/search?q={encoded_name}&ontology=mondo&exact=true&rows=5"

        try:
            for attempt in range(3):
                try:
                    with urllib.request.urlopen(url, timeout=10) as response:
                        data = json.loads(response.read().decode("utf-8"))

                    docs = data.get("response", {}).get("docs", [])

                    # Filter to MONDO IDs only
                    mondo_docs = [
                        d for d in docs if d.get("obo_id", "").startswith("MONDO:")
                    ]

                    if allow_fuzzy:
                        # Find best fuzzy match, preferring parent concepts
                        best_match = self.find_best_fuzzy_match(name, mondo_docs)
                        if best_match:
                            mondo_id = best_match.get("obo_id")
                            self.mondo_name_cache[cache_key] = mondo_id
                            return mondo_id
                        # No fuzzy match found
                        self.mondo_name_cache[cache_key] = None
                        return None
                    else:
                        # Find exact label matches (case-insensitive)
                        exact_matches = [
                            d
                            for d in mondo_docs
                            if d.get("label", "").lower() == name_lower
                        ]

                        # Only accept if exactly one exact match
                        if len(exact_matches) == 1:
                            mondo_id = exact_matches[0].get("obo_id")
                            self.mondo_name_cache[cache_key] = mondo_id
                            return mondo_id

                        # No match or ambiguous
                        self.mondo_name_cache[cache_key] = None
                        return None

                except urllib.error.HTTPError as e:
                    if e.code == 404:
                        self.mondo_name_cache[cache_key] = None
                        return None
                    elif e.code == 429:
                        time.sleep(2**attempt)
                        continue
                    else:
                        raise

                except urllib.error.URLError:
                    if attempt < 2:
                        time.sleep(1)
                        continue
                    self.mondo_name_cache[cache_key] = None
                    return None

        except Exception as e:
            print(f"  ⚠ Error looking up MONDO for '{name}': {e}")
            self.mondo_name_cache[cache_key] = None
            return None

        self.mondo_name_cache[cache_key] = None
        return None

    def normalize_ontology_id(self, term: str) -> str:
        """Normalize ontology ID to uppercase prefix (e.g., hp:0001388 -> HP:0001388)."""
        if ":" in term:
            prefix, num = term.split(":", 1)
            return f"{prefix.upper()}:{num}"
        return term

    def enrich_concept(self, concept: Dict, skip_enriched: bool = False) -> Dict:
        """Enrich a single concept with ontology data."""
        term = concept["term"]
        mondo_id = None

        # Skip if already enriched
        if skip_enriched and (concept.get("ontology_id") or concept.get("ancestors")):
            return concept

        # Handle ontology IDs (HP:, OMIM:, ORPHA:, etc.)
        ontology_id_for_ancestors = None
        if self.is_ontology_id(term):
            # Normalize to uppercase (e.g., hp:0001388 -> HP:0001388)
            normalized = self.normalize_ontology_id(term)
            if normalized != term:
                self.stats["case_normalized"] += 1
                print(f"  ✓ Normalized: {term} → {normalized}")
            term = normalized
            concept["term"] = term
            self.stats["total"] += 1

            prefix = term.split(":")[0].upper()

            # Map OMIM/ORPHA to MONDO if enabled
            if self.map_to_mondo and prefix in ("OMIM", "ORPHA"):
                mondo_id = self.lookup_mondo_mapping(term)
                if mondo_id:
                    concept["ontology_id"] = mondo_id
                    ontology_id_for_ancestors = mondo_id
                    self.stats["mondo_mapped"] += 1
                    print(f"  ✓ Mapped {term} → {mondo_id}")
            else:
                # For HP, MONDO, etc. - the term itself is the ontology ID
                concept["ontology_id"] = term
                ontology_id_for_ancestors = term

            # Look up the term from OLS
            ontology_data = self.lookup_term(term)

            if ontology_data:
                # Update concept with enriched data
                concept["name"] = ontology_data["label"]

                # Add synonyms (combine with existing)
                existing_synonyms = set(concept.get("synonyms", []))
                ontology_synonyms = set(ontology_data.get("synonyms", []))
                all_synonyms = list(existing_synonyms | ontology_synonyms | {term})
                concept["synonyms"] = all_synonyms

                # Add description to metadata if available
                if ontology_data.get("description"):
                    if "metadata" not in concept:
                        concept["metadata"] = {}
                    concept["metadata"]["description"] = ontology_data["description"]

                self.stats["enriched"] += 1
            else:
                self.stats["failed"] += 1

        # Handle plain text terms - try to map to MONDO by name
        elif self.map_text_to_mondo:
            # First try exact matching
            mondo_id = self.lookup_mondo_by_name(term, allow_fuzzy=False)
            if mondo_id:
                concept["ontology_id"] = mondo_id
                self.stats["text_to_mondo"] += 1
                print(f"  ✓ Text → MONDO: {term} → {mondo_id}")
            # If exact fails and fuzzy is enabled, try fuzzy matching
            elif self.fuzzy_match:
                mondo_id = self.lookup_mondo_by_name(term, allow_fuzzy=True)
                if mondo_id:
                    concept["ontology_id"] = mondo_id
                    self.stats["text_to_mondo_fuzzy"] += 1
                    print(f"  ✓ Text → MONDO (fuzzy): {term} → {mondo_id}")

        # Fetch ancestors if enabled - works for HP, MONDO, OMIM→MONDO, etc.
        # This runs even if OLS lookup failed (e.g., for OMIM/ORPHA mapped to MONDO)
        ancestor_id = ontology_id_for_ancestors or mondo_id
        if self.fetch_ancestors and ancestor_id:
            ancestors = self.lookup_ancestors(ancestor_id)
            if ancestors:
                concept["ancestors"] = ancestors
                self.stats["ancestors"] += 1

        return concept

    def enrich_concepts(
        self, concepts: List[Dict], batch_size: int = 10, skip_enriched: bool = False
    ) -> List[Dict]:
        """
        Enrich a list of concepts.

        Args:
            concepts: List of concept dictionaries
            batch_size: Print progress every N concepts
            skip_enriched: Skip concepts that already have ontology_id or ancestors

        Returns:
            Enriched concepts list
        """
        enriched = []
        total = len(concepts)
        skipped = 0

        if skip_enriched:
            skipped = sum(
                1 for c in concepts if c.get("ontology_id") or c.get("ancestors")
            )
            print(
                f"Enriching {total} concepts ({skipped} already enriched, will skip)..."
            )
        else:
            print(f"Enriching {total} concepts...")

        for i, concept in enumerate(concepts):
            enriched_concept = self.enrich_concept(concept, skip_enriched=skip_enriched)
            enriched.append(enriched_concept)

            # Print progress
            if (i + 1) % batch_size == 0:
                print(
                    f"  Progress: {i + 1}/{total} ({self.stats['enriched']} enriched, {self.stats['failed']} failed)"
                )

            # Rate limiting - be nice to the API
            if self.stats["enriched"] % 50 == 0 and self.stats["enriched"] > 0:
                time.sleep(1)

        return enriched

    def print_stats(self):
        """Print enrichment statistics."""
        print("\n=== ENRICHMENT STATISTICS ===")
        print(f"Ontology IDs found: {self.stats['total']}")
        print(f"Successfully enriched: {self.stats['enriched']}")
        print(f"Failed to enrich: {self.stats['failed']}")
        print(f"Cache hits: {self.stats['cached']}")
        if self.stats["case_normalized"] > 0:
            print(f"Case normalized: {self.stats['case_normalized']}")
        if self.map_to_mondo:
            print(f"OMIM/ORPHA mapped to MONDO: {self.stats['mondo_mapped']}")
        if self.map_text_to_mondo:
            print(f"Text names mapped to MONDO (exact): {self.stats['text_to_mondo']}")
        if self.fuzzy_match:
            print(
                f"Text names mapped to MONDO (fuzzy): {self.stats['text_to_mondo_fuzzy']}"
            )
        if self.fetch_ancestors:
            print(f"Terms with ancestors: {self.stats['ancestors']}")


def main():
    import argparse

    parser = argparse.ArgumentParser(
        description="Enrich concepts with ontology term names"
    )
    parser.add_argument(
        "--input", default="concepts-from-datasets.json", help="Input concepts file"
    )
    parser.add_argument(
        "--output",
        default="concepts-enriched.json",
        help="Output enriched concepts file",
    )
    parser.add_argument("--limit", type=int, help="Limit to N concepts (for testing)")
    parser.add_argument(
        "--ancestors",
        action="store_true",
        help="Fetch ancestor chain from OLS for ontology hierarchy support",
    )
    parser.add_argument(
        "--map-to-mondo",
        action="store_true",
        help="Map OMIM/ORPHA codes to MONDO IDs via OxO API",
    )
    parser.add_argument(
        "--map-text-to-mondo",
        action="store_true",
        help="Map plain text disease names to MONDO IDs via OLS search",
    )
    parser.add_argument(
        "--fuzzy",
        action="store_true",
        help="Enable fuzzy matching for text names (use with --map-text-to-mondo)",
    )
    parser.add_argument(
        "--skip-enriched",
        action="store_true",
        help="Skip concepts that already have ontology_id or ancestors",
    )

    args = parser.parse_args()

    # Read concepts
    print(f"Reading concepts from {args.input}...")
    with open(args.input, "r") as f:
        concepts = json.load(f)

    if args.limit:
        concepts = concepts[: args.limit]
        print(f"Limiting to first {args.limit} concepts for testing")

    if args.ancestors:
        print("Ancestor fetching ENABLED - will query OLS for is_a hierarchy")
    if args.map_to_mondo:
        print("MONDO mapping ENABLED - will map OMIM/ORPHA to MONDO via OxO")
    if args.map_text_to_mondo:
        print(
            "Text-to-MONDO ENABLED - will map plain text names to MONDO via OLS search"
        )
    if args.fuzzy:
        print("Fuzzy matching ENABLED - will try fuzzy match if exact match fails")
    if args.skip_enriched:
        print(
            "Skip enriched ENABLED - will skip concepts with existing ontology_id/ancestors"
        )

    # Enrich
    enricher = OntologyEnricher(
        fetch_ancestors=args.ancestors,
        map_to_mondo=args.map_to_mondo,
        map_text_to_mondo=args.map_text_to_mondo,
        fuzzy_match=args.fuzzy,
    )
    enriched_concepts = enricher.enrich_concepts(
        concepts, skip_enriched=args.skip_enriched
    )

    # Save
    print(f"\nWriting enriched concepts to {args.output}...")
    with open(args.output, "w") as f:
        json.dump(enriched_concepts, f, indent=2)

    # Print stats
    enricher.print_stats()

    print(f"\n✓ Enriched concepts saved to {args.output}")
    print(f"\nTo load into OpenSearch:")
    print(f"  python load-concepts.py --file {args.output} --clear")


if __name__ == "__main__":
    main()
