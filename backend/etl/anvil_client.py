"""
AnVIL API client for fetching entity data.

Handles pagination and rate limiting when fetching data from the AnVIL API.
"""

import logging
from typing import Any, Iterator, Optional

import httpx

logger = logging.getLogger(__name__)

# Default AnVIL API base URL
DEFAULT_ANVIL_API_URL = "https://service.explore.anvilproject.org/index"
DEFAULT_ANVIL_CATALOG = "anvil12"


class AnVILClient:
    """
    Client for fetching data from the AnVIL/Azul API.

    Handles pagination and provides iteration over all entity records.
    """

    def __init__(
        self,
        base_url: str = DEFAULT_ANVIL_API_URL,
        catalog: str = DEFAULT_ANVIL_CATALOG,
        timeout: float = 30.0,
        page_size: int = 100,
    ):
        """
        Initialize the AnVIL client.

        @param base_url - Base URL for the AnVIL API.
        @param catalog - Catalog to query (e.g., 'anvil').
        @param timeout - Request timeout in seconds.
        @param page_size - Number of records per page.
        """
        self.base_url = base_url.rstrip("/")
        self.catalog = catalog
        self.timeout = timeout
        self.page_size = page_size
        self._client: Optional[httpx.Client] = None

    def _get_client(self) -> httpx.Client:
        """
        Get or create HTTP client.

        @returns HTTP client instance.
        """
        if self._client is None:
            self._client = httpx.Client(timeout=self.timeout)
        return self._client

    def close(self) -> None:
        """Close the HTTP client connection."""
        if self._client is not None:
            self._client.close()
            self._client = None

    def __enter__(self) -> "AnVILClient":
        """Context manager entry."""
        return self

    def __exit__(self, exc_type: Any, exc_val: Any, exc_tb: Any) -> None:
        """Context manager exit."""
        self.close()

    def fetch_page(
        self,
        entity: str,
        search_after: Optional[str] = None,
        filters: Optional[dict[str, Any]] = None,
    ) -> dict[str, Any]:
        """
        Fetch a single page of results.

        @param entity - Entity type to fetch (e.g., 'files', 'projects').
        @param search_after - Pagination cursor from previous page.
        @param filters - Optional filters to apply.
        @returns API response containing hits and pagination info.
        """
        client = self._get_client()

        # Build request URL and params
        url = f"{self.base_url}/{entity}"
        params = {
            "catalog": self.catalog,
            "size": self.page_size,
        }

        if search_after:
            params["search_after"] = search_after

        if filters:
            params["filters"] = filters

        logger.debug(f"Fetching {entity} page from {url}")
        response = client.get(url, params=params)
        response.raise_for_status()

        return response.json()

    def fetch_all(
        self,
        entity: str,
        filters: Optional[dict[str, Any]] = None,
        max_pages: Optional[int] = None,
    ) -> Iterator[dict[str, Any]]:
        """
        Fetch all records for an entity with automatic pagination.

        @param entity - Entity type to fetch.
        @param filters - Optional filters to apply.
        @param max_pages - Maximum number of pages to fetch (for testing).
        @yields Individual entity records (hits).
        """
        search_after = None
        page_count = 0
        total_count = 0

        while True:
            page_data = self.fetch_page(entity, search_after, filters)

            hits = page_data.get("hits", [])
            if not hits:
                break

            for hit in hits:
                yield hit
                total_count += 1

            page_count += 1
            logger.info(f"Fetched page {page_count}, total records: {total_count}")

            if max_pages and page_count >= max_pages:
                logger.info(f"Reached max_pages limit ({max_pages})")
                break

            # Get pagination cursor for next page
            pagination = page_data.get("pagination", {})
            search_after = pagination.get("search_after")

            if not search_after:
                break

        logger.info(f"Completed fetching {entity}: {total_count} total records")

    def fetch_summary(self, entity: str) -> dict[str, Any]:
        """
        Fetch summary/aggregation data for an entity.

        @param entity - Entity type to get summary for.
        @returns Summary data including counts and facet values.
        """
        client = self._get_client()

        url = f"{self.base_url}/{entity}/summary"
        params = {"catalog": self.catalog}

        response = client.get(url, params=params)
        response.raise_for_status()

        return response.json()


class MockAnVILClient(AnVILClient):
    """
    Mock AnVIL client for testing.

    Returns predefined fixture data instead of making API calls.
    """

    def __init__(self, fixture_data: Optional[dict[str, list[dict]]] = None):
        """
        Initialize mock client with fixture data.

        @param fixture_data - Dict mapping entity names to lists of records.
        """
        super().__init__()
        self.fixture_data = fixture_data or {}

    def fetch_page(
        self,
        entity: str,
        search_after: Optional[str] = None,
        filters: Optional[dict[str, Any]] = None,
    ) -> dict[str, Any]:
        """
        Return fixture data for the entity.

        @param entity - Entity type to fetch.
        @param search_after - Ignored in mock.
        @param filters - Ignored in mock.
        @returns Mock response with fixture data.
        """
        records = self.fixture_data.get(entity, [])

        # Simple pagination simulation
        start = 0
        if search_after:
            start = int(search_after)

        end = min(start + self.page_size, len(records))
        page_records = records[start:end]

        next_cursor = str(end) if end < len(records) else None

        return {
            "hits": page_records,
            "pagination": {
                "search_after": next_cursor,
                "total": len(records),
            },
        }
