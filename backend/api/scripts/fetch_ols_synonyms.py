#!/usr/bin/env python3
"""
Fetch synonyms from OLS (Ontology Lookup Service) using EDAM IDs.

OLS API: https://www.ebi.ac.uk/ols4/api/
"""
import json
import requests
from urllib.parse import quote

CONCEPTS_FILE = (
    "/Users/dave/projects/findable-ui/backend/opensearch/concepts-with-synonyms.json"
)
OLS_BASE_URL = "https://www.ebi.ac.uk/ols4/api"


def get_edam_term(edam_id):
    """Fetch EDAM term from OLS.

    Args:
        edam_id: EDAM identifier (e.g., "data_3112")

    Returns:
        Dict with term info or None if not found
    """
    if not edam_id:
        return None

    # Build EDAM URI
    iri = f"http://edamontology.org/{edam_id}"

    # Double URL encode the IRI as required by OLS
    encoded_iri = quote(quote(iri, safe=""), safe="")

    url = f"{OLS_BASE_URL}/ontologies/edam/terms/{encoded_iri}"

    try:
        print(f"  Fetching {iri}...")
        response = requests.get(url, timeout=10)

        if response.status_code == 200:
            return response.json()
        elif response.status_code == 404:
            print(f"  ⚠️  Not found in OLS")
            return None
        else:
            print(f"  ⚠️  HTTP {response.status_code}")
            return None

    except Exception as e:
        print(f"  ⚠️  Error: {e}")
        return None


def extract_synonyms(ols_data):
    """Extract synonyms from OLS response.

    Args:
        ols_data: OLS API response dict

    Returns:
        List of synonym strings
    """
    synonyms = []

    # OLS stores synonyms in different fields
    if "synonyms" in ols_data:
        synonyms.extend(ols_data["synonyms"])

    # Some ontologies use annotation properties
    if "annotation" in ols_data:
        annotation = ols_data["annotation"]

        # Check common synonym properties
        for key in [
            "hasExactSynonym",
            "hasRelatedSynonym",
            "hasBroadSynonym",
            "hasNarrowSynonym",
        ]:
            if key in annotation:
                values = annotation[key]
                if isinstance(values, list):
                    synonyms.extend(values)
                else:
                    synonyms.append(values)

    # Also get the label as a synonym
    if "label" in ols_data:
        synonyms.append(ols_data["label"])

    # Get description for context (not added as synonym, just for info)
    description = ols_data.get("description", [])
    if description:
        desc_text = description[0] if isinstance(description, list) else description
        print(f"  Description: {desc_text[:100]}...")

    return list(set(synonyms))  # Remove duplicates


def add_ols_synonyms():
    """Add OLS synonyms to data modality concepts."""
    with open(CONCEPTS_FILE, "r") as f:
        concepts = json.load(f)

    updated_count = 0
    total_new_synonyms = 0

    for concept in concepts:
        if concept.get("facet_name") != "files.data_modality":
            continue

        if "ontology" not in concept or "edam" not in concept["ontology"]:
            continue

        edam_id = concept["ontology"]["edam"]["id"]
        if not edam_id:
            continue

        print(f"\n{concept['display_name']}")
        print(f"  EDAM ID: {edam_id}")

        # Fetch from OLS
        ols_data = get_edam_term(edam_id)
        if not ols_data:
            continue

        # Extract synonyms
        ols_synonyms = extract_synonyms(ols_data)
        print(f"  Found {len(ols_synonyms)} OLS synonyms: {ols_synonyms}")

        # Add new synonyms (lowercase for consistency)
        existing_synonyms_lower = [s.lower() for s in concept["synonyms"]]
        new_synonyms = []

        for syn in ols_synonyms:
            syn_lower = syn.lower()
            if syn_lower not in existing_synonyms_lower:
                new_synonyms.append(syn_lower)
                concept["synonyms"].append(syn_lower)

        if new_synonyms:
            print(f"  ✓ Added {len(new_synonyms)} new synonyms: {new_synonyms}")
            updated_count += 1
            total_new_synonyms += len(new_synonyms)
        else:
            print(f"  ℹ️  No new synonyms (all already present)")

    # Write back
    with open(CONCEPTS_FILE, "w") as f:
        json.dump(concepts, f, indent=2)

    print(f"\n{'='*60}")
    print(f"✓ Updated {updated_count} concepts")
    print(f"✓ Added {total_new_synonyms} new synonyms from OLS")
    print(f"✓ Saved to {CONCEPTS_FILE}")


if __name__ == "__main__":
    add_ols_synonyms()
