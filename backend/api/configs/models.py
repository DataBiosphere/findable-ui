"""
Pydantic models for explorer configuration.

These models define the structure of YAML configuration files for:
- Entity schemas (fields, types, relationships)
- Facet definitions (display names, operators, types)
- OpenSearch index mappings
"""

from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class FieldType(str, Enum):
    """Supported field types for entity fields."""

    KEYWORD = "keyword"
    TEXT = "text"
    LONG = "long"
    INTEGER = "integer"
    FLOAT = "float"
    DOUBLE = "double"
    BOOLEAN = "boolean"
    DATE = "date"
    NESTED = "nested"


class FilterOperator(str, Enum):
    """Supported filter operators for facets."""

    AND = "AND"
    OR = "OR"


class RelationshipType(str, Enum):
    """Supported relationship types between entities."""

    ONE_TO_ONE = "one-to-one"
    ONE_TO_MANY = "one-to-many"
    MANY_TO_ONE = "many-to-one"
    MANY_TO_MANY = "many-to-many"


class FieldDef(BaseModel):
    """Definition of a single field within an entity."""

    name: str = Field(..., description="Field name as stored in the index")
    type: FieldType = Field(..., description="Field data type")
    facet: bool = Field(default=False, description="Whether field is facetable")
    sortable: bool = Field(default=False, description="Whether field is sortable")
    searchable: bool = Field(default=False, description="Whether field is searchable")
    source: Optional[str] = Field(
        default=None, description="External data source (e.g., 'meta-disco')"
    )
    description: Optional[str] = Field(default=None, description="Field description")


class RelationshipDef(BaseModel):
    """Definition of a relationship between entities."""

    entity: str = Field(..., description="Related entity name")
    type: RelationshipType = Field(..., description="Relationship cardinality")
    field: str = Field(..., description="Foreign key field name")
    description: Optional[str] = Field(
        default=None, description="Relationship description"
    )


class EntityDef(BaseModel):
    """Definition of an entity (e.g., datasets, donors, files)."""

    index: str = Field(..., description="OpenSearch index name")
    id_field: str = Field(..., description="Primary key field name")
    fields: list[FieldDef] = Field(
        default_factory=list, description="List of field definitions"
    )
    relationships: list[RelationshipDef] = Field(
        default_factory=list, description="List of relationships to other entities"
    )
    description: Optional[str] = Field(default=None, description="Entity description")


class FacetDef(BaseModel):
    """Definition of a facet for filtering/aggregation."""

    name: str = Field(..., description="Facet identifier (e.g., 'diagnoses.disease')")
    display_name: str = Field(..., description="Human-readable display name")
    type: FieldType = Field(default=FieldType.KEYWORD, description="Facet data type")
    operators: list[FilterOperator] = Field(
        default_factory=lambda: [FilterOperator.OR],
        description="Supported filter operators",
    )
    entity_path: str = Field(
        ..., description="Path to the field in the entity (e.g., 'diagnoses.disease')"
    )
    values: Optional[list[str]] = Field(
        default=None, description="Optional list of known/allowed values"
    )
    description: Optional[str] = Field(default=None, description="Facet description")


class IndexFieldMapping(BaseModel):
    """OpenSearch field mapping for index creation."""

    type: str = Field(..., description="OpenSearch field type")
    index: Optional[bool] = Field(default=None, description="Whether to index field")
    doc_values: Optional[bool] = Field(
        default=None, description="Whether to enable doc values"
    )
    fields: Optional[dict] = Field(
        default=None, description="Multi-field mappings (e.g., keyword sub-field)"
    )


class IndexConfig(BaseModel):
    """OpenSearch index configuration."""

    name: str = Field(..., description="Index name")
    settings: dict = Field(
        default_factory=lambda: {
            "number_of_shards": 1,
            "number_of_replicas": 0,
        },
        description="Index settings",
    )
    mappings: dict[str, IndexFieldMapping] = Field(
        default_factory=dict, description="Field mappings"
    )


class SchemaConfig(BaseModel):
    """Schema configuration containing all entities."""

    entities: dict[str, EntityDef] = Field(
        default_factory=dict, description="Entity definitions keyed by name"
    )


class FacetsConfig(BaseModel):
    """Facets configuration containing all facet definitions."""

    facets: list[FacetDef] = Field(
        default_factory=list, description="List of facet definitions"
    )


class IndexesConfig(BaseModel):
    """Index configuration containing all index definitions."""

    indexes: dict[str, IndexConfig] = Field(
        default_factory=dict, description="Index configurations keyed by name"
    )


class ExplorerConfig(BaseModel):
    """Complete explorer configuration combining schema, facets, and indexes."""

    scope: str = Field(..., description="Configuration scope (e.g., 'anvil')")
    schema_config: SchemaConfig = Field(..., description="Entity schema configuration")
    facets_config: FacetsConfig = Field(..., description="Facets configuration")
    indexes_config: IndexesConfig = Field(..., description="Index configuration")

    def get_entity(self, name: str) -> Optional[EntityDef]:
        """
        Get an entity definition by name.

        @param name - Entity name to look up.
        @returns Entity definition or None if not found.
        """
        return self.schema_config.entities.get(name)

    def get_facet(self, name: str) -> Optional[FacetDef]:
        """
        Get a facet definition by name.

        @param name - Facet name to look up.
        @returns Facet definition or None if not found.
        """
        for facet in self.facets_config.facets:
            if facet.name == name:
                return facet
        return None

    def get_index(self, name: str) -> Optional[IndexConfig]:
        """
        Get an index configuration by name.

        @param name - Index name to look up.
        @returns Index configuration or None if not found.
        """
        return self.indexes_config.indexes.get(name)

    def get_entity_index(self, entity_name: str) -> Optional[str]:
        """
        Get the index name for an entity.

        @param entity_name - Entity name to look up.
        @returns Index name or None if entity not found.
        """
        entity = self.get_entity(entity_name)
        return entity.index if entity else None

    def list_entities(self) -> list[str]:
        """
        List all entity names.

        @returns List of entity names.
        """
        return list(self.schema_config.entities.keys())

    def list_facets(self) -> list[str]:
        """
        List all facet names.

        @returns List of facet names.
        """
        return [facet.name for facet in self.facets_config.facets]
