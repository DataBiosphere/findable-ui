"""Query normalizer using LLM to structure and clean queries.

This module takes a natural language query and outputs structured
facet-value pairs with normalized terms. It handles:
- Typo correction: "ispanic" → "hispanic"
- Abbreviation expansion: "WGS" → "whole genome sequencing"
- Facet identification: "female" → {facet: "sex", value: "female"}
- Negation handling: "non-hispanic" → {facet: "ethnicity", value: "non-hispanic"}
"""

import json
import os
from typing import List, Optional

from pydantic import BaseModel, Field
from openai import OpenAI


class NormalizedMention(BaseModel):
    """A normalized mention with facet assignment."""

    facet: str = Field(description="Facet category")
    value: str = Field(description="Normalized value to search")
    original: str = Field(description="Original text from query")


class NormalizedQuery(BaseModel):
    """Result of query normalization."""

    mentions: List[NormalizedMention] = Field(default_factory=list)


QUERY_NORMALIZER_PROMPT = """Extract and normalize biomedical search terms into structured facet-value pairs.

Rules:
1. Extract ALL meaningful terms (adjectives, nouns, abbreviations)
2. Fix typos: "ispanic" → "hispanic", "diabtes" → "diabetes"
3. Expand abbreviations: "WGS" → "whole genome sequencing"
4. Map synonyms: "women" → "female", "men" → "male", "tumor" → "cancer"
5. ONLY skip these exact words alone: "patients", "samples", "data", "files", "with", "from", "for"
6. Keep terms that modify generic words: "female patients" → extract "female"

Facets: disease, sex, ethnicity, data_modality, consent_group, file_format, tissue

Examples:
"female patients" → [{"facet": "sex", "value": "female", "original": "female"}]
"male" → [{"facet": "sex", "value": "male", "original": "male"}]
"diabtes" → [{"facet": "disease", "value": "diabetes", "original": "diabtes"}]
"alzheimers" → [{"facet": "disease", "value": "alzheimer's disease", "original": "alzheimers"}]
"brain tumor" → [{"facet": "disease", "value": "brain cancer", "original": "brain tumor"}]
"WGS data" → [{"facet": "data_modality", "value": "whole genome sequencing", "original": "WGS"}]
"non ispanic" → [{"facet": "ethnicity", "value": "non-hispanic", "original": "non ispanic"}]
"GRU" → [{"facet": "consent_group", "value": "general research use", "original": "GRU"}]
"open access" → [{"facet": "consent_group", "value": "open access", "original": "open access"}]
"bam files" → [{"facet": "file_format", "value": "bam", "original": "bam"}]
"patients" → []

Query: "{query}"
Output:"""


class QueryNormalizer:
    """Normalize queries into structured facet-value pairs.

    Uses LLM to fix typos, expand abbreviations, and identify facets.
    """

    def __init__(
        self,
        model: str = "gpt-4o-mini",
        api_key: Optional[str] = None,
    ):
        """Initialize the query normalizer.

        Args:
            model: OpenAI model to use.
            api_key: OpenAI API key. If None, reads from OPENAI_API_KEY env var.
        """
        self.model = model
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        self.client = OpenAI(api_key=self.api_key)

    def normalize(self, query: str) -> NormalizedQuery:
        """Normalize a query into structured facet-value pairs.

        Args:
            query: Natural language query string.

        Returns:
            NormalizedQuery with list of facet-value mentions.
        """
        if not query or not query.strip():
            return NormalizedQuery(mentions=[])

        prompt = QUERY_NORMALIZER_PROMPT.replace("{query}", query)

        try:
            # GPT-5.x models use max_completion_tokens, older models use max_tokens
            token_param = (
                {"max_completion_tokens": 500}
                if self.model.startswith("gpt-5")
                else {"max_tokens": 500}
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
                items = json.loads(content)
            else:
                # Try to extract JSON array from response
                import re

                match = re.search(r"\[.*\]", content, re.DOTALL)
                if match:
                    items = json.loads(match.group())
                else:
                    return NormalizedQuery(mentions=[])

            # Convert to NormalizedMention objects
            mentions = []
            for item in items:
                if isinstance(item, dict) and "facet" in item and "value" in item:
                    mentions.append(
                        NormalizedMention(
                            facet=item["facet"],
                            value=item["value"],
                            original=item.get("original", item["value"]),
                        )
                    )

            return NormalizedQuery(mentions=mentions)

        except Exception as e:
            print(f"Error normalizing query: {e}")
            return NormalizedQuery(mentions=[])
