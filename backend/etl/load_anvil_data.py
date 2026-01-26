#!/usr/bin/env python3
"""
Load AnVIL data from the explore API into OpenSearch.

Usage:
    python load_anvil_data.py                    # Load all entities
    python load_anvil_data.py --entity datasets  # Load only datasets
    python load_anvil_data.py --entity donors    # Load only donors
    python load_anvil_data.py --dry-run          # Fetch but don't load
"""

import argparse
import logging
import sys
from datetime import datetime
from typing import Any, Optional

import httpx
from opensearchpy import OpenSearch
from opensearchpy.helpers import bulk

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# AnVIL API configuration
BASE_URL = "https://service.explore.anvilproject.org/index"
CATALOG = "anvil12"
PAGE_SIZE = 250

# Index configurations
INDEX_CONFIGS = {
    "datasets": {
        "index_name": "anvil_datasets",
        "id_field": "dataset_id",
        "mappings": {
            "dataset_id": {"type": "keyword"},
            "title": {"type": "text", "fields": {"keyword": {"type": "keyword"}}},
            "description": {"type": "text"},
            "consent_group": {"type": "keyword"},
            "data_use_permission": {"type": "keyword"},
            "principal_investigator": {"type": "keyword"},
            "registered_identifier": {"type": "keyword"},
            "duos_id": {"type": "keyword"},
            "accessible": {"type": "boolean"},
            "created_at": {"type": "date"},
            "updated_at": {"type": "date"},
        },
    },
    "donors": {
        "index_name": "anvil_donors",
        "id_field": "donor_id",
        "mappings": {
            "donor_id": {"type": "keyword"},
            "dataset_id": {"type": "keyword"},
            "organism_type": {"type": "keyword"},
            "phenotypic_sex": {"type": "keyword"},
            "reported_ethnicity": {"type": "keyword"},
            "genetic_ancestry": {"type": "keyword"},
            "accessible": {"type": "boolean"},
            "created_at": {"type": "date"},
            "updated_at": {"type": "date"},
        },
    },
    "biosamples": {
        "index_name": "anvil_biosamples",
        "id_field": "biosample_id",
        "mappings": {
            "biosample_id": {"type": "keyword"},
            "donor_id": {"type": "keyword"},
            "dataset_id": {"type": "keyword"},
            "anatomical_site": {"type": "keyword"},
            "biosample_type": {"type": "keyword"},
            "disease": {"type": "keyword"},
            "donor_age_at_collection_lower_bound": {"type": "integer"},
            "donor_age_at_collection_upper_bound": {"type": "integer"},
            "donor_age_at_collection_unit": {"type": "keyword"},
            "accessible": {"type": "boolean"},
            "created_at": {"type": "date"},
            "updated_at": {"type": "date"},
        },
    },
    "files": {
        "index_name": "anvil_files",
        "id_field": "file_id",
        "mappings": {
            "file_id": {"type": "keyword"},
            "file_name": {"type": "text", "fields": {"keyword": {"type": "keyword"}}},
            "file_format": {"type": "keyword"},
            "file_size": {"type": "long"},
            "file_type": {"type": "keyword"},
            "data_modality": {"type": "keyword"},
            "reference_assembly": {"type": "keyword"},
            "is_supplementary": {"type": "boolean"},
            "dataset_id": {"type": "keyword"},
            "biosample_id": {"type": "keyword"},
            "donor_id": {"type": "keyword"},
            "accessible": {"type": "boolean"},
            "created_at": {"type": "date"},
            "updated_at": {"type": "date"},
        },
    },
    "activities": {
        "index_name": "anvil_activities",
        "id_field": "activity_id",
        "mappings": {
            "activity_id": {"type": "keyword"},
            "activity_type": {"type": "keyword"},
            "assay_type": {"type": "keyword"},
            "data_modality": {"type": "keyword"},
            "reference_assembly": {"type": "keyword"},
            "dataset_id": {"type": "keyword"},
            "accessible": {"type": "boolean"},
            "created_at": {"type": "date"},
            "updated_at": {"type": "date"},
        },
    },
}


def get_first_or_none(value: Any, key: Optional[str] = None) -> Any:
    """Extract first element from list, optionally getting a nested key.

    If value is not a list (e.g., a boolean), return it directly.
    """
    if value is None:
        return None
    if not isinstance(value, list):
        return value  # Return non-list values directly (e.g., booleans)
    if not value:
        return None
    first = value[0]
    if key and isinstance(first, dict):
        return first.get(key)
    return first


def transform_dataset(hit: dict[str, Any]) -> Optional[dict[str, Any]]:
    """Transform a dataset hit into a record."""
    datasets = hit.get("datasets", [])
    if not datasets:
        return None
    ds = datasets[0]
    return {
        "dataset_id": ds.get("dataset_id") or hit.get("entryId"),
        "title": ds.get("title", ""),
        "description": ds.get("description", ""),
        "consent_group": get_first_or_none(ds.get("consent_group")),
        "data_use_permission": get_first_or_none(ds.get("data_use_permission")),
        "principal_investigator": get_first_or_none(ds.get("principal_investigator")),
        "registered_identifier": get_first_or_none(ds.get("registered_identifier")),
        "duos_id": ds.get("duos_id"),
        "accessible": ds.get("accessible", False),
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
    }


