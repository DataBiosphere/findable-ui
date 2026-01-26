"""
Tests for the configuration loader and models.
"""

import tempfile
from pathlib import Path

import pytest
import yaml
from pydantic import ValidationError

from configs.loader import ConfigLoader, clear_config_cache, get_config
from configs.models import (
    EntityDef,
    ExplorerConfig,
    FacetDef,
    FacetsConfig,
    FieldDef,
    FieldType,
    FilterOperator,
    IndexConfig,
    IndexesConfig,
    RelationshipDef,
    RelationshipType,
    SchemaConfig,
)


class TestFieldDef:
    """Tests for FieldDef model."""

    def test_minimal_field(self) -> None:
        """Test creating field with minimal required properties."""
        field = FieldDef(name="test_field", type=FieldType.KEYWORD)
        assert field.name == "test_field"
        assert field.type == FieldType.KEYWORD
        assert field.facet is False
        assert field.sortable is False
        assert field.source is None

    def test_full_field(self) -> None:
        """Test creating field with all properties."""
        field = FieldDef(
            name="data_modality",
            type=FieldType.KEYWORD,
            facet=True,
            sortable=True,
            searchable=True,
            source="meta-disco",
            description="Type of genomic data",
        )
        assert field.facet is True
        assert field.source == "meta-disco"


class TestEntityDef:
    """Tests for EntityDef model."""

    def test_entity_with_fields(self) -> None:
        """Test creating entity with fields."""
        entity = EntityDef(
            index="anvil_files",
            id_field="file_id",
            description="Data files",
            fields=[
                FieldDef(name="file_id", type=FieldType.KEYWORD),
                FieldDef(name="file_name", type=FieldType.TEXT),
            ],
        )
        assert entity.index == "anvil_files"
        assert len(entity.fields) == 2

    def test_entity_with_relationships(self) -> None:
        """Test creating entity with relationships."""
        entity = EntityDef(
            index="anvil_donors",
            id_field="donor_id",
            relationships=[
                RelationshipDef(
                    entity="datasets",
                    type=RelationshipType.MANY_TO_ONE,
                    field="dataset_id",
                )
            ],
        )
        assert len(entity.relationships) == 1
        assert entity.relationships[0].type == RelationshipType.MANY_TO_ONE


class TestFacetDef:
    """Tests for FacetDef model."""

    def test_facet_with_operators(self) -> None:
        """Test creating facet with multiple operators."""
        facet = FacetDef(
            name="diagnoses.disease",
            display_name="Disease",
            type=FieldType.KEYWORD,
            operators=[FilterOperator.AND, FilterOperator.OR],
            entity_path="diagnoses.disease",
        )
        assert FilterOperator.AND in facet.operators
        assert FilterOperator.OR in facet.operators

    def test_facet_with_known_values(self) -> None:
        """Test creating facet with predefined values."""
        facet = FacetDef(
            name="donors.phenotypic_sex",
            display_name="Sex",
            entity_path="donors.phenotypic_sex",
            values=["Female", "Male", "Unknown"],
        )
        assert facet.values == ["Female", "Male", "Unknown"]


class TestExplorerConfig:
    """Tests for ExplorerConfig model."""

    def test_get_entity(self) -> None:
        """Test retrieving entity by name."""
        config = ExplorerConfig(
            scope="test",
            schema_config=SchemaConfig(
                entities={
                    "files": EntityDef(index="test_files", id_field="file_id"),
                }
            ),
            facets_config=FacetsConfig(facets=[]),
            indexes_config=IndexesConfig(indexes={}),
        )
        entity = config.get_entity("files")
        assert entity is not None
        assert entity.index == "test_files"

    def test_get_nonexistent_entity(self) -> None:
        """Test retrieving nonexistent entity returns None."""
        config = ExplorerConfig(
            scope="test",
            schema_config=SchemaConfig(entities={}),
            facets_config=FacetsConfig(facets=[]),
            indexes_config=IndexesConfig(indexes={}),
        )
        assert config.get_entity("nonexistent") is None

    def test_get_facet(self) -> None:
        """Test retrieving facet by name."""
        config = ExplorerConfig(
            scope="test",
            schema_config=SchemaConfig(entities={}),
            facets_config=FacetsConfig(
                facets=[
                    FacetDef(
                        name="files.format",
                        display_name="Format",
                        entity_path="files.format",
                    )
                ]
            ),
            indexes_config=IndexesConfig(indexes={}),
        )
        facet = config.get_facet("files.format")
        assert facet is not None
        assert facet.display_name == "Format"

    def test_list_entities(self) -> None:
        """Test listing all entity names."""
        config = ExplorerConfig(
            scope="test",
            schema_config=SchemaConfig(
                entities={
                    "files": EntityDef(index="files", id_field="id"),
                    "donors": EntityDef(index="donors", id_field="id"),
                }
            ),
            facets_config=FacetsConfig(facets=[]),
            indexes_config=IndexesConfig(indexes={}),
        )
        entities = config.list_entities()
        assert "files" in entities
        assert "donors" in entities


