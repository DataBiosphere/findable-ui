"""Span extractor using LLM for mention extraction.

This module provides a simple LLM-based span extraction that identifies
searchable phrases from natural language queries. It handles:
- Compound terms: "single-cell RNA sequencing"
- Negations: "non-hispanic"
- Unspecified phrases: "disease not specified"
- Filtering generic words: "patients", "data", "files"
"""

import json
import os
from typing import List, Optional

from openai import OpenAI


SPAN_EXTRACTION_PROMPT = """Extract searchable phrases from biomedical queries.

Rules:
- Keep compound terms together: "single-cell RNA sequencing" not ["single", "cell", "RNA", "sequencing"]
- Keep negations attached: "non-hispanic" not ["non", "hispanic"]
- Keep "not/unspecified" phrases: "disease not specified" → "disease not specified"
- Remove ONLY these generic words: patients, samples, subjects, donors
- Remove prepositions: with, from, for, in, of, the, and
- Keep abbreviations even when alone: "WGS", "scRNA-seq", "HMB", "GRU"
- Preserve typos as-is: "diabtes" → "diabtes" (let search handle fuzzy matching)
- Return empty list ONLY if the query has no meaningful terms at all

Examples:

Query: "female patients"
Spans: ["female"]

Query: "diabetic hispanic patients"
Spans: ["diabetic", "hispanic"]

Query: "non-hispanic patients"
Spans: ["non-hispanic"]

Query: "single-cell RNA sequencing data"
Spans: ["single-cell RNA sequencing"]

Query: "patients with diabetes and breast cancer"
Spans: ["diabetes", "breast cancer"]

Query: "WGS files"
Spans: ["WGS"]

Query: "WGS data"
Spans: ["WGS"]

Query: "scRNA-seq"
Spans: ["scRNA-seq"]

Query: "open access datasets"
Spans: ["open access"]

Query: "disease not specified"
Spans: ["disease not specified"]

Query: "ethnicity unspecified"
Spans: ["ethnicity unspecified"]

Query: "diabtes"
Spans: ["diabtes"]

Query: "male patients"
Spans: ["male"]

Query: "female"
Spans: ["female"]

Query: "bam files"
Spans: ["bam"]

Query: "patients"
Spans: []

Query: "{query}"
Spans:"""


class SpanExtractor:
    """Extract searchable spans from natural language queries.

    Uses a simple few-shot LLM prompt to identify meaningful phrases
    while filtering out generic words and preserving compound terms.
    """

    def __init__(
        self,
        model: str = "gpt-4o-mini",
        api_key: Optional[str] = None,
    ):
        """Initialize the span extractor.

        Args:
            model: OpenAI model to use.
            api_key: OpenAI API key. If None, reads from OPENAI_API_KEY env var.
        """
        self.model = model
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        self.client = OpenAI(api_key=self.api_key)

    def extract_spans(self, query: str) -> List[str]:
        """Extract searchable spans from a query.

        Args:
            query: Natural language query string.

        Returns:
            List of extracted spans (phrases to search).
        """
        if not query or not query.strip():
            return []

        prompt = SPAN_EXTRACTION_PROMPT.format(query=query)

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0,
                max_tokens=200,
            )

            # Parse the response - expecting a JSON array
            content = response.choices[0].message.content.strip()

            # Handle various response formats
            if content.startswith("["):
                spans = json.loads(content)
            elif content == "[]" or not content:
                spans = []
            else:
                # Try to extract JSON array from response
                import re

                match = re.search(r"\[.*?\]", content, re.DOTALL)
                if match:
                    spans = json.loads(match.group())
                else:
                    # Fallback: split by comma if it looks like a list
                    spans = [s.strip().strip("\"'") for s in content.split(",")]
                    spans = [s for s in spans if s]

            return spans

        except Exception as e:
            print(f"Error extracting spans: {e}")
            return []
