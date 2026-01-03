"""LLM-based mention normalization - Stage 3 of multi-stage pipeline.

Normalizes unmatched terms to canonical forms for better database matching.
Only called when OpenSearch lookup fails in Stage 2.
Uses pydantic-ai for structured output.
"""

import os
from typing import Dict, Optional

from pydantic import BaseModel, Field
from pydantic_ai import Agent


NORMALIZATION_INSTRUCTIONS = """Convert terms to canonical medical/scientific form for database matching.

Rules:
- Convert adjective forms to noun forms (diabetic → diabetes)
- Fix common typos (ispanic → hispanic)
- Keep the term if it's already canonical
- Return just the normalized term"""


class NormalizationResult(BaseModel):
    """Result of term normalization."""

    term: str = Field(description="The normalized form of the input term.")


class LLMMentionNormalizer:
    """Stage 3: Normalize unmatched terms using LLM.

    Converts terms to canonical forms that are more likely to match in the database.
    Uses pydantic-ai for structured output.

    Examples:
    - "diabetic" → "diabetes"
    - "ispanic" → "hispanic"
    - "genomic dna" → "genomic DNA"
    """

    def __init__(self, api_key: Optional[str] = None, model: str = "gpt-4o-mini"):
        """Initialize the normalizer.

        Args:
            api_key: OpenAI API key. If None, reads from OPENAI_API_KEY env var.
            model: OpenAI model to use.
        """
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        self.model = model
        self._cache: Dict[str, str] = {}  # Cache normalized terms

        # Set API key in environment if provided
        if self.api_key:
            os.environ["OPENAI_API_KEY"] = self.api_key

        # Create pydantic-ai agent
        self.agent = Agent(
            model=f"openai:{model}",
            output_type=NormalizationResult,
            instructions=NORMALIZATION_INSTRUCTIONS,
        )

    def normalize(self, term: str, timeout: float = 10.0) -> str:
        """Normalize a term to its canonical form.

        Args:
            term: The term to normalize.
            timeout: Request timeout in seconds.

        Returns:
            Normalized form of the term. Returns original if normalization fails.
        """
        if not term or not term.strip():
            return term

        term = term.strip()

        # Check cache first
        cache_key = term.lower()
        if cache_key in self._cache:
            return self._cache[cache_key]

        try:
            result = self.agent.run_sync(term, model_settings={"timeout": timeout})
            normalized = result.output.term

            # Cache the result
            self._cache[cache_key] = normalized

            return normalized

        except Exception as e:
            print(f"Error normalizing term '{term}': {e}")
            return term  # Return original on failure

    def clear_cache(self) -> None:
        """Clear the normalization cache."""
        self._cache.clear()

    def get_cache_stats(self) -> Dict[str, int]:
        """Get cache statistics.

        Returns:
            Dict with cache size.
        """
        return {"cache_size": len(self._cache)}
