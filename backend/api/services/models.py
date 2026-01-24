from typing import List, Optional

from pydantic import BaseModel, Field


class SuggestedSynonym(BaseModel):
    """A synonym suggestion from agent reasoning.

    When the agent accepts a fuzzy match through reasoning, it can suggest
    adding the query term as a synonym for the matched concept. These
    suggestions can be reviewed and added to the concept database.

    Attributes:
        facet: The facet this synonym belongs to.
        concept_term: The canonical term in the database.
        suggested_synonym: The term that should map to the concept.
        reasoning: Why the agent thinks this mapping is valid.
        confidence: Confidence score (0-1).
    """

    facet: str = Field(description="Facet name (e.g., 'diagnoses.disease')")
    concept_term: str = Field(description="The canonical term in the database")
    suggested_synonym: str = Field(description="The term that should map to it")
    reasoning: str = Field(description="Why this synonym is valid")
    confidence: float = Field(
        default=0.8, ge=0.0, le=1.0, description="Confidence score (0-1)"
    )


# Model of a selected facet value and its mention (that is, the original query text that resolved to the value).
class SelectedValue(BaseModel):
    """
    Represents a selected facet value and its mention in the original query text.

    Attributes:
        term (str): The resolved facet value.
        mention (str): The original query text that resolved to the value.
        recognized (bool): Whether the term was found in the concept database (default: True).
    """

    term: str
    mention: str
    recognized: bool = True


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
        suggested_synonyms (list[SuggestedSynonym]): Optional synonym suggestions from
            agentic mode. When the agent accepts a fuzzy match through reasoning,
            it suggests adding the term as a synonym.
    """

    query: str
    facets: list[FacetSelection]
    suggested_synonyms: Optional[List[SuggestedSynonym]] = Field(
        default=None,
        description="Synonym suggestions from agentic mode (for review/curation)",
    )
