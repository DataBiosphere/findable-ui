# Tech Spec: Agentic Facet Selection (`compute_facets_agentic`)

**Status**: Draft
**Author**: Claude / Dave
**Date**: 2026-01-19
**Related Issue**: #744

---

## 1. Overview

This document specifies a new implementation approach for facet selection that uses an **agentic architecture** rather than the current pipeline-based approach. The new `compute_facets_agentic()` function will accept the same inputs and return the same output shape as existing implementations, but will use an LLM agent with tools to dynamically reason about the facet extraction and normalization process.

### 1.1 Goals

1. **Same interface**: Accept `query: str`, return `FacetsResponse`
2. **Dynamic reasoning**: Allow the agent to decide when/how to use tools based on query complexity
3. **Improved handling of ambiguity**: Agent can reason about uncertain cases rather than following fixed rules
4. **Self-correction**: Agent can retry or adjust approach when initial attempts fail
5. **Transparent decision-making**: Capture agent reasoning for debugging and evaluation

### 1.2 Non-Goals (for v1)

- Multi-turn conversation (single query in, facets out)
- User interaction or clarification requests
- Caching or performance optimization
- Production hardening

---

## 2. Current Architecture (Context)

The existing `compute_facets_multistage()` uses a fixed 4-stage pipeline:

```
Query → Extract → Lookup → Normalize → Re-lookup → Response
```

**Limitations of pipeline approach**:

- Fixed sequence regardless of query complexity
- No backtracking or self-correction
- Can't reason about why a lookup failed
- Treats all mentions uniformly (no prioritization)

---

## 3. Proposed Agentic Architecture

### 3.1 High-Level Design

```
┌─────────────────────────────────────────────────────────────┐
│                    Facet Selection Agent                    │
│                                                             │
│  System Prompt: Search & normalization instructions         │
│  User Message: The natural language query                   │
│                                                             │
│  Tools Available (just 3):                                  │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ search_concept  │  │ normalize_term  │                  │
│  │ (OpenSearch)    │  │ (LLM)           │                  │
│  └─────────────────┘  └─────────────────┘                  │
│  ┌─────────────────┐                                       │
│  │ submit_result   │                                       │
│  │ (final answer)  │                                       │
│  └─────────────────┘                                       │
│                                                             │
│  Agent Loop: Think → Act → Observe → Repeat until done     │
└─────────────────────────────────────────────────────────────┘
```

**Key Design Choices**:

1. **No facet list in prompt** - facets discovered via search results
2. **No extraction tool** - agent reasons about what to search directly

### 3.2 Agent Tools

Only 3 tools - extraction happens in the agent's reasoning, not via a tool.

#### Tool 1: `search_concept`

Search OpenSearch for a term across all facets. Returns matching concepts with their facet membership.

```python
def search_concept(
    term: str,
    fuzzy: bool = False
) -> list[SearchResult]

@dataclass
class SearchResult:
    facet: str           # e.g., "diagnoses.disease" (discovered, not pre-known)
    term: str            # e.g., "MONDO:0005015"
    display_name: str    # e.g., "diabetes mellitus"
    score: float         # Match confidence
```

**Note**: No `facet_name` parameter - we don't assume the agent knows facets upfront. Facets are discovered through search results.

#### Tool 2: `normalize_term`

Use LLM to normalize a term to its canonical form.

```python
def normalize_term(
    term: str,
    context: str | None = None  # Optional hint about expected type
) -> NormalizedResult

@dataclass
class NormalizedResult:
    original: str
    normalized: str
    transformation: str  # e.g., "adjective_to_noun", "spelling_fix"
```

#### Tool 3: `submit_result`

Submit the final facet selections (terminates agent loop).

```python
def submit_result(
    facet_selections: list[FacetSelection]
) -> None  # Terminates agent
```

### 3.3 Agent System Prompt

```
You are a facet selection agent. Your task is to analyze a user's natural
language query and identify which facet values should be selected.

You do NOT have a predefined list of facets. Instead, you will discover
which facets exist by searching the concept database. The search results
will tell you which facet each matching term belongs to.

WORKFLOW:
1. Read the query and identify SPECIFIC terms worth searching
   - Skip generic head nouns: "files", "patients", "samples", "data"
   - Search for specific terms: "bam", "diabetes", "hispanic", "whole genome"
2. For each promising term:
   a. Search for exact matches first (search_concept with fuzzy=False)
   b. If no match, try normalization (normalize_term) then search again
   c. If still no match, try fuzzy search (search_concept with fuzzy=True)
3. When done, call submit_result with all confirmed facet selections

GUIDELINES:
- Prefer exact matches over fuzzy matches
- Users may use synonyms, abbreviations, adjective forms, or informal terms
- If a term could match multiple facets, prefer the higher-confidence match
- Include unrecognized terms with recognized=False so users know what wasn't matched
```

### 3.4 Example Agent Traces

#### Example 1: Straightforward query

