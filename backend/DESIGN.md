# AI Facet Selector - Design Document

## Overview

The AI Facet Selector is a natural language interface for querying genomic datasets. It parses user queries, extracts relevant concepts, normalizes them against a concept database, and returns structured facet selections that the browser can use to filter datasets.

## User Story

As a researcher, I want to search for genomic datasets using natural language queries (e.g., "public bam files for latino patients with diabetes"), and have the system automatically identify and normalize my search terms to the correct facets and values in the dataset catalog.

## Architecture

### Flow

```
User Query (Natural Language)
    ↓
[1] Mention Extraction & Facet Tagging (LLM-based)
    ↓
Mentions with tentative facet assignments
    ↓
[2] Mention Normalization (Concept Database)
    ↓
Normalized Facets with standard terms
    ↓
[3] Return to Browser
    ↓
Browser selects facets in UI
    ↓
[4] Dataset Query (AND across facets, OR within facets)
    ↓
Results + Unmatched Terms
```

### Components

#### 1. Mention Extraction & Facet Tagging
- **Input**: Natural language query (string)
- **Process**: Use LLM to identify concept mentions and assign tentative facets
- **Output**: List of mentions with facet assignments
- **Example**:
  ```
  Query: "public bam files for latino patients with diabetes"
  Output:
  - "public" → Access facet
  - "bam" → File Format facet
  - "latino" → Reported Ethnicity facet
  - "diabetes" → Diagnosis facet
  ```

#### 2. Mention Normalization
- **Input**: Mentions with facet assignments
- **Process**: Look up each mention in concept database to find normalized term
- **Output**: Normalized facets with standard terms (or "unknown" if not found)
- **Example**:
  ```
  Input: "latino" → Reported Ethnicity
  Lookup in concept database
  Output: "Hispanic or Latino" (normalized term)

  Input: "diabetes" → Diagnosis
  Lookup in concept database
  Output: "MONDO:0005015" (ontology ID)
  ```

#### 3. Browser Facet Selection
- **Input**: Normalized facets from API
- **Process**: Browser renders facets in UI, user can review/modify
- **Output**: Facet query structure

#### 4. Dataset Query
- **Input**: Selected facets
- **Process**: Query datasets with AND across facets, OR within facets
- **Logic**:
  ```
  (Access = "Granted")
  AND (Diagnosis = "MONDO:0005015" OR Diagnosis = "MONDO:0005148")
  AND (File Format = ".bam")
  ```
- **Output**: Matching datasets + list of unmatched/unknown terms

## Current State

### Implemented
- ✅ FastAPI backend structure (`backend/api/`)
- ✅ Health check endpoint
- ✅ Facets endpoint (`/api/v0/facets`)
- ✅ Stubbed facets service (`compute_facets_from_query`)
- ✅ Pydantic models for request/response
- ✅ Basic test infrastructure

### Existing Resources
- ✅ Concept database (OpenSearch)
- ✅ Dataset database (location TBD)
- ✅ Predefined facet schema for datasets

## Implementation Plan

### Phase 1: Mention Normalization Service (Next Step)
**Goal**: Build the service that normalizes mentions against the concept database

**Tasks**:
1. Define concept database interface/client
2. Implement normalization lookup service
3. Handle edge cases (unknown terms, partial matches, synonyms)
4. Return normalized facets in API response format

**Testing Strategy**:
- Mock concept database responses
- Use fixture data with known mention → normalized term mappings
- Test cases:
  - Exact match found
  - Synonym match found
  - No match found (return "unknown")
  - Multiple facets with multiple mentions
  - Empty mentions

**Deliverable**: Service that takes `List[Mention]` and returns `List[NormalizedFacet]`

### Phase 2: LLM Mention Extraction
**Goal**: Replace stub with real LLM-based mention extraction

**Tasks**:
1. Design LLM prompt for mention extraction and facet tagging
2. Integrate OpenAI API (already in requirements.txt)
3. Parse LLM response into structured mentions
4. Handle edge cases (ambiguous mentions, unrecognized terms)

**Testing Strategy**:
- Mock LLM API responses
- Use fixture queries with expected mention extractions
- Test edge cases (empty query, gibberish, technical terms)

**Deliverable**: LLM-powered mention extraction replacing stub

### Phase 3: Concept Database Integration
**Goal**: Connect to real OpenSearch concept database

**Tasks**:
1. Set up OpenSearch client configuration
2. Implement search/lookup against concept index
3. Handle synonym matching and fuzzy search
4. Map concept results to facet values

**Testing Strategy**:
- Integration tests against test OpenSearch instance
- Mock OpenSearch client for unit tests
- Test with real concept data samples

**Deliverable**: Live concept database lookups

### Phase 4: Dataset Query Integration
**Goal**: Enable browser to query datasets with normalized facets

**Tasks**:
1. Define dataset query endpoint
2. Implement facet-based filtering (AND/OR logic)
3. Return matched datasets + unmatched terms
4. Performance optimization

**Testing Strategy**:
- Test query logic with fixture dataset data
- Validate AND/OR semantics
- Test empty results, partial matches

**Deliverable**: Working dataset query endpoint

### Phase 5: Error Handling & Edge Cases
**Goal**: Robust production-ready system

**Tasks**:
1. Handle malformed queries
2. Rate limiting and timeout handling
3. Logging and monitoring
4. Input validation and sanitization

## Data Models

### Current Models (see `services/models.py`)

```python
class SelectedValue(BaseModel):
    term: str          # Normalized term or "unknown"
    mention: str       # Original query text

class FacetSelection(BaseModel):
    facet: str         # Facet name or "unknown"
    selectedValues: list[SelectedValue]

class FacetsResponse(BaseModel):
    query: str         # Original query
    facets: list[FacetSelection]
```

### Future Models (for Phase 2)

```python
class Mention(BaseModel):
    text: str              # Original mention from query
    facet: str            # Tentative facet assignment
    confidence: float     # LLM confidence score

class ConceptMatch(BaseModel):
    mention: str          # Original mention
    normalized_term: str  # Normalized term from database
    concept_id: str       # Database concept ID
    match_type: str       # "exact" | "synonym" | "fuzzy" | "none"
```

## Open Questions

1. **How do we handle ambiguous mentions?** (e.g., "ALS" could be disease or chemical)
   - Use context from other mentions?
   - Return multiple possibilities?
   - Ask user for clarification?

2. **What's the threshold for fuzzy matching?**
   - Levenshtein distance?
   - Semantic similarity score?

3. **How do we handle unknown facets?**
   - Current stub returns `facet: "unknown"`
   - Should we attempt to guess from available facets?
   - Should we suggest closest match?

4. **Performance targets?**
   - Query response time goal?
   - Concept database lookup time?
   - LLM response time?

## Next Immediate Steps

1. ✅ Document design (this file)
2. Create test fixtures for mention normalization
3. Implement concept database client interface
4. Build normalization service with mocked database
5. Write tests for normalization service
6. Integrate with real concept database

## References

- API Endpoint: `/api/v0/facets` (POST)
- Concept Database: OpenSearch (backend/opensearch/)
- Current Stub: `backend/api/services/facets_service.py`
