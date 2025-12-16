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
    """Enrich ontology terms using EBI OLS API."""

    def __init__(self):
        self.cache = {}
        self.api_base = "https://www.ebi.ac.uk/ols/api"
        self.stats = {"total": 0, "enriched": 0, "failed": 0, "cached": 0}

    def is_ontology_id(self, term: str) -> bool:
        """Check if term looks like an ontology ID."""
        # Pattern: PREFIX:NUMBER (e.g., HP:0001250, OMIM:614231)
        return bool(re.match(r"^[A-Z]+:\d+$", term))

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

        ontology_name = ontology_map.get(prefix)
        if not ontology_name:
            return None

        # Construct OLS API URL
        # Double-encode the IRI (OLS requirement)
        iri = f"http://purl.obolibrary.org/obo/{prefix}_{term_id}"
        encoded_iri = urllib.parse.quote(urllib.parse.quote(iri, safe=""), safe="")
        url = f"{self.api_base}/ontologies/{ontology_name}/terms/{encoded_iri}"

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

    def enrich_concept(self, concept: Dict) -> Dict:
        """Enrich a single concept if it has an ontology ID."""
        term = concept["term"]

        if not self.is_ontology_id(term):
            return concept

        self.stats["total"] += 1

        # Look up the term
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
            return concept
        else:
            self.stats["failed"] += 1
            return concept

    def enrich_concepts(self, concepts: List[Dict], batch_size: int = 10) -> List[Dict]:
        """
        Enrich a list of concepts.

        Args:
            concepts: List of concept dictionaries
            batch_size: Print progress every N concepts

        Returns:
            Enriched concepts list
        """
        enriched = []
        total = len(concepts)

        print(f"Enriching {total} concepts...")

        for i, concept in enumerate(concepts):
            enriched_concept = self.enrich_concept(concept)
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

    args = parser.parse_args()

    # Read concepts
    print(f"Reading concepts from {args.input}...")
    with open(args.input, "r") as f:
        concepts = json.load(f)

    if args.limit:
        concepts = concepts[: args.limit]
        print(f"Limiting to first {args.limit} concepts for testing")

    # Enrich
    enricher = OntologyEnricher()
    enriched_concepts = enricher.enrich_concepts(concepts)

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
