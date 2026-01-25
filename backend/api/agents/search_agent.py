"""Simple search agent with one tool - like how Claude Code works.

This agent has a single search(text) tool that searches across all facets.
It iterates and tries variations until it finds matches.
Facets are discovered from results, not guessed upfront.
"""

import os
from dataclasses import dataclass
from typing import List, Dict, Any, Optional

from pydantic import BaseModel
from pydantic_ai import Agent, RunContext


@dataclass
class SearchContext:
    """Context passed to the agent with search capability."""

    resolver: Any  # OpenSearchConceptResolver


class FacetMatch(BaseModel):
    """A matched facet value."""

    facet: str
    term: str
    original_query: str


class SearchAgentResult(BaseModel):
    """Final result from the search agent."""

    matches: List[FacetMatch]


SYSTEM_PROMPT = """You help users find data by searching a biomedical catalog.

You have ONE tool: search(text)
- It searches across ALL facets (disease, sex, ethnicity, data type, etc.)
- It returns matching concepts with their facet names and scores
- Higher scores (>100) are better matches

Your job:
1. Identify the meaningful terms in the user's query (skip words like "patients", "data", "samples")
2. Search each meaningful term
3. For each search, return ONLY the single highest-scoring match
4. If no matches found, try ONE variation (synonym or expansion)
5. Return ONLY matches that clearly fit the user's intent

IMPORTANT: Be selective about WHICH concepts to return
- If search returns DIFFERENT concepts, pick ONLY the top-scoring one
- Example: search("epilepsy") returns Epilepsy (257) and Seizures (116) → only return Epilepsy
- But if the SAME term appears in multiple facets, include all of them
- Example: search("GRU") returns GRU in consent_group (257) and GRU in data_use_permission (247) → return both

Be precise:
- "female patients" → search("female") → return Female
- "hispanic women" → search("hispanic"), search("women") → return top match for each
- "GRU" → search("GRU") → return GRU from ALL facets it appears in
- "epilepsy" → search("epilepsy") → return Epilepsy only (not Seizures - different concept)

Do NOT:
- Include related but DIFFERENT concepts (Epilepsy vs Seizures)
- Make up search terms the user didn't mention
- Expand abbreviations yourself - let the search handle it
"""

# TODO: Future enhancement - when top matches have very close scores (within 10-20%),
# return an "ambiguous" flag so the UI can ask the user to clarify which they meant.
# Example: search("tumor") might match "Brain tumor" (score: 85) and "Tumor" (score: 82)
# → ask user: "Did you mean brain tumor or tumor in general?"


def create_search_agent(model: str = "gpt-4o-mini") -> Agent:
    """Create the search agent with a single search tool.

    Args:
        model: OpenAI model to use.

    Returns:
        Configured pydantic-ai Agent.
    """
    agent = Agent(
        model=f"openai:{model}",
        instructions=SYSTEM_PROMPT,
        deps_type=SearchContext,
        output_type=SearchAgentResult,
    )

    @agent.tool
    def search(ctx: RunContext[SearchContext], text: str) -> str:
        """Search for a term across all facets.

        Args:
            text: The text to search for (can be a word, phrase, or abbreviation).

        Returns:
            Matching concepts with their facets and scores, or "No matches found".
        """
        resolver = ctx.deps.resolver
        results = resolver.resolve_mention_any_facet(text, top_k=5)

        if not results:
            return f"No matches found for '{text}'"

        # Format results for the agent
        formatted = []
        for r in results:
            formatted.append(
                f"- {r['term']} (facet: {r['facet_name']}, score: {r['score']:.1f})"
            )

        return f"Matches for '{text}':\n" + "\n".join(formatted)

    return agent


def run_search_agent(
    query: str,
    model: str = "gpt-4o-mini",
    resolver: Optional[Any] = None,
) -> SearchAgentResult:
    """Run the search agent on a query.

    Args:
        query: Natural language query from user.
        model: OpenAI model to use.
        resolver: Optional OpenSearchConceptResolver (created if not provided).

    Returns:
        SearchAgentResult with list of facet matches.
    """
    # Create resolver if not provided
    if resolver is None:
        from services.opensearch_concept_resolver import OpenSearchConceptResolver

        resolver = OpenSearchConceptResolver()

    # Create and run agent
    agent = create_search_agent(model=model)
    context = SearchContext(resolver=resolver)

    result = agent.run_sync(query, deps=context)
    return result.output
