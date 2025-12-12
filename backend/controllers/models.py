from pydantic import BaseModel


# Model of the request body for the /api/v0/facets endpoint.
class FacetsRequest(BaseModel):
    query: str
