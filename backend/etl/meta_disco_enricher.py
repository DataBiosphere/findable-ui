"""
Meta-disco enrichment for entity records.

Merges additional metadata from meta-disco JSON files into entity records.
"""

import json
import logging
from pathlib import Path
from typing import Any, Optional

logger = logging.getLogger(__name__)


class MetaDiscoEnricher:
    """
    Enriches entity records with metadata from meta-disco.

    Meta-disco provides additional annotations like data_modality, assay_type,
    and data_type that aren't available in the base AnVIL API data.
    """

    def __init__(self, enrichment_file: Optional[Path] = None):
        """
        Initialize the enricher.

        @param enrichment_file - Path to meta-disco JSON file.
        """
        self.enrichment_file = enrichment_file
        self._enrichments: Optional[dict[str, dict[str, Any]]] = None
        self._loaded = False

    def load(self) -> None:
        """
        Load enrichment data from file.

        @raises FileNotFoundError - If enrichment file doesn't exist.
        @raises json.JSONDecodeError - If file isn't valid JSON.
        """
        if self._loaded:
            return

        if self.enrichment_file is None:
            logger.warning("No enrichment file configured, skipping load")
            self._enrichments = {}
            self._loaded = True
            return

        if not self.enrichment_file.exists():
            raise FileNotFoundError(
                f"Enrichment file not found: {self.enrichment_file}"
            )

        logger.info(f"Loading enrichments from {self.enrichment_file}")

        with open(self.enrichment_file) as f:
            data = json.load(f)

        # Build lookup index by file_id
        self._enrichments = self._build_index(data)
        self._loaded = True

        logger.info(f"Loaded {len(self._enrichments)} enrichment records")

    def _build_index(self, data: Any) -> dict[str, dict[str, Any]]:
        """
        Build lookup index from enrichment data.

        @param data - Raw JSON data from meta-disco file.
        @returns Dict mapping file_id to enrichment data.
        """
        index: dict[str, dict[str, Any]] = {}

        # Handle different possible data formats
        if isinstance(data, list):
            # List of records with file_id key
            for record in data:
                file_id = record.get("file_id")
                if file_id:
                    index[file_id] = record
        elif isinstance(data, dict):
            # Dict already keyed by file_id, or nested structure
            if "files" in data:
                return self._build_index(data["files"])
            for key, value in data.items():
                if isinstance(value, dict):
                    index[key] = value

        return index

    def enrich_file(self, file_record: dict[str, Any]) -> dict[str, Any]:
        """
        Enrich a single file record with meta-disco data.

        @param file_record - File record to enrich.
        @returns Enriched file record.
        """
        if not self._loaded:
            self.load()

        # Get the file ID from the record
        file_id = file_record.get("file_id")
        if not file_id:
            return file_record

        # Look up enrichment data
        enrichment = self._enrichments.get(file_id, {})

        if not enrichment:
            return file_record

        # Merge enrichment fields
        enriched = file_record.copy()
        enrichment_fields = ["data_modality", "assay_type", "data_type"]

        for field in enrichment_fields:
            if field in enrichment and enrichment[field]:
                enriched[field] = enrichment[field]

        return enriched

    def enrich_files(self, file_records: list[dict[str, Any]]) -> list[dict[str, Any]]:
        """
        Enrich multiple file records.

        @param file_records - List of file records to enrich.
        @returns List of enriched file records.
        """
        return [self.enrich_file(record) for record in file_records]

    def get_stats(self) -> dict[str, int]:
        """
        Get statistics about loaded enrichments.

        @returns Dict with counts of enrichments by field.
        """
        if not self._loaded:
            self.load()

        stats = {
            "total_records": len(self._enrichments),
            "with_data_modality": 0,
            "with_assay_type": 0,
            "with_data_type": 0,
        }

        for enrichment in self._enrichments.values():
            if enrichment.get("data_modality"):
                stats["with_data_modality"] += 1
            if enrichment.get("assay_type"):
                stats["with_assay_type"] += 1
            if enrichment.get("data_type"):
                stats["with_data_type"] += 1

        return stats


class MockMetaDiscoEnricher(MetaDiscoEnricher):
    """
    Mock enricher for testing.

    Allows setting enrichment data directly without loading from file.
    """

    def __init__(self, enrichments: Optional[dict[str, dict[str, Any]]] = None):
        """
        Initialize mock enricher with enrichment data.

        @param enrichments - Dict mapping file_id to enrichment data.
        """
        super().__init__()
        self._enrichments = enrichments or {}
        self._loaded = True
