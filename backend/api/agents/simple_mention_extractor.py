"""LLM-based query normalization and typed mention extraction - Stage 1 of multi-stage pipeline.

Performs three tasks:
1. Normalize query (fix spelling, casing, hyphenation, punctuation)
2. Extract specific mention phrases (not generic head nouns)
3. Assign soft type hints with probabilities (routing priors, not final facets)

Uses pydantic-ai for structured output.
"""

import os
from typing import List, Literal, Optional

from pydantic import BaseModel, Field
from pydantic_ai import Agent


EXTRACTION_INSTRUCTIONS = """You are a query normalizer and typed mention extractor for a biomedical / genomics dataset search system.

The system matches user queries to pre-labeled dataset facets using a concept database.
Your job is to:
1) normalize surface form only
2) extract specific mention phrases
3) assign soft type hints (not final facets)

You MUST NOT decide the final facet or canonical concept.
You MUST NOT output generic category words as values.

────────────────────────────────────────
TASK A — Normalize (surface-form only)

Normalize the query by fixing:
- spelling
- casing
- punctuation
- hyphenation

Rules:
- Do NOT paraphrase.
- Do NOT add or remove concepts.
- Do NOT resolve ambiguity.
- Preserve word order.
- Record every change explicitly.

────────────────────────────────────────
TASK B — Extract typed mention candidates

Extract candidate mention phrases that could map to searchable dataset facets.

Key rules:
1) Prefer the MOST SPECIFIC multi-word phrase.
   - Extract "single-cell RNA sequencing", NOT "sequencing" or "assay".
2) Do NOT emit generic head nouns as standalone values
   (e.g., assay, sequencing, disease, cancer, sample, data, study),
   unless the word appears independently and is clearly the user's target.
3) Allow overlaps ONLY when they represent different semantic roles
   (e.g., "breast cancer" vs "breast tissue").
4) Mentions must be supported by the user text (original or normalized).
5) Over-generate slightly; ambiguity is allowed and expected.

────────────────────────────────────────
TASK C — Assign SOFT type hints (multi-valued)

For each mention:
- Propose one or more plausible type hints.
- Each type hint must include a probability.
- Type hints are ONLY routing priors for grounding.
- They are NOT final facets and may be wrong.

Allowed type hints (use only these):
- assay_or_modality
- disease_or_condition
- anatomy_or_tissue
- cell_type_or_state
- organism
- demographic
- treatment_or_perturbation
- platform_or_technology
- phenotype_or_trait
- file_format
- consent_or_access
- other

Rules:
- Multiple type hints are allowed per mention.
- Probabilities must sum to ≤ 1.0.
- If unsure, assign lower confidence or include "other".

────────────────────────────────────────
IMPORTANT FAILURE MODES TO AVOID

DO NOT DO THIS:
- Output "assay", "sequencing", "disease", "cancer" as standalone mentions
  when they are only heads of longer phrases.
- Collapse ambiguity prematurely.
- Assign final facets.
- Invent mentions not supported by the text.

GOOD BEHAVIOR:
- Use field names (type_hints) to express category,
  not generic words as values.
- If unsure whether something is disease vs anatomy,
  include both with probabilities.

Return JSON matching the specified schema."""


# Type definitions
EditType = Literal["spelling", "hyphenation", "punctuation", "case"]
SourceType = Literal["original", "normalized"]
TypeHintType = Literal[
    "assay_or_modality",
    "disease_or_condition",
    "anatomy_or_tissue",
    "cell_type_or_state",
    "organism",
    "demographic",
    "treatment_or_perturbation",
    "platform_or_technology",
    "phenotype_or_trait",
    "file_format",
    "consent_or_access",
    "other",
]


class Edit(BaseModel):
    """A surface-form edit made during normalization."""

    type: EditType = Field(
        description="Type of edit: spelling, hyphenation, punctuation, or case"
    )
    from_text: str = Field(description="Original text before edit", alias="from")
    to_text: str = Field(description="Corrected text after edit", alias="to")

    class Config:
        """Pydantic config."""

        populate_by_name = True


