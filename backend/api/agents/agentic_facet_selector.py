"""Agentic facet selector using pydantic-ai tool calling.

This agent iteratively searches OpenSearch and reasons about results until it
finds satisfactory facet matches. Uses one tool:
1. search_concept - Search the concept database

The agent returns its final result directly as AgentResult.
"""

import os
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Protocol

from pydantic import BaseModel, Field
from pydantic_ai import Agent, RunContext
from pydantic_ai.usage import UsageLimits

from agents.agentic_facet_config import AgenticFacetConfig
from services.models import (
    FacetsResponse,
    FacetSelection,
    SelectedValue,
    SuggestedSynonym,
)


# Few-shot prompt with examples
AGENT_INSTRUCTIONS_COT = """Extract terms from queries and match to database concepts. Use EXACT facet names from search results.

## Examples

Query: "diabetic hispanic patients"
1. search_concept("diabetic") → low score, rephrase
2. search_concept("diabetes") → {facet: "diagnoses.disease", term: "Diabetes mellitus", score: 151}
3. search_concept("hispanic") → {facet: "donors.reported_ethnicity", term: "Hispanic or Latino", score: 140}
Output:
  facets: [{facet: "diagnoses.disease", term: "Diabetes mellitus", mention: "diabetic"},
           {facet: "donors.reported_ethnicity", term: "Hispanic or Latino", mention: "hispanic"}]
  suggested_synonyms: []

Query: "brain tumor"
1. search_concept("brain tumor") → {facet: "diagnoses.disease", term: "CNS or brain cancer", score: 65}
Output:
  facets: [{facet: "diagnoses.disease", term: "CNS or brain cancer", mention: "brain tumor"}]
  suggested_synonyms: [{facet: "diagnoses.disease", concept_term: "CNS or brain cancer",
                        suggested_synonym: "brain tumor", reasoning: "tumor and cancer are different words for similar concepts", confidence: 0.85}]

Query: "diabtes"  (typo)
1. search_concept("diabtes") → {facet: "diagnoses.disease", term: "Diabetes mellitus", score: 25}
Output:
  facets: [{facet: "diagnoses.disease", term: "Diabetes mellitus", mention: "diabtes"}]
  suggested_synonyms: []  ← NOT suggested because "diabtes" is just a typo of "diabetes"

Query: "alzheimers"
1. search_concept("alzheimers") → {facet: "diagnoses.disease", term: "Alzheimer's disease", score: 34}
Output:
  facets: [{facet: "diagnoses.disease", term: "Alzheimer's disease", mention: "alzheimers"}]
  suggested_synonyms: []  ← NOT suggested because "alzheimers" is same word, just missing apostrophe

Query: "patients with data"
Output:
  facets: []  ← no specific terms to search
  suggested_synonyms: []

## Rules
- Skip generic words: "patients", "data", "files", "samples", "with", "from"
- Low score (<50)? Try rephrasing: "diabetic"→"diabetes", "bam files"→"bam"
- Return the BEST matching term (highest score) for each mention
- Suggest synonym ONLY if query uses DIFFERENT WORDS than matched term (not typos/formatting)"""


# Minimal prompt without examples
AGENT_INSTRUCTIONS_MINIMAL = """Extract terms from queries, search with search_concept tool, return matches.
Skip generic words (patients, data, files). Use EXACT facet names from search results.
Suggest synonyms only for different words (tumor→cancer), not typos (diabtes→diabetes)."""


class FacetMatch(BaseModel):
    """A single facet match to submit."""

    facet: str = Field(description="Facet name (e.g., 'diagnoses.disease')")
    term: str = Field(description="Canonical term from database")
    mention: str = Field(description="Original mention from query")


class SynonymSuggestion(BaseModel):
    """A synonym suggestion from fuzzy match reasoning."""

    facet: str = Field(description="Facet name")
    concept_term: str = Field(description="The canonical term in the database")
    suggested_synonym: str = Field(description="The query term that should map to it")
    reasoning: str = Field(description="Why this synonym mapping is valid")
    confidence: float = Field(
        default=0.8, ge=0.0, le=1.0, description="Confidence score"
    )


