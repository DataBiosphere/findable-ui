"""LLM-based mention extraction using Pydantic AI and tool calling."""
from typing import List, Literal
from pydantic import BaseModel, Field
from pydantic_ai import Agent

from services.normalization_service import Mention
from services.llm_config import LLMConfig


# Facet context for the LLM
FACET_CONTEXT = """
Facet definitions and guidance:

- Consent Group:
  Consent group or consent groups related to a dataset.

- Data Modality:
  Describes the biological nature of the information gathered as the result of an Activity,
  independent of the technology or methods used to produce the information.

- Diagnosis:
  A human-readable property that identifies a disease or condition has been reported in this entity.

- Organism Type:
  A human-readable reference to the organism type.

- Reported Ethnicity:
  A property that reflects a Human Donor's reported ethnic origins.
  Note this may contain both Race and Ethnicity information as defined by the
  US Department of the Interior (DOI).

- Phenotypic Sex:
  A reference to the BiologicalSex of the donor organism:
  "An organismal quality inhering in a bearer by virtue of the bearer's physical
  expression of sexual characteristics." [PATO_0001894]

- Anatomical Site:
  A human-readable reference to the site within the organism from which the biosample was taken.

- BioSample Type:
  A human-readable reference to the type of biosample represented by the record.

- File Format:
  An indication of the format of an electronic file; include the full file extension
  including compression extensions (e.g. bam, sam, csv, txt, etc.).

Instructions:
- Extract exact substrings from the query.
- Assign mentions to the most appropriate facet listed above.
- If a meaningful term does not map to any facet, use facet = 'unmatched'.
- Do not invent new facet names.
""".strip()


# Type-safe facet names
FacetName = Literal[
    "Consent Group",
    "Data Modality",
    "Diagnosis",
    "Organism Type",
    "Reported Ethnicity",
    "Phenotypic Sex",
    "Anatomical Site",
    "BioSample Type",
    "File Format",
    "unmatched",
]


class FacetMention(BaseModel):
    """Mentions grouped by facet."""

    facet: FacetName = Field(
        description=("Facet name for the extracted mentions.\n\n" + FACET_CONTEXT)
    )
    mentions: List[str] = Field(
        description=(
            "List of extracted mentions (exact strings) found in the query. "
            "Return substrings verbatim; do not paraphrase."
        )
    )


class MentionExtractionResult(BaseModel):
    """Result of mention extraction from a query."""

    query: str = Field(description="Original user query (verbatim).")
    facets: List[FacetMention] = Field(
        description="Facet-grouped mentions extracted from the query."
    )


class LLMMentionExtractor:
    """Extract mentions from queries using Pydantic AI and tool calling."""

    def __init__(self, config: LLMConfig = None):
        """Initialize the LLM mention extractor.

        Args:
            config: LLM configuration. If None, uses default config.
        """
        self.config = config or LLMConfig()

        # Create Pydantic AI agent with OpenAI model
        # In the new API, we use output_type instead of result_type
        # The model string is in the format "openai:model-name"
        import os
        model_name = f"openai:{self.config.model}"
        api_key = self.config.api_key or os.getenv("OPENAI_API_KEY")

        self.agent = Agent(
            model=model_name,
            output_type=MentionExtractionResult,
            instructions=(
                "You are a genomic data query parser for the AnVIL platform. "
                "Extract search terms from user queries and categorize them into facets. "
                "Return structured results with the query and extracted facet mentions."
            ),
        )

        # Override the model's API key if provided
        if api_key:
            os.environ["OPENAI_API_KEY"] = api_key

        # Track usage stats
        self.stats = {
            "total_queries": 0,
            "total_input_tokens": 0,
            "total_output_tokens": 0,
            "total_cost": 0.0,
        }

    def extract_mentions(self, query: str) -> List[Mention]:
        """Extract mentions from a natural language query.

        Args:
            query: Natural language query string.

        Returns:
            List of Mention objects with extracted text and facet assignments.
        """
        if not query or not query.strip():
            return []

        try:
            # Run the agent
            result = self.agent.run_sync(query)

            # In pydantic-ai 1.x, the output is accessed via .output attribute
            extraction = result.output

            # Update stats if usage info is available
            if hasattr(result, "usage"):
                try:
                    usage = result.usage()
                    self.stats["total_queries"] += 1
                    self.stats["total_input_tokens"] += usage.request_tokens
                    self.stats["total_output_tokens"] += usage.response_tokens
                    self.stats["total_cost"] += self.config.estimate_cost(
                        usage.request_tokens, usage.response_tokens
                    )
                except Exception:
                    pass  # Ignore usage tracking errors

            # Convert FacetMention format to List[Mention] format
            mentions = self._convert_to_mentions(extraction)

            return mentions

        except Exception as e:
            print(f"Error calling LLM: {e}")
            import traceback
            traceback.print_exc()
            return []

    def _convert_to_mentions(self, extraction: MentionExtractionResult) -> List[Mention]:
        """Convert MentionExtractionResult to flat list of Mention objects.

        Args:
            extraction: The structured extraction result from Pydantic AI.

        Returns:
            Flat list of Mention objects.
        """
        mentions = []

        for facet_mention in extraction.facets:
            facet = facet_mention.facet
            for mention_text in facet_mention.mentions:
                mentions.append(Mention(text=mention_text, facet=facet))

        return mentions

    def get_stats(self) -> dict:
        """Get usage statistics.

        Returns:
            Dict with query count, token usage, and estimated cost.
        """
        return self.stats.copy()

    def reset_stats(self) -> None:
        """Reset usage statistics."""
        self.stats = {
            "total_queries": 0,
            "total_input_tokens": 0,
            "total_output_tokens": 0,
            "total_cost": 0.0,
        }