def transform_donor(hit: dict[str, Any]) -> Optional[dict[str, Any]]:
    """Transform a donor hit into a record."""
    donors = hit.get("donors", [])
    if not donors:
        return None
    d = donors[0]
    datasets = hit.get("datasets", [])
    return {
        "donor_id": d.get("donor_id") or hit.get("entryId"),
        "dataset_id": get_first_or_none(datasets, "dataset_id"),
        "organism_type": d.get("organism_type"),
        "phenotypic_sex": d.get("phenotypic_sex"),
        "reported_ethnicity": get_first_or_none(d.get("reported_ethnicity")),
        "genetic_ancestry": get_first_or_none(d.get("genetic_ancestry")),
        "accessible": d.get("accessible", False),
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
    }


def transform_biosample(hit: dict[str, Any]) -> Optional[dict[str, Any]]:
    """Transform a biosample hit into a record."""
    biosamples = hit.get("biosamples", [])
    if not biosamples:
        return None
    bs = biosamples[0]
    donors = hit.get("donors", [])
    datasets = hit.get("datasets", [])
    age_range = bs.get("donor_age_at_collection", {}) or {}
    return {
        "biosample_id": bs.get("biosample_id") or hit.get("entryId"),
        "donor_id": get_first_or_none(donors, "donor_id"),
        "dataset_id": get_first_or_none(datasets, "dataset_id"),
        "anatomical_site": bs.get("anatomical_site"),
        "biosample_type": bs.get("biosample_type"),
        "disease": bs.get("disease"),
        "donor_age_at_collection_lower_bound": age_range.get("gte"),
        "donor_age_at_collection_upper_bound": age_range.get("lte"),
        "donor_age_at_collection_unit": bs.get("donor_age_at_collection_unit"),
        "accessible": bs.get("accessible", False),
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
    }


def transform_file(hit: dict[str, Any]) -> list[dict[str, Any]]:
    """
    Transform a file hit into records.

    Note: Files are aggregated in the API response. Each 'file' entry
    represents a group of files with the same format. We create one
    record per file group with the count.
    """
    files = hit.get("files", [])
    if not files:
        return []

    donors = hit.get("donors", [])
    datasets = hit.get("datasets", [])
    biosamples = hit.get("biosamples", [])

    records = []
    for f in files:
        # Generate a composite ID since individual file IDs aren't in this endpoint
        file_format = get_first_or_none(f.get("file_format")) or "unknown"
        entry_id = hit.get("entryId", "")
        file_id = f"{entry_id}_{file_format}"

        records.append(
            {
                "file_id": file_id,
                "file_format": file_format,
                "file_size": f.get("file_size"),
                "file_count": f.get("count", 1),
                "data_modality": get_first_or_none(f.get("data_modality")),
                "reference_assembly": get_first_or_none(f.get("reference_assembly")),
                "is_supplementary": get_first_or_none(f.get("is_supplementary")),
                "dataset_id": get_first_or_none(datasets, "dataset_id"),
                "biosample_id": get_first_or_none(biosamples, "biosample_id"),
                "donor_id": get_first_or_none(donors, "donor_id"),
                "accessible": True,
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat(),
            }
        )
    return records


def transform_activity(hit: dict[str, Any]) -> list[dict[str, Any]]:
    """Transform activity hit into records."""
    activities = hit.get("activities", [])
    if not activities:
        return []

    datasets = hit.get("datasets", [])
    records = []

    for i, act in enumerate(activities):
        activity_id = f"{hit.get('entryId', '')}_{i}"
        records.append(
            {
                "activity_id": activity_id,
                "activity_type": get_first_or_none(act.get("activity_type")),
                "assay_type": get_first_or_none(act.get("assay_type")),
                "data_modality": get_first_or_none(act.get("data_modality")),
                "reference_assembly": None,
                "dataset_id": get_first_or_none(datasets, "dataset_id"),
                "accessible": True,
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat(),
            }
        )
    return records


TRANSFORMERS = {
    "datasets": transform_dataset,
    "donors": transform_donor,
    "biosamples": transform_biosample,
    "files": transform_file,
    "activities": transform_activity,
}


def fetch_all(
    entity: str,
    http_client: httpx.Client,
    max_pages: Optional[int] = None,
) -> list[dict[str, Any]]:
    """
    Fetch all records for an entity from the AnVIL API.

    @param entity - Entity type to fetch.
    @param http_client - HTTP client instance.
    @param max_pages - Maximum pages to fetch (for testing).
    @returns List of transformed records.
    """
    transformer = TRANSFORMERS.get(entity)
    if not transformer:
        raise ValueError(f"Unknown entity: {entity}")

    records = []
    url = f"{BASE_URL}/{entity}?catalog={CATALOG}&size={PAGE_SIZE}"
    page = 0

    while url:
        resp = http_client.get(url)
        resp.raise_for_status()
        data = resp.json()

        hits = data.get("hits", [])
        for hit in hits:
            result = transformer(hit)
            if result:
                if isinstance(result, list):
                    records.extend(result)
                else:
                    records.append(result)

        page += 1
        total = data.get("pagination", {}).get("total", "?")
        logger.info(
            f"  Page {page}: {len(hits)} hits, total fetched: {len(records)}/{total}"
        )

        if max_pages and page >= max_pages:
            logger.info(f"  Reached max_pages limit ({max_pages})")
            break

        url = data.get("pagination", {}).get("next")

    return records


