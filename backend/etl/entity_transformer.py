"""
Entity transformer for normalizing AnVIL API data.

Transforms raw AnVIL API responses into normalized entity records
suitable for indexing in OpenSearch.
"""

import logging
import uuid
from datetime import datetime
from typing import Any, Optional

logger = logging.getLogger(__name__)


class EntityTransformer:
    """
    Transforms raw AnVIL API data into normalized entity records.

    The AnVIL API returns denormalized data where each "hit" contains nested
    data across multiple entity types. This transformer extracts and normalizes
    individual entity records.
    """

    def __init__(self, scope: str = "anvil"):
        """
        Initialize the transformer.

        @param scope - Configuration scope for field mappings.
        """
        self.scope = scope
        self._now = datetime.utcnow().isoformat()

    def transform_hit(self, hit: dict[str, Any]) -> dict[str, list[dict[str, Any]]]:
        """
        Transform a single API hit into multiple entity records.

        @param hit - Raw API hit containing nested entity data.
        @returns Dict mapping entity names to lists of extracted records.
        """
        result: dict[str, list[dict[str, Any]]] = {
            "datasets": [],
            "donors": [],
            "biosamples": [],
            "files": [],
            "diagnoses": [],
            "activities": [],
        }

        # Extract dataset info (usually one per hit)
        datasets = self._extract_datasets(hit)
        result["datasets"].extend(datasets)

        # Get dataset_id for linking
        dataset_id = datasets[0]["dataset_id"] if datasets else None

        # Extract nested entities
        donors = self._extract_donors(hit, dataset_id)
        result["donors"].extend(donors)

        biosamples = self._extract_biosamples(hit, dataset_id)
        result["biosamples"].extend(biosamples)

        files = self._extract_files(hit, dataset_id)
        result["files"].extend(files)

        diagnoses = self._extract_diagnoses(hit)
        result["diagnoses"].extend(diagnoses)

        activities = self._extract_activities(hit, dataset_id)
        result["activities"].extend(activities)

        return result

    def _extract_datasets(self, hit: dict[str, Any]) -> list[dict[str, Any]]:
        """
        Extract dataset records from a hit.

        @param hit - Raw API hit.
        @returns List of dataset records.
        """
        datasets = []

        # Datasets may be in different locations depending on API structure
        sources = hit.get("sources", [])
        for source in sources:
            dataset_id = source.get("id") or source.get("source_id")
            if dataset_id:
                datasets.append(
                    {
                        "dataset_id": dataset_id,
                        "title": source.get("source_name", ""),
                        "description": source.get("description", ""),
                        "consent_group": source.get("consent_group"),
                        "data_use_permission": source.get("data_use_permission"),
                        "principal_investigator": source.get("principal_investigator"),
                        "source_repository": source.get("source_repository"),
                        "registered_identifier": source.get("registered_identifier"),
                        "duos_id": source.get("duos_id"),
                        "created_at": self._now,
                        "updated_at": self._now,
                    }
                )

        # Also check for project-level dataset info
        project_info = hit.get("projects", [])
        for project in project_info:
            dataset_id = project.get("project_id")
            if dataset_id and not any(d["dataset_id"] == dataset_id for d in datasets):
                datasets.append(
                    {
                        "dataset_id": dataset_id,
                        "title": project.get("project_title", ""),
                        "description": project.get("project_description", ""),
                        "consent_group": project.get("consent_group"),
                        "created_at": self._now,
                        "updated_at": self._now,
                    }
                )

        return datasets

    def _extract_donors(
        self, hit: dict[str, Any], dataset_id: Optional[str]
    ) -> list[dict[str, Any]]:
        """
        Extract donor records from a hit.

        @param hit - Raw API hit.
        @param dataset_id - ID of parent dataset.
        @returns List of donor records.
        """
        donors = []

        donor_data = hit.get("donors", [])
        for donor in donor_data:
            donor_id = donor.get("donor_id")
            if donor_id:
                donors.append(
                    {
                        "donor_id": donor_id,
                        "dataset_id": dataset_id,
                        "organism_type": donor.get("organism_type"),
                        "phenotypic_sex": donor.get("phenotypic_sex"),
                        "reported_ethnicity": self._normalize_list(
                            donor.get("reported_ethnicity")
                        ),
                        "genetic_ancestry": self._normalize_list(
                            donor.get("genetic_ancestry")
                        ),
                        "created_at": self._now,
                        "updated_at": self._now,
                    }
                )

        return donors

    def _extract_biosamples(
        self, hit: dict[str, Any], dataset_id: Optional[str]
    ) -> list[dict[str, Any]]:
        """
        Extract biosample records from a hit.

        @param hit - Raw API hit.
        @param dataset_id - ID of parent dataset.
        @returns List of biosample records.
        """
        biosamples = []

        biosample_data = hit.get("biosamples", [])
        for biosample in biosample_data:
            biosample_id = biosample.get("biosample_id")
            if biosample_id:
                biosamples.append(
                    {
                        "biosample_id": biosample_id,
                        "donor_id": biosample.get("donor_id"),
                        "dataset_id": dataset_id,
                        "anatomical_site": biosample.get("anatomical_site"),
                        "biosample_type": biosample.get("biosample_type"),
                        "disease": self._normalize_list(biosample.get("disease")),
                        "donor_age_at_collection_lower_bound": biosample.get(
                            "donor_age_at_collection_lower_bound"
                        ),
                        "donor_age_at_collection_upper_bound": biosample.get(
                            "donor_age_at_collection_upper_bound"
                        ),
                        "donor_age_at_collection_unit": biosample.get(
                            "donor_age_at_collection_unit"
                        ),
                        "created_at": self._now,
                        "updated_at": self._now,
                    }
                )

        return biosamples

    def _extract_files(
        self, hit: dict[str, Any], dataset_id: Optional[str]
    ) -> list[dict[str, Any]]:
        """
        Extract file records from a hit.

        @param hit - Raw API hit.
        @param dataset_id - ID of parent dataset.
        @returns List of file records.
        """
        files = []

        file_data = hit.get("files", [])
        for file in file_data:
            file_id = file.get("file_id") or file.get("uuid")
            if file_id:
                files.append(
                    {
                        "file_id": file_id,
                        "file_name": file.get("file_name", file.get("name", "")),
                        "file_format": file.get("file_format", file.get("format")),
                        "file_size": file.get("file_size", file.get("size")),
                        "file_type": file.get("file_type"),
                        "drs_uri": file.get("drs_uri"),
                        "is_supplementary": file.get("is_supplementary", False),
                        "dataset_id": dataset_id,
                        "biosample_id": file.get("biosample_id"),
                        "donor_id": file.get("donor_id"),
                        "activity_id": file.get("activity_id"),
                        # Meta-disco fields (may be added by enricher)
                        "data_modality": file.get("data_modality"),
                        "assay_type": file.get("assay_type"),
                        "data_type": file.get("data_type"),
                        "created_at": self._now,
                        "updated_at": self._now,
                    }
                )

        return files

    def _extract_diagnoses(self, hit: dict[str, Any]) -> list[dict[str, Any]]:
        """
        Extract diagnosis records from a hit.

        @param hit - Raw API hit.
        @returns List of diagnosis records.
        """
        diagnoses = []

        # Diagnoses may be attached to donors
        donors = hit.get("donors", [])
        for donor in donors:
            donor_id = donor.get("donor_id")
            donor_diagnoses = donor.get("diagnoses", [])

            for diagnosis in donor_diagnoses:
                diagnosis_id = diagnosis.get("diagnosis_id") or str(uuid.uuid4())
                diagnoses.append(
                    {
                        "diagnosis_id": diagnosis_id,
                        "donor_id": donor_id,
                        "biosample_id": diagnosis.get("biosample_id"),
                        "disease": diagnosis.get("disease"),
                        "disease_label": diagnosis.get("disease_label"),
                        "phenotype": diagnosis.get("phenotype"),
                        "phenotype_label": diagnosis.get("phenotype_label"),
                        "onset_age_lower_bound": diagnosis.get("onset_age_lower_bound"),
                        "onset_age_upper_bound": diagnosis.get("onset_age_upper_bound"),
                        "onset_age_unit": diagnosis.get("onset_age_unit"),
                        "created_at": self._now,
                        "updated_at": self._now,
                    }
                )

        return diagnoses

    def _extract_activities(
        self, hit: dict[str, Any], dataset_id: Optional[str]
    ) -> list[dict[str, Any]]:
        """
        Extract activity records from a hit.

        @param hit - Raw API hit.
        @param dataset_id - ID of parent dataset.
        @returns List of activity records.
        """
        activities = []

        activity_data = hit.get("activities", [])
        for activity in activity_data:
            activity_id = activity.get("activity_id")
            if activity_id:
                activities.append(
                    {
                        "activity_id": activity_id,
                        "activity_type": activity.get("activity_type"),
                        "assay_type": activity.get("assay_type"),
                        "data_modality": activity.get("data_modality"),
                        "reference_assembly": activity.get("reference_assembly"),
                        "dataset_id": dataset_id,
                        "created_at": self._now,
                        "updated_at": self._now,
                    }
                )

        return activities

    def _normalize_list(self, value: Any) -> Any:
        """
        Normalize a value that might be a list or single value.

        @param value - Value to normalize.
        @returns First element if list with one item, else original value.
        """
        if isinstance(value, list):
            if len(value) == 1:
                return value[0]
            return value
        return value

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
            "diagnoses": "diagnosis_id",
            "activities": "activity_id",
        }

        result = {}
        for entity_name, records in entities.items():
            id_field = id_fields.get(entity_name, "id")
            seen = set()
            unique = []

            for record in records:
                record_id = record.get(id_field)
                if record_id and record_id not in seen:
                    seen.add(record_id)
                    unique.append(record)

            result[entity_name] = unique

        return result
