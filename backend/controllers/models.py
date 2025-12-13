from pydantic import BaseModel


class FacetsRequest(BaseModel):
    """
    Request model for the /api/v0/facets endpoint.
    Attributes:
        query (str): The search query string to retrieve facets for.
    """

    query: str
