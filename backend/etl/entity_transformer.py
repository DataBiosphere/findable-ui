"""
Entity transformer for normalizing AnVIL API data.

Transforms raw AnVIL API responses into normalized entity records suitable
for indexing in OpenSearch.

Each entity type is fetched from its own Azul endpoint (``/index/files``,
``/index/donors``, etc.) which returns the entity's native fields plus
cross-entity aggregation arrays.  This transformer extracts native fields
with real IDs and flattens cross-entity arrays into prefixed keyword fields
(e.g. ``donor_phenotypic_sex``, ``diagnosis_disease``) so that a single
index can be filtered across entity boundaries.

Datasets are still fetched from ``/index/datasets`` using the original
``_extract_datasets()`` logic.
"""

import logging
from datetime import datetime
from typing import Any, Optional

logger = logging.getLogger(__name__)

# Maps source entity -> {source_field: target_field} for cross-entity fields.
CROSS_ENTITY_FIELDS: dict[str, dict[str, str]] = {
    "donors": {
        "organism_type": "donor_organism_type",
        "phenotypic_sex": "donor_phenotypic_sex",
        "reported_ethnicity": "donor_reported_ethnicity",
        "genetic_ancestry": "donor_genetic_ancestry",
    },
    "biosamples": {
        "anatomical_site": "biosample_anatomical_site",
        "biosample_type": "biosample_biosample_type",
        "disease": "biosample_disease",
    },
    "activities": {
        "activity_type": "activity_activity_type",
    },
    "diagnoses": {
        "disease": "diagnosis_disease",
        "phenotype": "diagnosis_phenotype",
    },
}

# Maps target entity -> list of source entity keys from CROSS_ENTITY_FIELDS.
ENTITY_CROSS_SOURCES: dict[str, list[str]] = {
    "files": ["donors", "biosamples", "activities", "diagnoses"],
    "donors": ["biosamples", "diagnoses"],
    "biosamples": ["donors", "diagnoses"],
    "activities": ["donors", "biosamples", "diagnoses"],
}


