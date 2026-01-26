"""
Configuration system for the Generic Data Explorer.

Provides YAML-based configuration with Pydantic validation for:
- Entity schemas
- Facet definitions
- OpenSearch index mappings
"""

from configs.loader import ConfigLoader, get_config
from configs.models import (
    EntityDef,
    ExplorerConfig,
    FacetDef,
    FieldDef,
    IndexConfig,
    RelationshipDef,
)

__all__ = [
    "ConfigLoader",
    "EntityDef",
    "ExplorerConfig",
    "FacetDef",
    "FieldDef",
    "IndexConfig",
    "RelationshipDef",
    "get_config",
]
