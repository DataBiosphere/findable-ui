"""Configuration for services including OpenSearch connection settings."""
import os
from typing import Dict

from services.anvil_config import get_anvil_facet_mapping


class OpenSearchConfig:
    """Configuration for OpenSearch connection.

    Reads from environment variables with sensible defaults for local development.
    """

    def __init__(self) -> None:
        """Initialize OpenSearch configuration from environment variables."""
        self.host = os.getenv("OPENSEARCH_HOST", "localhost")
        self.port = int(os.getenv("OPENSEARCH_PORT", "9200"))
        self.use_ssl = os.getenv("OPENSEARCH_USE_SSL", "false").lower() == "true"
        self.verify_certs = (
            os.getenv("OPENSEARCH_VERIFY_CERTS", "false").lower() == "true"
        )
        self.index_name = os.getenv("OPENSEARCH_INDEX", "concepts")

    def to_dict(self) -> Dict:
        """Convert config to dict for passing to OpenSearchConceptResolver.

        Returns:
            Dict with host, port, use_ssl, verify_certs keys.
        """
        return {
            "host": self.host,
            "port": self.port,
            "use_ssl": self.use_ssl,
            "verify_certs": self.verify_certs,
        }


def create_opensearch_resolver():
    """Factory function to create an OpenSearchConceptResolver with AnVIL config.

    Returns:
        OpenSearchConceptResolver instance configured for AnVIL.
    """
    from services.opensearch_concept_resolver import OpenSearchConceptResolver

    config = OpenSearchConfig()
    facet_mapping = get_anvil_facet_mapping()

    return OpenSearchConceptResolver(
        host=config.host,
        port=config.port,
        use_ssl=config.use_ssl,
        verify_certs=config.verify_certs,
        facet_name_mapping=facet_mapping,
    )
