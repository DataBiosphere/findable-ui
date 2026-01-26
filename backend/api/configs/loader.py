"""
YAML configuration loader with Pydantic validation.

Loads configuration files for a given scope (e.g., 'anvil') and
validates them against Pydantic models.
"""

import logging
from pathlib import Path
from typing import Optional

import yaml
from pydantic import ValidationError

from configs.models import (
    ExplorerConfig,
    FacetsConfig,
    IndexesConfig,
    SchemaConfig,
)

logger = logging.getLogger(__name__)

# Module-level cache for loaded configurations
_config_cache: dict[str, ExplorerConfig] = {}


class ConfigLoader:
    """
    Loads and validates YAML configuration files for the explorer.

    Configuration files are organized by scope (e.g., 'anvil') in subdirectories:
    - schema.yaml: Entity definitions
    - facets.yaml: Facet definitions
    - indexes.yaml: OpenSearch index mappings
    """

    def __init__(self, config_dir: Optional[Path] = None):
        """
        Initialize the config loader.

        @param config_dir - Base directory containing scope subdirectories.
                           Defaults to the configs directory.
        """
        if config_dir is None:
            config_dir = Path(__file__).parent
        self.config_dir = config_dir

    def load(self, scope: str) -> ExplorerConfig:
        """
        Load and validate configuration for a scope.

        @param scope - Configuration scope (e.g., 'anvil').
        @returns Validated ExplorerConfig instance.
        @raises FileNotFoundError - If config files don't exist.
        @raises ValidationError - If config files are invalid.
        """
        scope_dir = self.config_dir / scope

        if not scope_dir.exists():
            raise FileNotFoundError(
                f"Configuration scope '{scope}' not found at {scope_dir}"
            )

        schema_config = self._load_schema(scope_dir)
        facets_config = self._load_facets(scope_dir)
        indexes_config = self._load_indexes(scope_dir)

        config = ExplorerConfig(
            scope=scope,
            schema_config=schema_config,
            facets_config=facets_config,
            indexes_config=indexes_config,
        )

        logger.info(
            f"Loaded config for scope '{scope}': "
            f"{len(config.list_entities())} entities, "
            f"{len(config.list_facets())} facets"
        )

        return config

    def _load_schema(self, scope_dir: Path) -> SchemaConfig:
        """
        Load schema configuration from YAML.

        @param scope_dir - Directory containing the schema.yaml file.
        @returns Validated SchemaConfig instance.
        """
        schema_file = scope_dir / "schema.yaml"
        if not schema_file.exists():
            raise FileNotFoundError(f"Schema file not found: {schema_file}")

        with open(schema_file) as f:
            data = yaml.safe_load(f)

        try:
            return SchemaConfig(**data)
        except ValidationError as e:
            logger.error(f"Invalid schema configuration: {e}")
            raise

    def _load_facets(self, scope_dir: Path) -> FacetsConfig:
        """
        Load facets configuration from YAML.

        @param scope_dir - Directory containing the facets.yaml file.
        @returns Validated FacetsConfig instance.
        """
        facets_file = scope_dir / "facets.yaml"
        if not facets_file.exists():
            raise FileNotFoundError(f"Facets file not found: {facets_file}")

        with open(facets_file) as f:
            data = yaml.safe_load(f)

        try:
            return FacetsConfig(**data)
        except ValidationError as e:
            logger.error(f"Invalid facets configuration: {e}")
            raise

    def _load_indexes(self, scope_dir: Path) -> IndexesConfig:
        """
        Load indexes configuration from YAML.

        @param scope_dir - Directory containing the indexes.yaml file.
        @returns Validated IndexesConfig instance.
        """
        indexes_file = scope_dir / "indexes.yaml"
        if not indexes_file.exists():
            raise FileNotFoundError(f"Indexes file not found: {indexes_file}")

        with open(indexes_file) as f:
            data = yaml.safe_load(f)

        try:
            return IndexesConfig(**data)
        except ValidationError as e:
            logger.error(f"Invalid indexes configuration: {e}")
            raise

    def validate_config(self, config: ExplorerConfig) -> list[str]:
        """
        Perform additional validation checks on the configuration.

        @param config - Configuration to validate.
        @returns List of validation warnings (empty if valid).
        """
        warnings = []

        # Check that all facets reference valid entity paths
        entity_names = config.list_entities()
        for facet in config.facets_config.facets:
            entity_prefix = facet.entity_path.split(".")[0]
            if entity_prefix not in entity_names:
                warnings.append(
                    f"Facet '{facet.name}' references unknown entity: {entity_prefix}"
                )

        # Check that all entities have corresponding indexes defined
        for entity_name, entity_def in config.schema_config.entities.items():
            if entity_def.index not in config.indexes_config.indexes:
                warnings.append(
                    f"Entity '{entity_name}' references undefined index: {entity_def.index}"
                )

        return warnings


def get_config(scope: str = "anvil", force_reload: bool = False) -> ExplorerConfig:
    """
    Get configuration for a scope, using cache if available.

    @param scope - Configuration scope (e.g., 'anvil').
    @param force_reload - Force reload from disk even if cached.
    @returns Validated ExplorerConfig instance.
    """
    if force_reload or scope not in _config_cache:
        loader = ConfigLoader()
        _config_cache[scope] = loader.load(scope)

    return _config_cache[scope]


def clear_config_cache() -> None:
    """
    Clear the configuration cache.

    Useful for testing or forcing config reload.
    """
    _config_cache.clear()
