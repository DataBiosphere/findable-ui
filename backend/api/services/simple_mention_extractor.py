"""Simple LLM-based mention extraction - Stage 1 of multi-stage pipeline.

Extracts raw text spans from queries without facet classification.
Uses pydantic-ai for structured output with a minimal prompt.
"""

import os
from typing import List, Optional

from pydantic import BaseModel, Field
from pydantic_ai import Agent


EXTRACTION_INSTRUCTIONS = """Extract searchable terms from genomic data queries.

INCLUDE (as exact substrings):
- Diseases, conditions, syndromes
- Body parts, organs, anatomical sites
- Data types (RNA-seq, WGS, methylation, etc.)
- File formats (bam, vcf, fastq, etc.)
- Demographics (sex, ethnicity terms)
- Consent codes (GRU, HMB, etc.)
- Even misspelled terms - extract as-is

EXCLUDE only these: patients, samples, data, files, donors, subjects, from, with, for, and, the

Return the extracted terms as a list of exact substrings from the query."""


class ExtractionResult(BaseModel):
    """Result of mention extraction from a query."""

    terms: List[str] = Field(
        description="List of extracted terms (exact substrings from the query)."
    )


class SimpleMentionExtractor:
    """Stage 1: Extract raw text spans from query using LLM.

    Uses pydantic-ai for structured output with a minimal prompt.
    OpenSearch will determine the facet in Stage 2.
    """

    def __init__(self, api_key: Optional[str] = None, model: str = "gpt-4o-mini"):
        """Initialize the extractor.

        Args:
            api_key: OpenAI API key. If None, reads from OPENAI_API_KEY env var.
            model: OpenAI model to use.
        """
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        self.model = model

        # Set API key in environment if provided
        if self.api_key:
            os.environ["OPENAI_API_KEY"] = self.api_key

        # Create pydantic-ai agent
        self.agent = Agent(
            model=f"openai:{model}",
            output_type=ExtractionResult,
            instructions=EXTRACTION_INSTRUCTIONS,
        )

    def extract(self, query: str, timeout: float = 30.0) -> List[str]:
        """Extract text spans from a natural language query.

        Args:
            query: Natural language query string.
            timeout: Request timeout in seconds.

        Returns:
            List of extracted text spans (exact substrings from query).
        """
        if not query or not query.strip():
            return []

        try:
            result = self.agent.run_sync(query, model_settings={"timeout": timeout})
            return result.output.terms

        except Exception as e:
            print(f"Error in simple extraction: {e}")
            return []