def create_index(os_client: OpenSearch, entity: str) -> None:
    """Create OpenSearch index for an entity."""
    config = INDEX_CONFIGS[entity]
    index_name = config["index_name"]

    # Delete if exists
    os_client.indices.delete(index=index_name, ignore=[404])

    # Create with mappings
    os_client.indices.create(
        index=index_name,
        body={
            "settings": {"number_of_shards": 1, "number_of_replicas": 0},
            "mappings": {"properties": config["mappings"]},
        },
    )
    logger.info(f"Created index: {index_name}")


def load_records(
    os_client: OpenSearch,
    entity: str,
    records: list[dict[str, Any]],
) -> dict[str, int]:
    """Load records into OpenSearch."""
    config = INDEX_CONFIGS[entity]
    index_name = config["index_name"]
    id_field = config["id_field"]

    actions = [
        {
            "_index": index_name,
            "_id": record[id_field],
            "_source": record,
        }
        for record in records
        if record.get(id_field)
    ]

    success, failed = bulk(os_client, actions, raise_on_error=False, refresh=True)

    return {
        "success": success,
        "failed": len(failed) if isinstance(failed, list) else failed,
    }


def load_entity(
    entity: str,
    os_client: OpenSearch,
    http_client: httpx.Client,
    dry_run: bool = False,
    max_pages: Optional[int] = None,
) -> dict[str, Any]:
    """
    Load a single entity type from AnVIL API to OpenSearch.

    @param entity - Entity type to load.
    @param os_client - OpenSearch client.
    @param http_client - HTTP client.
    @param dry_run - If True, fetch but don't load.
    @param max_pages - Maximum pages to fetch.
    @returns Statistics dict.
    """
    logger.info(f"Loading {entity}...")

    # Fetch from API
    records = fetch_all(entity, http_client, max_pages)
    logger.info(f"Fetched {len(records)} {entity} records")

    if dry_run:
        logger.info("[DRY RUN] Skipping OpenSearch load")
        return {
            "entity": entity,
            "fetched": len(records),
            "loaded": 0,
            "dry_run": True,
        }

    # Create index and load
    create_index(os_client, entity)
    result = load_records(os_client, entity, records)

    # Get final count
    count = os_client.count(index=INDEX_CONFIGS[entity]["index_name"])["count"]

    logger.info(
        f"Loaded {entity}: {result['success']} success, {result['failed']} failed, "
        f"{count} unique documents (dedup from {len(records)} records)"
    )

    return {
        "entity": entity,
        "fetched": len(records),
        "loaded": count,
        "success": result["success"],
        "failed": result["failed"],
    }


def main() -> int:
    """Main entry point."""
    parser = argparse.ArgumentParser(description="Load AnVIL data into OpenSearch")
    parser.add_argument(
        "--entity",
        choices=list(INDEX_CONFIGS.keys()),
        help="Specific entity to load (default: all)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Fetch data but don't load into OpenSearch",
    )
    parser.add_argument(
        "--max-pages",
        type=int,
        help="Maximum pages to fetch per entity (for testing)",
    )
    parser.add_argument(
        "--opensearch-host",
        default="localhost",
        help="OpenSearch host (default: localhost)",
    )
    parser.add_argument(
        "--opensearch-port",
        type=int,
        default=9200,
        help="OpenSearch port (default: 9200)",
    )

    args = parser.parse_args()

    # Create clients
    http_client = httpx.Client(timeout=60)
    os_client = OpenSearch(
        hosts=[{"host": args.opensearch_host, "port": args.opensearch_port}]
    )

    try:
        # Determine which entities to load
        entities = [args.entity] if args.entity else list(INDEX_CONFIGS.keys())

        results = []
        for entity in entities:
            result = load_entity(
                entity,
                os_client,
                http_client,
                dry_run=args.dry_run,
                max_pages=args.max_pages,
            )
            results.append(result)

        # Print summary
        print("\n" + "=" * 60)
        print("SUMMARY")
        print("=" * 60)
        for r in results:
            if args.dry_run:
                print(f"  {r['entity']}: {r['fetched']} fetched (dry run)")
            else:
                print(
                    f"  {r['entity']}: {r['fetched']} fetched -> {r['loaded']} loaded"
                )

        return 0

    except Exception as e:
        logger.error(f"Error: {e}", exc_info=True)
        return 1
    finally:
        http_client.close()
        os_client.close()


if __name__ == "__main__":
    sys.exit(main())
