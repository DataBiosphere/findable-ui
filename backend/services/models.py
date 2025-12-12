from pydantic import BaseModel


# Model of a selected facet value and its mention (that is, the original query text that resolved to the value).
class SelectedValue(BaseModel):
    """
    Represents a selected facet value and its mention in the original query text.

    Attributes:
        term (str): The resolved facet value.
        mention (str): The original query text that resolved to the value.
    """
    term: str
    mention: str


# Model of a selected facet and its resolved values.
class FacetSelection(BaseModel):
    """
    Represents a selected facet and its resolved values.

    Attributes:
        facet (str): The name of the facet.
        selectedValues (list[SelectedValue]): The list of selected values for this facet.
    """
    facet: str
    selectedValues: list[SelectedValue]


# Model of the selected facets for a given query, resolved and normalized via LLM.
class FacetsResponse(BaseModel):
    """
    Represents the selected facets for a given query, resolved and normalized via LLM.

    Attributes:
        query (str): The original query string.
        facets (list[FacetSelection]): The list of selected facets and their values.
    """
    query: str
    facets: list[FacetSelection]
