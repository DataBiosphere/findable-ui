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
  Common examples include: GRU, HMB, NRES, DS-* variants, Unrestricted access, Consortia Access Only.

  Access level terminology:
  * "Private access", "restricted access", "controlled access", "limited access" →
    typically refer to restricted/consortia consent groups
  * "Public access", "open access", "unrestricted access" →
    typically refer to unrestricted/open consent groups

  IMPORTANT: Pay attention to access modifiers - "private" and "public" have opposite meanings.

- Data Modality:
  Describes the biological nature of the information gathered as the result of an Activity,
  independent of the technology or methods used to produce the information.
  Common examples include:
  * Sequencing types: whole genome, WGS, RNA-seq, scRNA-seq, snRNA-seq, ATAC-seq, scATAC-seq, snATAC-seq
  * Technologies: PacBio sequencing, long-read sequencing, SHARE-seq
  * Molecular data: genome, methylation, DNA methylation, genomic DNA, gdna
  * Single-cell/nucleus variants: single-cell RNA sequencing, single-nucleus RNA sequencing
  * Special values: none, unspecified

  IMPORTANT: Extract complete data modality terms as single mentions.
  * When terms appear in isolation (e.g., "WGS", "methylation", "genome"), extract them.
  * When terms are part of a longer specific phrase (e.g., "single-cell RNA sequencing assay"
    or "PacBio whole genome sequencing"), extract the COMPLETE phrase as ONE mention.
  * DO NOT split technology-specific phrases into parts - "PacBio whole genome sequencing"
    should be ONE mention, not separate "PacBio" and "whole genome sequencing" mentions.

- Diagnosis:
  A disease or individual phenotypic feature.
  This includes:
  * Named diseases (e.g., diabetes, cancer, Alzheimer's disease, autism)
  * MONDO disease terms
  * Individual HPO phenotypic features (e.g., cleft palate, seizure, hypotonia)
  * Single observable characteristics or abnormalities

  IMPORTANT: Use Diagnosis for both named diseases AND individual phenotypic traits.
  Only use Phenotype for complex phenotype syndromes.

- Phenotype:
  Complex phenotype syndromes and named phenotypic conditions.
  This includes:
  * Complex phenotype syndromes (e.g., Coffin-Siris syndrome, Epileptic Encephalopathy)
  * Named phenotypic conditions (e.g., Agenesis of the Corpus Callosum)
  * Multi-feature phenotypic presentations
  * Specific syndrome names

  IMPORTANT: Use Phenotype only for complex/named syndromes. For individual features
  like "cleft palate" or "seizure", use Diagnosis instead.

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
  Common notations: male/female, masculine/feminine, men/women, M/F, XY/XX
  IMPORTANT: Extract single letters M or F when they appear with biological context words
  like patients, subjects, donors, or samples (e.g., "M patients", "F donors")

- Anatomical Site:
  The normal anatomical location within an organism from which a biosample was taken.
  This refers to standard body parts/tissues where samples are collected, such as:
  * Organs: brain, heart, liver, kidney
  * Tissues: blood, tissue, muscle
  * Body regions: oral cavity, chest

  IMPORTANT: This is for NORMAL anatomy (sample collection sites), NOT abnormalities.
  Abnormal anatomical features or conditions should be categorized as Diagnosis.

- BioSample Type:
  A human-readable reference to the type of biosample represented by the record.

- File Format:
  An indication of the format of an electronic file; include the full file extension
  including compression extensions (e.g. bam, sam, csv, txt, etc.).

Instructions:
- Extract exact substrings from the query.
- Assign mentions to the most appropriate facet listed above.
- When extracting edge case phrases like "X not specified", "X unknown", "X not reported",
  "X unspecified", extract the COMPLETE PHRASE (e.g., "sex not specified" not just "sex").
  These phrases indicate missing/unknown data and should be treated as distinct mentions.
- When choosing between Diagnosis and Phenotype: use Diagnosis for diseases AND individual
  phenotypic features (like "cleft palate", "seizure"). Use Phenotype only for complex
  syndrome names (like "Coffin-Siris syndrome", "Epileptic Encephalopathy").
- When choosing between Diagnosis/Phenotype and Anatomical Site: use Diagnosis/Phenotype
  for abnormalities, use Anatomical Site only for normal body parts where samples are collected.
- If a meaningful term does not map to any facet, use facet = 'unmatched'.
- Do not invent new facet names.
""".strip()


# Type-safe facet names
FacetName = Literal[
    "Consent Group",
    "Data Modality",
    "Diagnosis",
    "Phenotype",
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

    def __init__(self, config: LLMConfig = None, facet_name_mapping: dict = None):
        """Initialize the LLM mention extractor.

        Args:
            config: LLM configuration. If None, uses default config.
            facet_name_mapping: Mapping from pretty facet names to database names.
                Example: {"Diagnosis": "diagnoses.disease"}
        """
        self.config = config or LLMConfig()
        self.facet_name_mapping = facet_name_mapping or {}

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

    def _convert_to_mentions(
        self, extraction: MentionExtractionResult
    ) -> List[Mention]:
        """Convert MentionExtractionResult to flat list of Mention objects.

        Converts pretty facet names from LLM to database facet names.

        Args:
            extraction: The structured extraction result from Pydantic AI.

        Returns:
            Flat list of Mention objects with database facet names.
        """
        mentions = []

        for facet_mention in extraction.facets:
            pretty_facet = facet_mention.facet
            # Map pretty name to database name
            database_facet = self.facet_name_mapping.get(pretty_facet, pretty_facet)
            for mention_text in facet_mention.mentions:
                mentions.append(Mention(text=mention_text, facet=database_facet))

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
