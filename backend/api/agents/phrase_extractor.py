"""Phrase extractor using LLM to identify meaningful search phrases.

This module extracts semantic phrases from natural language queries
WITHOUT assigning facets. The search layer determines facet assignment.

Examples:
- "hispanic women with breast cancer" → ["hispanic", "women", "breast cancer"]
- "WGS data from diabetic patients" → ["WGS", "diabetic"]
- "non-hispanic male samples" → ["non-hispanic", "male"]
"""

import json
import os
from typing import List, Optional

from pydantic import BaseModel, Field
from openai import OpenAI


class ExtractedPhrases(BaseModel):
    """Result of phrase extraction."""

    phrases: List[str] = Field(default_factory=list)


PHRASE_EXTRACTOR_PROMPT = """Extract meaningful search phrases from this biomedical query.

Rules:
1. Extract adjectives, nouns, and noun phrases that describe what the user wants
2. Keep compound terms together: "breast cancer", "whole genome sequencing", "non-hispanic"
3. Fix obvious typos: "diabtes" → "diabetes", "ispanic" → "hispanic"
4. Expand common abbreviations: "WGS" → "whole genome sequencing", "scRNA-seq" → "single-cell RNA sequencing"
5. Skip generic words that don't filter results: "patients", "samples", "data", "files", "datasets", "with", "from", "for", "the", "a", "an"
6. Keep modifiers attached: "female patients" → "female", "open access" → "open access"

Examples:
"female patients" → ["female"]
"hispanic women with breast cancer" → ["hispanic", "female", "breast cancer"]
"WGS data from diabetic patients" → ["whole genome sequencing", "diabetes"]
"non-hispanic male" → ["non-hispanic", "male"]
"scRNA-seq and snRNA-seq" → ["single-cell RNA sequencing", "single-nucleus RNA sequencing"]
"alzheimers disease samples" → ["alzheimer's disease"]
"open access GRU datasets" → ["open access", "general research use"]
"patients" → []

Return a JSON array of extracted phrases.

Query: "{query}"
Output:"""


class PhraseExtractor:
    """Extract meaningful search phrases from queries.

    Uses LLM to identify semantic units without facet assignment.
    Handles typos, abbreviations, and compound terms.
    """

    def __init__(
        self,
        model: str = "gpt-4o-mini",
        api_key: Optional[str] = None,
    ):
        """Initialize the phrase extractor.

        Args:
            model: OpenAI model to use.
            api_key: OpenAI API key. If None, reads from OPENAI_API_KEY env var.
        """
        self.model = model
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        self.client = OpenAI(api_key=self.api_key)

    def extract(self, query: str) -> ExtractedPhrases:
        """Extract meaningful phrases from a query.

        Args:
            query: Natural language query string.

        Returns:
            ExtractedPhrases with list of semantic phrases.
        """
        if not query or not query.strip():
            return ExtractedPhrases(phrases=[])

        prompt = PHRASE_EXTRACTOR_PROMPT.replace("{query}", query)

        try:
            # GPT-5.x models use max_completion_tokens, older models use max_tokens
            token_param = (
                {"max_completion_tokens": 300}
                if self.model.startswith("gpt-5")
                else {"max_tokens": 300}
            )
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0,
                **token_param,
            )

            content = response.choices[0].message.content.strip()

            # Parse JSON response
            if content.startswith("["):
                phrases = json.loads(content)
            else:
                # Try to extract JSON array from response
                import re

                match = re.search(r"\[.*\]", content, re.DOTALL)
                if match:
                    phrases = json.loads(match.group())
                else:
                    return ExtractedPhrases(phrases=[])

            # Filter to strings only
            phrases = [p for p in phrases if isinstance(p, str) and p.strip()]

            return ExtractedPhrases(phrases=phrases)

        except Exception as e:
            print(f"Error extracting phrases: {e}")
            return ExtractedPhrases(phrases=[])