**Query**: "bam files from diabetic hispanic patients"

```
Agent: Looking at this query, I see specific terms worth searching:
       - "bam" (file format)
       - "diabetic" (medical condition)
       - "hispanic" (ethnicity)
       Skipping "files" and "patients" - too generic.

→ search_concept(term="bam", fuzzy=False)
← [SearchResult(facet="files.file_format", term=".bam", score=1.0)]

→ search_concept(term="diabetic", fuzzy=False)
← []  # No exact match

Agent: "diabetic" didn't match. It's an adjective form, let me normalize.

→ normalize_term(term="diabetic", context="medical condition")
← NormalizedResult(original="diabetic", normalized="diabetes",
                   transformation="adjective_to_noun")

→ search_concept(term="diabetes", fuzzy=False)
← [SearchResult(facet="diagnoses.disease", term="MONDO:0005015",
                display_name="diabetes mellitus", score=0.95)]

→ search_concept(term="hispanic", fuzzy=False)
← [SearchResult(facet="donors.reported_ethnicity",
                term="Hispanic or Latino", score=0.92)]

Agent: All terms resolved. Submitting.

→ submit_result([
    FacetSelection(facet="files.file_format",
                   selectedValues=[SelectedValue(term=".bam", mention="bam")]),
    FacetSelection(facet="diagnoses.disease",
                   selectedValues=[SelectedValue(term="MONDO:0005015", mention="diabetic")]),
    FacetSelection(facet="donors.reported_ethnicity",
                   selectedValues=[SelectedValue(term="Hispanic or Latino", mention="hispanic")])
  ])
```

#### Example 2: Multi-word terms

**Query**: "whole genome sequencing data from lung tissue samples"

```
Agent: Looking at this query:
       - "whole genome sequencing" - specific data modality
       - "lung" or "lung tissue" - anatomical site
       Skipping "data" and "samples" - generic head nouns.

→ search_concept(term="whole genome sequencing", fuzzy=False)
← [SearchResult(facet="files.data_modality", term="Whole Genome Sequencing",
                display_name="Whole Genome Sequencing", score=0.98)]

→ search_concept(term="lung", fuzzy=False)
← [SearchResult(facet="biosamples.anatomical_site", term="UBERON:0002048",
                display_name="lung", score=0.95)]

Agent: Found matches. Submitting.

→ submit_result([
    FacetSelection(facet="files.data_modality",
                   selectedValues=[SelectedValue(term="Whole Genome Sequencing",
                                                 mention="whole genome sequencing")]),
    FacetSelection(facet="biosamples.anatomical_site",
                   selectedValues=[SelectedValue(term="UBERON:0002048", mention="lung")])
  ])
```

---

## 4. Interface Specification

### 4.1 Configuration

```python
@dataclass
class AgentConfig:
    """Configuration for the agentic facet selector."""

    # Chain of Thought control
    enable_cot: bool = True  # If False, suppress reasoning in responses

    # Execution limits
    max_iterations: int = 10  # Max tool calls before forced termination

    # Model selection
    model: str = "gpt-4o-mini"  # Can swap for evaluation

    # Debugging/evaluation
    capture_trace: bool = False  # If True, return agent reasoning trace
```

**CoT Toggle Behavior**:

- `enable_cot=True`: Agent reasons step-by-step before each tool call
- `enable_cot=False`: Agent makes tool calls directly with minimal explanation

This allows A/B testing:
| Metric | CoT=True | CoT=False |
|--------|----------|-----------|
| Accuracy | ? | ? |
| Latency | Higher (more tokens) | Lower |
| Cost | Higher | Lower |
| Debuggability | Better | Worse |

### 4.2 Function Signature

```python
def compute_facets_agentic(
    query: str,
    config: AgentConfig | None = None
) -> FacetsResponse:
    """
    Agentic facet selection using LLM with tools.

    Args:
        query: Natural language query from user.
        config: Optional configuration. Uses defaults if not provided.

    Returns:
        FacetsResponse with extracted and normalized facets.
    """
```

### 4.3 Output Shape (unchanged)

```python
class FacetsResponse(BaseModel):
    query: str
    facets: list[FacetSelection]

class FacetSelection(BaseModel):
    facet: str
    selectedValues: list[SelectedValue]

class SelectedValue(BaseModel):
    term: str
    mention: str
    recognized: bool = True
```

---

## 5. Implementation Plan

### Phase 1: Tool Implementation

- [ ] Create `search_concept` tool (wraps OpenSearchConceptResolver)
- [ ] Create `normalize_term` tool (wraps LLMMentionNormalizer)
- [ ] Create `submit_result` tool (terminates agent, returns result)

### Phase 2: Agent Setup

- [ ] Define agent with pydantic-ai
- [ ] Write system prompt (no facet context - discovery-based)
- [ ] Configure tool bindings
- [ ] Implement agent invocation in `compute_facets_agentic()`

