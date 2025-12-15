#!/usr/bin/env python3
"""
Enrich OMIM and ORPHA terms using alternative APIs.

OMIM: Uses MyGene.info API (free, no key required)
ORPHA: Uses Orphanet/OLS with correct ontology mapping
"""

import json
import time
import urllib.request
import urllib.parse
import urllib.error
from typing import Dict, Optional


class OMIMEnricher:
    """Enrich OMIM terms using MyGene.info API."""

    def __init__(self):
        self.api_base = "https://mygene.info/v3"
        self.cache = {}
        self.stats = {"total": 0, "enriched": 0, "failed": 0}

    def lookup_omim(self, omim_id: str) -> Optional[Dict]:
        """
        Look up OMIM term via MyGene.info.

        Args:
            omim_id: OMIM ID like "OMIM:615369"

        Returns:
            Dict with name and description, or None
        """
        if omim_id in self.cache:
            return self.cache[omim_id]

        # Extract numeric ID
        numeric_id = omim_id.replace('OMIM:', '')

        # Query MyGene.info
        url = f"{self.api_base}/query"
        params = {
            'q': f'MIM:{numeric_id}',
            'fields': 'name,summary,alias',
            'species': 'human'
        }

        try:
            query_string = urllib.parse.urlencode(params)
            full_url = f"{url}?{query_string}"

            with urllib.request.urlopen(full_url, timeout=10) as response:
                data = json.loads(response.read().decode('utf-8'))

            if data.get('total', 0) == 0:
                return None

            hit = data['hits'][0]

            # Extract name
            name = hit.get('name', omim_id)

            # Build synonyms from aliases
            synonyms = []
            if 'alias' in hit:
                if isinstance(hit['alias'], list):
                    synonyms = hit['alias']
                else:
                    synonyms = [hit['alias']]

            result = {
                'label': name,
                'description': hit.get('summary'),
                'synonyms': synonyms
            }

            self.cache[omim_id] = result
            return result

        except Exception as e:
            print(f"  ⚠ Failed to look up {omim_id}: {e}")
            return None


class ORPHAEnricher:
    """Enrich ORPHA terms using EBI OLS with correct ontology."""

    def __init__(self):
        self.api_base = "https://www.ebi.ac.uk/ols/api"
        self.cache = {}
        self.stats = {"total": 0, "enriched": 0, "failed": 0}

    def lookup_orpha(self, orpha_id: str) -> Optional[Dict]:
        """
        Look up ORPHA term via EBI OLS.

        Args:
            orpha_id: ORPHA ID like "ORPHA:104075" or "Orphanet:104075"

        Returns:
            Dict with label, description, and synonyms, or None
        """
        if orpha_id in self.cache:
            return self.cache[orpha_id]

        # Normalize to ORPHA format
        numeric_id = orpha_id.replace('ORPHA:', '').replace('Orphanet:', '')

        # Try OLS with ordo ontology
        # IRI format: http://www.orpha.net/ORDO/Orphanet_104075
        iri = f"http://www.orpha.net/ORDO/Orphanet_{numeric_id}"
        encoded_iri = urllib.parse.quote(urllib.parse.quote(iri, safe=''), safe='')
        url = f"{self.api_base}/ontologies/ordo/terms/{encoded_iri}"

        try:
            with urllib.request.urlopen(url, timeout=10) as response:
                data = json.loads(response.read().decode('utf-8'))

            result = {
                'label': data.get('label', orpha_id),
                'description': data.get('description', [None])[0] if data.get('description') else None,
                'synonyms': data.get('synonyms', [])
            }

            self.cache[orpha_id] = result
            return result

        except urllib.error.HTTPError as e:
            if e.code == 404:
                # Try alternative Orphanet IRI format
                return self._try_alternative_lookup(orpha_id, numeric_id)
            return None
        except Exception as e:
            print(f"  ⚠ Failed to look up {orpha_id}: {e}")
            return None

    def _try_alternative_lookup(self, orpha_id: str, numeric_id: str) -> Optional[Dict]:
        """Try alternative ORPHA lookup methods."""
        # Could add additional lookup strategies here
        return None


def enrich_failed_terms(input_file: str, output_file: str):
    """Enrich OMIM and ORPHA terms that failed in previous enrichment."""

    print(f"Reading concepts from {input_file}...")
    with open(input_file, 'r') as f:
        concepts = json.load(f)

    omim_enricher = OMIMEnricher()
    orpha_enricher = ORPHAEnricher()

    enriched_count = 0
    failed_count = 0

    print(f"Processing {len(concepts)} concepts...")

    for i, concept in enumerate(concepts):
        term = concept['term']

        # Skip if already enriched
        if concept['name'] != term:
            continue

        # Try OMIM
        if term.startswith('OMIM:'):
            omim_enricher.stats['total'] += 1
            data = omim_enricher.lookup_omim(term)

            if data:
                concept['name'] = data['label']
                concept['synonyms'] = list(set(concept.get('synonyms', []) + data.get('synonyms', []) + [term]))

                if data.get('description'):
                    if 'metadata' not in concept:
                        concept['metadata'] = {}
                    concept['metadata']['description'] = data['description']

                omim_enricher.stats['enriched'] += 1
                enriched_count += 1
            else:
                omim_enricher.stats['failed'] += 1
                failed_count += 1

        # Try ORPHA
        elif term.startswith('ORPHA:') or term.startswith('Orphanet:'):
            orpha_enricher.stats['total'] += 1
            data = orpha_enricher.lookup_orpha(term)

            if data:
                concept['name'] = data['label']
                concept['synonyms'] = list(set(concept.get('synonyms', []) + data.get('synonyms', []) + [term]))

                if data.get('description'):
                    if 'metadata' not in concept:
                        concept['metadata'] = {}
                    concept['metadata']['description'] = data['description']

                orpha_enricher.stats['enriched'] += 1
                enriched_count += 1
            else:
                orpha_enricher.stats['failed'] += 1
                failed_count += 1

        # Progress
        if (i + 1) % 50 == 0:
            print(f"  Progress: {i + 1}/{len(concepts)} ({enriched_count} new enrichments)")

        # Rate limiting
        if enriched_count % 50 == 0 and enriched_count > 0:
            time.sleep(1)

    # Save
    print(f"\nWriting enriched concepts to {output_file}...")
    with open(output_file, 'w') as f:
        json.dump(concepts, f, indent=2)

    # Print stats
    print("\n=== ENRICHMENT STATISTICS ===")
    print(f"\nOMIM:")
    print(f"  Total: {omim_enricher.stats['total']}")
    print(f"  Enriched: {omim_enricher.stats['enriched']}")
    print(f"  Failed: {omim_enricher.stats['failed']}")

    print(f"\nORPHA:")
    print(f"  Total: {orpha_enricher.stats['total']}")
    print(f"  Enriched: {orpha_enricher.stats['enriched']}")
    print(f"  Failed: {orpha_enricher.stats['failed']}")

    print(f"\n✓ Enriched concepts saved to {output_file}")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Enrich OMIM and ORPHA terms")
    parser.add_argument("--input", default="concepts-enriched.json", help="Input file")
    parser.add_argument("--output", default="concepts-fully-enriched.json", help="Output file")

    args = parser.parse_args()

    enrich_failed_terms(args.input, args.output)