class EvidenceSpan(BaseModel):
    """Evidence span linking a mention to the source text."""

    source: SourceType = Field(
        description="Whether span is from original or normalized query"
    )
    text: str = Field(description="The text span as evidence")
    start: int = Field(description="Start character position in source", ge=0)
    end: int = Field(description="End character position in source", ge=0)


class TypeHint(BaseModel):
    """A soft type hint with probability."""

    type: TypeHintType = Field(description="The type hint category")
    p: float = Field(description="Probability for this type hint", ge=0.0, le=1.0)


class MentionRelations(BaseModel):
    """Relationships between mentions."""

    overlaps_with: Optional[List[str]] = Field(
        default=None, description="Other mentions this overlaps with"
    )
    submention_of: Optional[str] = Field(
        default=None,
        description="The broader mention this is a part of",
    )


class Mention(BaseModel):
    """A candidate concept mention extracted from the query."""

    text: str = Field(description="The specific mention phrase")
    confidence: float = Field(
        description="Overall confidence this is a real mention",
        ge=0.0,
        le=1.0,
    )
    type_hints: List[TypeHint] = Field(description="Soft type hints with probabilities")
    evidence_spans: List[EvidenceSpan] = Field(
        description="Evidence spans linking mention to source text"
    )
    relations: Optional[MentionRelations] = Field(
        default=None,
        description="Relationships to other mentions",
    )


class ExtractionResult(BaseModel):
    """Result of query normalization and mention extraction."""

    original: str = Field(description="Original user query (verbatim)")
    normalized: str = Field(description="Normalized query with surface-form fixes")
    edits: List[Edit] = Field(
        default_factory=list,
        description="List of edits made during normalization",
    )
    mentions: List[Mention] = Field(
        default_factory=list,
        description="Extracted mention candidates",
    )


class TermLookup(BaseModel):
    """A term prepared for Stage 2 OpenSearch lookup."""

    text: str = Field(description="The mention text to look up")
    confidence: float = Field(description="Confidence score for prioritization")
    type_hints: List[TypeHint] = Field(
        default_factory=list,
        description="Soft type hints for routing",
    )
    submention_of: Optional[str] = Field(
        default=None,
        description="Broader term this is a submention of",
    )


class SimpleMentionExtractor:
    """Stage 1: Normalize query and extract typed mentions using LLM.

    Uses pydantic-ai for structured output with a comprehensive prompt.
    Returns both the full extraction result (for debugging/explainability)
    and ordered terms for Stage 2 OpenSearch lookup.
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

    def extract(self, query: str, timeout: float = 30.0) -> ExtractionResult:
        """Extract structured mentions from a natural language query.

        Args:
            query: Natural language query string.
            timeout: Request timeout in seconds.

        Returns:
            ExtractionResult with normalized query and structured mentions.
        """
        if not query or not query.strip():
            return ExtractionResult(
                original=query, normalized=query, edits=[], mentions=[]
            )

        try:
            result = self.agent.run_sync(
                query, model_settings={"timeout": timeout, "temperature": 0}
            )
            return result.output

        except Exception as e:
            print(f"Error in extraction: {e}")
            # Return empty result on failure
            return ExtractionResult(
                original=query, normalized=query, edits=[], mentions=[]
            )

    def get_terms_for_lookup(self, result: ExtractionResult) -> List[TermLookup]:
        """Get terms ordered for Stage 2 lookup.

        Order: by confidence (descending)

        Args:
            result: The extraction result to process.

        Returns:
            List of TermLookup objects ordered for OpenSearch lookup.
        """
        terms = []

        # Sort by confidence descending
        for mention in sorted(result.mentions, key=lambda m: -m.confidence):
            terms.append(
                TermLookup(
                    text=mention.text,
                    confidence=mention.confidence,
                    type_hints=mention.type_hints,
                    submention_of=(
                        mention.relations.submention_of if mention.relations else None
                    ),
                )
            )

        return terms

    def extract_simple(self, query: str, timeout: float = 30.0) -> List[str]:
        """Extract just the mention texts (for backwards compatibility).

        Args:
            query: Natural language query string.
            timeout: Request timeout in seconds.

        Returns:
            List of extracted mention texts.
        """
        result = self.extract(query, timeout=timeout)
        return [m.text for m in result.mentions]