### Phase 3: Integration & Testing

- [ ] Add endpoint mode for agentic approach
- [ ] Create test cases comparing agentic vs multistage results
- [ ] Evaluate on existing eval dataset

---

## 6. Evaluation Criteria

### 6.1 Agentic vs Pipeline

Compare `compute_facets_agentic` against `compute_facets_multistage`:

| Metric          | Description                                           |
| --------------- | ----------------------------------------------------- |
| **Accuracy**    | % of mentions correctly resolved to facets            |
| **Recall**      | % of facet-relevant terms extracted from query        |
| **Precision**   | % of extracted terms that are actually facet-relevant |
| **Latency**     | Time to complete (agent may have more LLM calls)      |
| **Token Usage** | Total tokens consumed (cost proxy)                    |

### 6.2 CoT vs No-CoT

Compare `enable_cot=True` vs `enable_cot=False`:

| Metric      | CoT=True | CoT=False       |
| ----------- | -------- | --------------- |
| Accuracy    | Baseline | Δ from baseline |
| Latency     | Baseline | Δ from baseline |
| Token Usage | Baseline | Δ from baseline |

**Hypothesis**: CoT may improve accuracy on complex/ambiguous queries but add overhead on simple ones.

---

## 7. Open Questions

1. **Parallelism**: Should agent be able to search multiple terms concurrently?
2. **Confidence thresholds**: Should agent have configurable thresholds for accepting matches?
3. **Fallback behavior**: What happens if agent fails? Fall back to multistage?

---

## 8. Risks & Mitigations

| Risk                              | Mitigation                            |
| --------------------------------- | ------------------------------------- |
| Agent enters infinite loop        | Set max_iterations limit              |
| Higher latency than pipeline      | Accept for v1; optimize later         |
| Unpredictable behavior            | Comprehensive logging + eval suite    |
| Cost increase from more LLM calls | Monitor token usage; consider caching |

---

## Appendix A: Comparison with Pipeline Approach

| Aspect             | Pipeline (multistage)     | Agentic                           |
| ------------------ | ------------------------- | --------------------------------- |
| Control flow       | Fixed sequence            | Dynamic, agent-decided            |
| Error recovery     | Limited (pass through)    | Can retry with different strategy |
| Ambiguity handling | Rule-based                | Reasoning-based                   |
| Debugging          | Inspect each stage output | Inspect agent trace               |
| Latency            | Predictable               | Variable                          |
| Cost               | Fixed LLM calls           | Variable LLM calls                |

---

## Appendix B: Could We Use Least-to-Most Prompting?

**Short answer**: Possibly, but not for v1.

**How it might apply**:

In least-to-most prompting, you'd explicitly order terms by difficulty and solve easy ones first, using those results to inform harder ones:

```
Query: "wgs data from diabetic patients with heart-related phenotypes"

Decomposition (easy → hard):
1. "wgs" → likely exact match to data modality (EASY)
2. "diabetic" → needs adjective→noun normalization (MEDIUM)
3. "heart-related phenotypes" → ambiguous, many possible matches (HARD)

Solve in order:
1. wgs → "Whole Genome Sequencing" (files.data_modality) ✓
2. diabetic → diabetes → "MONDO:0005015" (diagnoses.disease) ✓
3. "heart-related phenotypes" → Now knowing we're in a medical/genomic
   context with disease facets active, can better disambiguate...
```

**Why not for v1**:

- Adds complexity to prompt/orchestration
- Agent can already use earlier results naturally when reasoning
- Unclear if the overhead is worth it for typical query complexity

**Potential v2 experiment**:

- Add `enable_least_to_most: bool` to config
- Measure if it improves accuracy on complex/ambiguous queries

---

## Appendix C: Glossary

| Term                        | Definition                                                                                                                                                                                                 |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Chain of Thought (CoT)**  | Prompting technique where the model reasons step-by-step before answering. Improves accuracy on complex tasks but increases token usage.                                                                   |
| **Facet**                   | A filterable dimension in the data (e.g., "Diagnosis", "File Format"). Users select facet values to narrow search results.                                                                                 |
| **Head noun**               | The main noun in a noun phrase (e.g., "files" in "bam files", "patients" in "diabetic patients"). Often too generic to match specific facet values.                                                        |
| **Least-to-Most Prompting** | Prompting technique that decomposes complex problems into simpler subproblems, solves them from easiest to hardest, and uses earlier solutions to help solve later ones. Introduced by Zhou et al. (2022). |
| **Mention**                 | A span of text in the user's query that potentially maps to a facet value (e.g., "diabetes" might map to diagnosis facet).                                                                                 |
| **Normalization**           | Converting a term to its canonical form (e.g., "diabetic" → "diabetes", "wgs" → "whole genome sequencing").                                                                                                |
| **Tool (in agent context)** | A function the agent can call to interact with external systems (e.g., search a database, call an API). The agent decides when and how to use tools.                                                       |