class EntityTransformer:
    """
    Transforms raw AnVIL API data into normalized entity records.

    Per-entity endpoints return hits with native fields and cross-entity
    aggregation arrays.  ``transform_entity_hit`` extracts native fields
    (with real IDs), adds cross-entity keyword fields, and attaches the
    parent ``dataset_id``.
    """

    def __init__(self, scope: str = "anvil"):
        """
        Initialize the transformer.

        @param scope - Configuration scope for field mappings.
        """
        self.scope = scope
        self._now = datetime.utcnow().isoformat()

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def transform_entity_hit(
        self, entity_name: str, hit: dict[str, Any]
    ) -> Optional[dict[str, Any]]:
        """
        Transform a single per-entity API hit into a record.

        Dispatches to the native extractor for *entity_name*, adds
        cross-entity keyword fields, and attaches ``dataset_id``.

        @param entity_name - Entity type (files, donors, biosamples, activities).
        @param hit - Raw API hit from the per-entity endpoint.
        @returns Normalized record, or None if no native data found.
        """
        extractors = {
            "files": self._extract_file_native,
            "donors": self._extract_donor_native,
            "biosamples": self._extract_biosample_native,
            "activities": self._extract_activity_native,
        }

        extractor = extractors.get(entity_name)
        if extractor is None:
            logger.warning(f"No native extractor for entity: {entity_name}")
            return None

        record = extractor(hit)
        if record is None:
            return None

        # Add cross-entity fields
        self._add_cross_entity_fields(record, hit, entity_name)

        # Attach dataset_id
        record["dataset_id"] = self._extract_dataset_id(hit)

        # Timestamps
        record["created_at"] = self._now
        record["updated_at"] = self._now

        return record

    def _extract_datasets(self, hit: dict[str, Any]) -> list[dict[str, Any]]:
        """
        Extract dataset records from a /index/datasets hit.

        Merges disease and phenotype values from the hit's diagnoses array
        onto the dataset record so they can be queried as dataset facets.

        @param hit - Raw API hit.
        @returns List of dataset records.
        """
        # Collect disease/phenotype from the diagnoses array
        disease_values: list[Any] = []
        phenotype_values: list[Any] = []
        for dx in hit.get("diagnoses", []):
            dv = self._unwrap(dx.get("disease"))
            if dv is not None:
                if isinstance(dv, list):
                    disease_values.extend(dv)
                else:
                    disease_values.append(dv)
            pv = self._unwrap(dx.get("phenotype"))
            if pv is not None:
                if isinstance(pv, list):
                    phenotype_values.extend(pv)
                else:
                    phenotype_values.append(pv)

        disease = disease_values if disease_values else None
        phenotype = phenotype_values if phenotype_values else None

        datasets = []

        for ds in hit.get("datasets", []):
            dataset_id = ds.get("dataset_id")
            if dataset_id:
                datasets.append(
                    {
                        "dataset_id": dataset_id,
                        "title": ds.get("title", ""),
                        "description": ds.get("description", ""),
                        "consent_group": self._unwrap(ds.get("consent_group")),
                        "data_use_permission": self._unwrap(
                            ds.get("data_use_permission")
                        ),
                        "principal_investigator": self._unwrap(
                            ds.get("principal_investigator")
                        ),
                        "registered_identifier": self._unwrap(
                            ds.get("registered_identifier")
                        ),
                        "duos_id": ds.get("duos_id"),
                        "disease": disease,
                        "phenotype": phenotype,
                        "created_at": self._now,
                        "updated_at": self._now,
                    }
                )

        return datasets

    def deduplicate_entities(
        self, entities: dict[str, list[dict[str, Any]]]
    ) -> dict[str, list[dict[str, Any]]]:
        """
        Remove duplicate entity records based on their ID field.

        @param entities - Dict mapping entity names to lists of records.
        @returns Deduplicated entity dict.
        """
        id_fields = {
            "datasets": "dataset_id",
            "donors": "donor_id",
            "biosamples": "biosample_id",
            "files": "file_id",
            "activities": "activity_id",
        }

        result = {}
        for entity_name, records in entities.items():
            id_field = id_fields.get(entity_name, "id")
            seen: set[str] = set()
            unique: list[dict[str, Any]] = []

            for record in records:
                record_id = record.get(id_field)
                if record_id and record_id not in seen:
                    seen.add(record_id)
                    unique.append(record)

            result[entity_name] = unique

        return result

    # ------------------------------------------------------------------
    # Native extractors (per-entity endpoint hits)
    # ------------------------------------------------------------------

    def _extract_file_native(self, hit: dict[str, Any]) -> Optional[dict[str, Any]]:
        """
        Extract native file fields from a /index/files hit.

        @param hit - Raw API hit.
        @returns File record with native fields, or None.
        """
        files = hit.get("files", [])
        if not files:
            return None
        f = files[0]
        return {
            "file_id": f.get("file_id") or hit.get("entryId"),
            "file_format": self._unwrap(f.get("file_format")),
            "file_size": f.get("file_size"),
            "file_name": self._unwrap(f.get("file_name")),
            "file_type": self._unwrap(f.get("file_type")),
            "data_modality": self._unwrap(f.get("data_modality")),
            "reference_assembly": self._unwrap(f.get("reference_assembly")),
            "is_supplementary": self._unwrap(f.get("is_supplementary")),
            "drs_uri": self._unwrap(f.get("drs_uri")),
        }

    def _extract_donor_native(self, hit: dict[str, Any]) -> Optional[dict[str, Any]]:
        """
        Extract native donor fields from a /index/donors hit.

        @param hit - Raw API hit.
        @returns Donor record with native fields, or None.
        """
        donors = hit.get("donors", [])
        if not donors:
            return None
        d = donors[0]
        return {
            "donor_id": d.get("donor_id") or hit.get("entryId"),
            "organism_type": self._unwrap(d.get("organism_type")),
            "phenotypic_sex": self._unwrap(d.get("phenotypic_sex")),
            "reported_ethnicity": self._unwrap(d.get("reported_ethnicity")),
            "genetic_ancestry": self._unwrap(d.get("genetic_ancestry")),
        }

    def _extract_biosample_native(
        self, hit: dict[str, Any]
    ) -> Optional[dict[str, Any]]:
        """
        Extract native biosample fields from a /index/biosamples hit.

        @param hit - Raw API hit.
        @returns Biosample record with native fields, or None.
        """
        biosamples = hit.get("biosamples", [])
        if not biosamples:
            return None
        bs = biosamples[0]
        age_range = bs.get("donor_age_at_collection", {}) or {}
        return {
            "biosample_id": bs.get("biosample_id") or hit.get("entryId"),
            "anatomical_site": self._unwrap(bs.get("anatomical_site")),
            "biosample_type": self._unwrap(bs.get("biosample_type")),
            "disease": self._unwrap(bs.get("disease")),
            "donor_age_at_collection_lower_bound": age_range.get("gte"),
            "donor_age_at_collection_upper_bound": age_range.get("lte"),
            "donor_age_at_collection_unit": self._unwrap(
                bs.get("donor_age_at_collection_unit")
            ),
        }

    def _extract_activity_native(self, hit: dict[str, Any]) -> Optional[dict[str, Any]]:
        """
        Extract native activity fields from a /index/activities hit.

        @param hit - Raw API hit.
        @returns Activity record with native fields, or None.
        """
        activities = hit.get("activities", [])
        if not activities:
            return None
        act = activities[0]
        return {
            "activity_id": act.get("activity_id") or hit.get("entryId"),
            "activity_type": self._unwrap(act.get("activity_type")),
            "assay_type": self._unwrap(act.get("assay_type")),
            "data_modality": self._unwrap(act.get("data_modality")),
            "reference_assembly": self._unwrap(act.get("reference_assembly")),
        }

    # ------------------------------------------------------------------
    # Cross-entity helpers
    # ------------------------------------------------------------------

    def _add_cross_entity_fields(
        self, record: dict[str, Any], hit: dict[str, Any], entity_name: str
    ) -> None:
        """
        Populate cross-entity keyword fields on *record*.

        For each source entity configured in ``ENTITY_CROSS_SOURCES``,
        iterates over the aggregation array in *hit*, unwraps each
        source field, deduplicates, and stores the result as the prefixed
        target field.

        @param record - Mutable record to update.
        @param hit - Raw API hit containing cross-entity arrays.
        @param entity_name - The target entity being built.
        """
        sources = ENTITY_CROSS_SOURCES.get(entity_name, [])

        for source_entity in sources:
            field_mapping = CROSS_ENTITY_FIELDS.get(source_entity, {})
            source_items = hit.get(source_entity, [])

            for source_field, target_field in field_mapping.items():
                collected: list[Any] = []

                for item in source_items:
                    val = self._unwrap(item.get(source_field))
                    if val is None:
                        continue
                    if isinstance(val, list):
                        collected.extend(val)
                    else:
                        collected.append(val)

                # Deduplicate while preserving order
                seen: set[Any] = set()
                deduped: list[Any] = []
                for v in collected:
                    if v not in seen:
                        seen.add(v)
                        deduped.append(v)

                if not deduped:
                    record[target_field] = None
                elif len(deduped) == 1:
                    record[target_field] = deduped[0]
                else:
                    record[target_field] = deduped

    def _extract_dataset_id(self, hit: dict[str, Any]) -> Optional[str]:
        """
        Extract dataset_id from a per-entity hit.

        The hit's ``datasets`` array contains the parent dataset(s).

        @param hit - Raw API hit.
        @returns Dataset ID string, or None.
        """
        datasets = hit.get("datasets", [])
        if not datasets:
            return None
        ds = datasets[0]
        raw = ds.get("dataset_id")
        return self._unwrap(raw) if isinstance(raw, list) else raw

    # ------------------------------------------------------------------
    # Utility
    # ------------------------------------------------------------------

    def _unwrap(self, value: Any) -> Any:
        """
        Unwrap array fields from the Azul API response.

        Single-element arrays become scalars, null-only arrays become None,
        and multi-element arrays are kept with nulls filtered out.

        @param value - Value that may be a list, scalar, or None.
        @returns Unwrapped value.
        """
        if not isinstance(value, list):
            return value
        non_null = [v for v in value if v is not None]
        if not non_null:
            return None
        if len(non_null) == 1:
            return non_null[0]
        return non_null