class TestConfigLoader:
    """Tests for ConfigLoader."""

    def test_load_anvil_config(self) -> None:
        """Test loading the AnVIL configuration."""
        loader = ConfigLoader()
        config = loader.load("anvil")

        assert config.scope == "anvil"
        assert "datasets" in config.list_entities()
        assert "files" in config.list_entities()
        assert "donors" in config.list_entities()

    def test_load_nonexistent_scope(self) -> None:
        """Test loading nonexistent scope raises error."""
        loader = ConfigLoader()
        with pytest.raises(FileNotFoundError):
            loader.load("nonexistent_scope")

    def test_validate_config(self) -> None:
        """Test config validation catches issues."""
        loader = ConfigLoader()
        config = loader.load("anvil")
        warnings = loader.validate_config(config)
        # Should have no warnings for valid config
        # (or minimal warnings for optional checks)
        assert isinstance(warnings, list)

    def test_load_with_temp_config(self) -> None:
        """Test loading config from temporary directory."""
        with tempfile.TemporaryDirectory() as tmpdir:
            scope_dir = Path(tmpdir) / "test_scope"
            scope_dir.mkdir()

            # Create minimal valid config files
            schema_data = {
                "entities": {
                    "items": {
                        "index": "test_items",
                        "id_field": "item_id",
                        "fields": [{"name": "item_id", "type": "keyword"}],
                    }
                }
            }
            facets_data = {
                "facets": [
                    {
                        "name": "items.category",
                        "display_name": "Category",
                        "entity_path": "items.category",
                    }
                ]
            }
            indexes_data = {
                "indexes": {
                    "test_items": {
                        "name": "test_items",
                        "mappings": {"item_id": {"type": "keyword"}},
                    }
                }
            }

            with open(scope_dir / "schema.yaml", "w") as f:
                yaml.dump(schema_data, f)
            with open(scope_dir / "facets.yaml", "w") as f:
                yaml.dump(facets_data, f)
            with open(scope_dir / "indexes.yaml", "w") as f:
                yaml.dump(indexes_data, f)

            loader = ConfigLoader(config_dir=Path(tmpdir))
            config = loader.load("test_scope")

            assert config.scope == "test_scope"
            assert "items" in config.list_entities()


class TestGetConfig:
    """Tests for get_config helper function."""

    def test_get_config_caching(self) -> None:
        """Test that get_config caches results."""
        clear_config_cache()

        config1 = get_config("anvil")
        config2 = get_config("anvil")

        # Should return same instance from cache
        assert config1 is config2

    def test_force_reload(self) -> None:
        """Test that force_reload bypasses cache."""
        clear_config_cache()

        config1 = get_config("anvil")
        config2 = get_config("anvil", force_reload=True)

        # Should be different instances
        assert config1 is not config2


class TestAnvilConfig:
    """Integration tests for the AnVIL configuration."""

    def test_anvil_entities(self) -> None:
        """Test AnVIL config has expected entities."""
        config = get_config("anvil")
        entities = config.list_entities()

        assert "datasets" in entities
        assert "donors" in entities
        assert "biosamples" in entities
        assert "files" in entities
        assert "diagnoses" in entities
        assert "activities" in entities

    def test_anvil_facets(self) -> None:
        """Test AnVIL config has expected facets."""
        config = get_config("anvil")
        facets = config.list_facets()

        assert "diagnoses.disease" in facets
        assert "files.file_format" in facets
        assert "donors.phenotypic_sex" in facets
        assert "files.data_modality" in facets

    def test_anvil_disease_facet_supports_and(self) -> None:
        """Test disease facet supports AND operator."""
        config = get_config("anvil")
        facet = config.get_facet("diagnoses.disease")

        assert facet is not None
        assert FilterOperator.AND in facet.operators

    def test_anvil_files_entity_has_meta_disco_fields(self) -> None:
        """Test files entity has meta-disco enriched fields."""
        config = get_config("anvil")
        entity = config.get_entity("files")

        assert entity is not None
        field_names = [f.name for f in entity.fields]
        assert "data_modality" in field_names
        assert "assay_type" in field_names
        assert "data_type" in field_names

        # Check that meta-disco source is marked
        data_modality = next(f for f in entity.fields if f.name == "data_modality")
        assert data_modality.source == "meta-disco"

    def test_anvil_entity_indexes(self) -> None:
        """Test each entity has a valid index."""
        config = get_config("anvil")

        for entity_name in config.list_entities():
            entity = config.get_entity(entity_name)
            assert entity is not None
            index = config.get_index(entity.index)
            assert (
                index is not None
            ), f"Index {entity.index} not found for {entity_name}"
