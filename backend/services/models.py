from pydantic import BaseModel


# Model of a selected facet value and its mention (that is, the original query text that resolved to the value).
class SelectedValue(BaseModel):
    term: str
    mention: str


# Model of a selected facet and its resolved values.
class FacetSelection(BaseModel):
    facet: str
    selectedValues: list[SelectedValue]


# Model of the selected facets for a given query, resolved and normalized via LLM.
class FacetsResponse(BaseModel):
    query: str
    facets: list[FacetSelection]