class AgentResult(BaseModel):
    """Final result from the agent."""

    facets: List[FacetMatch] = Field(
        default_factory=list,
        description="List of matched facets",
    )
    suggested_synonyms: List[SynonymSuggestion] = Field(
        default_factory=list,
        description="Synonym suggestions for fuzzy matches",
    )


class ConceptResolverProtocol(Protocol):
    """Protocol for concept resolvers (OpenSearch or Mock)."""

    def resolve_mention_any_facet(self, mention: str, top_k: int = 5) -> List[Dict]:
        """Resolve a mention across all facets."""
        ...

    def resolve_mention_any_facet_with_expansion(
        self, mention: str, top_k: int = 10
    ) -> List[Dict]:
        """Resolve a mention with ontology hierarchy expansion."""
        ...

    def health_check(self) -> bool:
        """Check if resolver is healthy."""
        ...


@dataclass
class AgentDependencies:
    """Dependencies injected into the agent context."""

    resolver: ConceptResolverProtocol
    config: AgenticFacetConfig
    trace: List[Dict] = field(default_factory=list)


class AgenticFacetSelector:
    """Agentic facet selector using pydantic-ai tool calling.

    This selector uses an LLM agent that iteratively searches the concept
    database and reasons about results until it finds satisfactory matches.
    """

    def __init__(
        self,
        resolver: ConceptResolverProtocol,
        config: Optional[AgenticFacetConfig] = None,
        api_key: Optional[str] = None,
    ):
        """Initialize the agentic facet selector.

        Args:
            resolver: Concept resolver (OpenSearch or mock).
            config: Configuration options. If None, uses defaults.
            api_key: OpenAI API key. If None, reads from OPENAI_API_KEY env var.
        """
        self.resolver = resolver
        self.config = config or AgenticFacetConfig()

        # Set API key in environment if provided
        if api_key:
            os.environ["OPENAI_API_KEY"] = api_key

        # Select instructions based on CoT setting
        instructions = (
            AGENT_INSTRUCTIONS_COT
            if self.config.enable_cot
            else AGENT_INSTRUCTIONS_MINIMAL
        )

        # Create the pydantic-ai agent
        self.agent = Agent(
            model=f"openai:{self.config.model}",
            deps_type=AgentDependencies,
            output_type=AgentResult,
            instructions=instructions,
        )

        # Register tools
        self._register_tools()

    def _register_tools(self) -> None:
        """Register tools with the agent."""

        @self.agent.tool
        def search_concept(
            ctx: RunContext[AgentDependencies],
            term: str,
        ) -> List[Dict[str, Any]]:
            """Search the concept database for a term.

            Automatically tries exact matching first, then fuzzy matching.
            High scores (>100) indicate exact matches; lower scores are fuzzy.

            Args:
                ctx: Agent context with dependencies.
                term: The term to search for.

            Returns:
                List of matching concepts with facet names and scores.
            """
            # Record trace if enabled
            if ctx.deps.config.capture_trace:
                ctx.deps.trace.append(
                    {
                        "tool": "search_concept",
                        "args": {"term": term},
                    }
                )

            # Perform the search (expansion to descendants happens post-agent)
            results = ctx.deps.resolver.resolve_mention_any_facet(term, top_k=5)

            # Format results for the agent
            formatted = []
            for r in results:
                formatted.append(
                    {
                        "facet": r.get("facet_name", "unknown"),
                        "term": r.get("term", ""),
                        "name": r.get("name", ""),
                        "score": r.get("score", 0.0),
                    }
                )

            # Record results in trace
            if ctx.deps.config.capture_trace:
                ctx.deps.trace[-1]["results"] = formatted

            return formatted

    def select_facets(self, query: str) -> FacetsResponse:
        """Extract and match facets from a natural language query.

        Args:
            query: Natural language query string.

        Returns:
            FacetsResponse with extracted and matched facets.
        """
        if not query or not query.strip():
            return FacetsResponse(query=query, facets=[])

        # Initialize trace
        trace: List[Dict] = []

        # Create dependencies
        deps = AgentDependencies(
            resolver=self.resolver,
            config=self.config,
            trace=trace,
        )

        try:
            # Set usage limits based on max_iterations config
            usage_limits = UsageLimits(
                request_limit=self.config.max_iterations,
            )

            # Run the agent
            result = self.agent.run_sync(
                query,
                deps=deps,
                model_settings={
                    "timeout": self.config.timeout,
                    "temperature": 0,
                },
                usage_limits=usage_limits,
            )

            # Convert result to FacetsResponse
            return self._convert_to_response(query, result.output, trace)

        except Exception as e:
            print(f"Error in agentic facet selection: {e}")
            return FacetsResponse(query=query, facets=[])

    def _convert_to_response(
        self,
        query: str,
        result: AgentResult,
        trace: List[Dict],
    ) -> FacetsResponse:
        """Convert agent result to FacetsResponse.

        Args:
            query: Original query string.
            result: Agent output.
            trace: Captured trace (if enabled).

        Returns:
            FacetsResponse with grouped facet selections and synonym suggestions.
        """
        # Group facets by name
        facet_groups: Dict[str, List[SelectedValue]] = {}

        for match in result.facets:
            facet_name = match.facet
            if facet_name not in facet_groups:
                facet_groups[facet_name] = []

            facet_groups[facet_name].append(
                SelectedValue(
                    term=match.term,
                    mention=match.mention,
                    recognized=True,
                )
            )

        # Convert to FacetSelection list
        facet_selections = [
            FacetSelection(facet=name, selectedValues=values)
            for name, values in facet_groups.items()
        ]

        # Convert synonym suggestions
        suggested_synonyms = None
        if result.suggested_synonyms:
            suggested_synonyms = [
                SuggestedSynonym(
                    facet=s.facet,
                    concept_term=s.concept_term,
                    suggested_synonym=s.suggested_synonym,
                    reasoning=s.reasoning,
                    confidence=s.confidence,
                )
                for s in result.suggested_synonyms
            ]
            # Log suggestions for review
            self._log_synonym_suggestions(suggested_synonyms)

        return FacetsResponse(
            query=query,
            facets=facet_selections,
            suggested_synonyms=suggested_synonyms,
        )

    def _log_synonym_suggestions(self, suggestions: List[SuggestedSynonym]) -> None:
        """Log synonym suggestions for review.

        In a production system, this would write to a database or queue
        for human review. For now, logs to console and a file.

        Args:
            suggestions: List of synonym suggestions to log.
        """
        import json
        from datetime import datetime
        from pathlib import Path

        # Log to console
        for s in suggestions:
            print(
                f"[SYNONYM SUGGESTION] {s.suggested_synonym} → {s.concept_term} "
                f"(facet: {s.facet}, confidence: {s.confidence:.2f})"
            )

        # Append to suggestions file for review
        suggestions_file = Path(__file__).parent.parent / "synonym_suggestions.jsonl"
        with open(suggestions_file, "a") as f:
            for s in suggestions:
                entry = {
                    "timestamp": datetime.now().isoformat(),
                    "facet": s.facet,
                    "concept_term": s.concept_term,
                    "suggested_synonym": s.suggested_synonym,
                    "reasoning": s.reasoning,
                    "confidence": s.confidence,
                }
                f.write(json.dumps(entry) + "\n")

    def get_trace(self, deps: AgentDependencies) -> List[Dict]:
        """Get the captured trace from the last run.

        Args:
            deps: Agent dependencies containing the trace.

        Returns:
            List of trace entries if capture_trace was enabled, else empty list.
        """
        return deps.trace
