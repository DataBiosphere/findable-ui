"""LLM-based mention extraction using Pydantic AI and tool calling."""

from typing import List, Literal, Optional
from pydantic import BaseModel, Field
from pydantic_ai import Agent

from services.normalization_service import Mention
from services.llm_config import LLMConfig


# Facet context for the LLM
FACET_CONTEXT = """
You extract searchable facet values from genomic data queries.

Extract ATTRIBUTES (searchable values), not entity names (context words).
- Extract: "female" (attribute), "brain" (attribute), "RNA-seq" (attribute)
- Ignore: "patients", "samples", "data", "files" (entity names provide context only)

---

Facet Definitions:

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
  The molecular measurement or biological information type.
  Common examples: "RNA-seq", "methylation", "whole genome", "ATAC-seq", "SHARE-seq".

  Include modifiers: "single-cell RNA-seq", "bulk transcriptome", "spatial ATAC-seq"
  Extract complete phrases: "pacbio whole genome sequencing", "chromatin accessibility"
  Extract standalone terms: "genome", "gdna", "methylation"

- Diagnosis:
  Named diseases or individual phenotypic features.
  Examples: "diabetes", "cancer", "seizure", "cleft palate", "autism"

- Phenotype:
  Complex phenotype syndromes (multi-feature conditions).
  Examples: "Coffin-Siris syndrome", "Epileptic Encephalopathy"

- Organism Type:
  The organism species. Examples: "human", "mouse", "rat"

- Reported Ethnicity:
  Donor's ethnic or racial origins.
  Examples: "asian", "latino", "african american", "white", "hispanic", "european", "chicano"

- Phenotypic Sex:
  Biological sex of donor.
  Examples: "male", "female", "M", "F", "men", "women", "XY", "XX"

- Anatomical Site:
  Normal body location where biosample was taken.
  Examples: "brain", "liver", "kidney", "blood", "chest"
  Note: Extract site without generic suffixes ("brain tissue" → "brain")

- BioSample Type:
  Type of biosample.
  Examples: "organoids", "biopsies", "cell lines"

- File Format:
  File extension including compression.
  Examples: "bam", "fastq", "vcf.gz", "csv"

---

Extraction Rules:

1. Extract exact substrings from the query
2. Extract complete phrases with modifiers: "single-cell RNA-seq" (not just "RNA-seq")
3. Extract edge case phrases completely: "ethnicity not specified", "data modality none"
4. Extract synonyms and variants: "chicano", "european", "ispanic", "gdna", "genome"
5. Ignore generic entity names: "patients", "subjects", "donors", "samples", "data", "files"
6. Drop generic suffixes from anatomy: "brain tissue" → "brain"
7. Don't extract anatomy from disease names: "lung cancer" → just "lung cancer"
8. Extract disease without "patients": "diabetes patients" → "diabetes"
9. If no facet matches, use 'unmatched'

Examples:
- "single cell rna sequencing" → Data Modality: "single cell rna sequencing"
- "genome" → Data Modality: "genome"
- "gdna" → Data Modality: "gdna"
- "methylation" → Data Modality: "methylation"
- "chicano subjects" → Reported Ethnicity: "chicano"
- "european donors" → Reported Ethnicity: "european"
- "ispanic patients" → Reported Ethnicity: "ispanic"
- "ethnicity not specified" → Reported Ethnicity: "ethnicity not specified"
- "data modality none" → Data Modality: "data modality none"
- "female patients" → Phenotypic Sex: "female"
- "brain tissue" → Anatomical Site: "brain"
- "diabetes patients" → Diagnosis: "diabetes"
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

    facet: FacetName = Field(description="Facet category for the extracted mentions.")
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

    def __init__(
        self,
        config: Optional[LLMConfig] = None,
        facet_name_mapping: Optional[dict] = None,
    ):
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
            instructions=FACET_CONTEXT,
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

    def extract_mentions(self, query: str, timeout: float = 60.0) -> List[Mention]:
        """Extract mentions from a natural language query.

        Args:
            query: Natural language query string.
            timeout: Request timeout in seconds.

        Returns:
            List of Mention objects with extracted text and facet assignments.
        """
        if not query or not query.strip():
            return []

        try:
            # Run the agent with timeout
            result = self.agent.run_sync(query, model_settings={"timeout": timeout})

            # In pydantic-ai 1.x, the output is accessed via .output attribute
            extraction = result.output

            # Update stats if usage info is available
            if hasattr(result, "usage"):
                try:
                    usage = result.usage()
                    self.stats["total_queries"] += 1
                    self.stats["total_input_tokens"] += usage.input_tokens
                    self.stats["total_output_tokens"] += usage.output_tokens
                    self.stats["total_cost"] += self.config.estimate_cost(
                        usage.input_tokens, usage.output_tokens
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
