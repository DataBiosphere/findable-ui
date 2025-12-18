# Concept Resolver Design & Improvements

This document describes the design decisions and improvements made to the OpenSearch concept resolver for accurate facet extraction.

## Table of Contents

1. [Two-Pass Query Strategy](#two-pass-query-strategy)
2. [Negation Filtering](#negation-filtering)
3. [Unspecified Concepts](#unspecified-concepts)
4. [LLM Prompt Improvements](#llm-prompt-improvements)
5. [Evaluation Framework](#evaluation-framework)

---

## Two-Pass Query Strategy

### Problem

Initial implementation used a single fuzzy query that produced too many false positives and had no way to distinguish high-confidence exact matches from low-confidence fuzzy matches.

### Solution

Implemented a two-pass query approach with different scoring thresholds:

**Pass 1: Exact Matches (High Confidence)**

- Uses `term.keyword` matching with `boost=10.0`
- Minimum score threshold: `50.0`
- Returns only high-confidence exact/keyword matches

**Pass 2: Fuzzy Matches (Fallback)**

- Only executes if Pass 1 returns no results
- Uses fuzzy matching with `fuzziness=AUTO`
- Minimum score threshold: `15.0`
- Provides typo tolerance (e.g., "diabtes" → "diabetes")

### Implementation

Located in `services/opensearch_concept_resolver.py`:

```python
def resolve_mention(self, facet_name: str, mention: str, top_k: int = 5):
    # Pass 1: Try exact matches only
    exact_query = self._build_search_query(
        opensearch_facet, mention_lower, top_k, exact_only=True
    )
    exact_results = self._parse_results(
        exact_response, min_score=self.exact_min_score  # 50.0
    )

    # If we found exact matches, return them
    if exact_results:
        return self._filter_negation_values(exact_results, mention)

    # Pass 2: Fall back to fuzzy matching
    fuzzy_query = self._build_search_query(
        opensearch_facet, mention_lower, top_k, exact_only=False
    )
    fuzzy_results = self._parse_results(
        fuzzy_response, min_score=self.fuzzy_min_score  # 15.0
    )

    return self._filter_negation_values(fuzzy_results, mention)
```

### Results

- **Typo handling**: "diabtes" → "Diabetes mellitus" (fuzzy match)
- **Exact matches**: "diabetes" → "Diabetes mellitus" (exact match, higher confidence)
- **Reduced false positives**: Fewer irrelevant low-score matches

---

## Negation Filtering

### Problem

Queries like "hispanic" were incorrectly matching "Not Hispanic or Latino", and "alcoholic" was matching "Non-alcoholic fatty liver disease".

### Solution

Implemented metadata-based negation filtering using `modifier_role` field with two classifications:

#### 1. NEGATION_VALUE

For terms that represent the opposite/negation of a concept.

**Example**: "Not Hispanic or Latino"

**Behavior**: Filtered out UNLESS the query contains a negation prefix ("non-", "not ", "anti-", "no ")

**Use case**: Prevents "hispanic" from matching "Not Hispanic or Latino"

#### 2. CANONICAL_NAME

For official medical/scientific terms with negation prefixes that are NOT opposites.

**Example**: "Non-alcoholic fatty liver disease"

**Behavior**: Only filtered if the query specifically matches the negated component (the word after the prefix)

**Use case**:

- ✅ "fatty liver" → matches "Non-alcoholic fatty liver disease" (OK, different part of term)
- ❌ "alcoholic" → does NOT match "Non-alcoholic fatty liver disease" (filtered, matches negated component)
- ✅ "non-alcoholic" → matches "Non-alcoholic fatty liver disease" (OK, query has negation)

### Implementation

Located in `services/opensearch_concept_resolver.py`:

```python
def _has_negation_prefix(self, query: str) -> bool:
    """Check if query starts with a negation prefix."""
    query_lower = query.lower().strip()
    negation_prefixes = ["non-", "not ", "anti-", "no "]
    return any(query_lower.startswith(prefix) for prefix in negation_prefixes)

def _filter_negation_values(self, results: List[Dict], query: str) -> List[Dict]:
    """Filter out negated results based on query and modifier_role."""
    query_lower = query.lower().strip()
    query_has_negation = self._has_negation_prefix(query_lower)

    filtered_results = []
    for r in results:
        modifier_role = r.get("modifier_role")
        term_lower = r.get("term", "").lower()

        # NEGATION_VALUE: Filter if query lacks negation prefix
        if modifier_role == "NEGATION_VALUE" and not query_has_negation:
            continue

        # CANONICAL_NAME: Filter if query matches negated component
        if modifier_role == "CANONICAL_NAME":
            negation_prefix_found = None
            for prefix in ["non-", "not ", "anti-"]:
                if term_lower.startswith(prefix):
                    negation_prefix_found = prefix
                    break

            if negation_prefix_found and not query_has_negation:
                after_prefix = term_lower[len(negation_prefix_found):].strip()
                negated_component = after_prefix.split()[0] if after_prefix else ""
                negated_component = negated_component.split("-")[0]

                if query_lower == negated_component or query_lower.startswith(negated_component):
                    continue

        filtered_results.append(r)

    return filtered_results
```

### Concept Metadata

Located in `../opensearch/concepts-with-synonyms.json`:

```json
{
  "id": "reported_ethnicity-9bf98bb17145",
  "facet_name": "donors.reported_ethnicity",
  "term": "not hispanic or latino",
  "modifier_role": "NEGATION_VALUE",
  "synonyms": ["non-hispanic", "not hispanic"]
}

{
  "id": "disease-a140bf2e1c26",
  "facet_name": "diagnoses.disease",
  "term": "non-alcoholic fatty liver disease",
  "modifier_role": "CANONICAL_NAME",
  "synonyms": ["nafld", "nash"]
}
```

### Test Coverage

Located in `tests/test_opensearch_integration.py`:

- `test_has_negation_prefix`: Validates negation prefix detection
- `test_filter_negation_values_with_negation_value_type`: Tests NEGATION_VALUE filtering
- `test_filter_negation_values_with_canonical_name_type`: Tests CANONICAL_NAME filtering
- `test_negation_filter_integration_*`: Integration tests for real queries

---

## Unspecified Concepts

### Problem

The AnVIL API includes `null` values in term facets representing unspecified/missing data. Users need to be able to query for these values using natural language like "disease not specified" or "ethnicity unknown".

### Solution

Added "Unspecified" concepts to all facets with null values, with facet-specific synonyms.

### Facets with Unspecified Concepts

18 facets have "Unspecified" concepts (identified via API analysis):

- `diagnoses.phenotype`
- `biosamples.disease`
- `diagnoses.disease`
- `diagnoses.phenopacket`
- `files.data_modality`
- `donors.reported_ethnicity`
- `datasets.consent_group`
- `activities.assay_type`
- `biosamples.anatomical_site`
- `donors.organism_type`
- `datasets.data_use_permission`
- `donors.phenotypic_sex`
- `activities.data_modality`
- `activities.activity_type`
- `biosamples.biosample_type`
- `files.file_format`
- `datasets.registered_identifier`
- `files.reference_assembly`

### Concept Structure

Each "Unspecified" concept includes facet-specific synonyms:

**Example: Phenotypic Sex**

```json
{
  "id": "phenotypic_sex-6fcdc090caea",
  "facet_name": "donors.phenotypic_sex",
  "term": "unspecified",
  "name": "unspecified",
  "display_name": "Unspecified",
  "synonyms": [
    "unspecified",
    "sex unspecified",
    "not specified",
    "sex not specified",
    "not recorded",
    "no data",
    "missing"
  ],
  "metadata": {
    "count": 0
  }
}
```

**Example: Disease**

```json
{
  "id": "disease-abc123",
  "facet_name": "diagnoses.disease",
  "term": "unspecified",
  "name": "unspecified",
  "display_name": "Unspecified",
  "synonyms": [
    "unspecified",
    "disease unspecified",
    "not specified",
    "disease not specified",
    "not reported",
    "disease not reported",
    "unknown",
    "disease unknown",
    "missing",
    "no data"
  ],
  "metadata": {
    "count": 0,
    "auto_generated": true
  }
}
```

### Implementation Script

Located in `scripts/add_unspecified_to_json.py`:

```bash
# Add Unspecified concepts to the JSON file
.venv/bin/python scripts/add_unspecified_to_json.py

# Reload OpenSearch with updated concepts
cd ../opensearch && make clear
```

### Query Examples

These queries now successfully match "Unspecified":

- "disease not specified" → `diagnoses.disease: Unspecified`
- "disease unspecified" → `diagnoses.disease: Unspecified`
- "ethnicity not specified" → `donors.reported_ethnicity: Unspecified`
- "ethnicity unspecified" → `donors.reported_ethnicity: Unspecified`
- "sex not specified" → `donors.phenotypic_sex: Unspecified`
- "sex unspecified" → `donors.phenotypic_sex: Unspecified`

---

## LLM Prompt Improvements

### Problem

The LLM was sometimes extracting generic facet names (like "disease", "ethnicity") from phrases like "disease not specified", causing the concept resolver to match many irrelevant terms.

### Solution

Enhanced the LLM prompt instructions to explicitly handle "X not specified" patterns.

### Implementation

Located in `services/llm_mention_extractor.py`:

```python
FACET_CONTEXT = """
...

Instructions:
- Extract exact substrings from the query.
- Assign mentions to the most appropriate facet listed above.
- When extracting edge case phrases like "X not specified", "X unknown", "X not reported",
  "X unspecified", extract the COMPLETE PHRASE (e.g., "sex not specified" not just "sex",
  "disease not specified" not just "disease", "ethnicity unspecified" not just "ethnicity").
  These phrases indicate missing/unknown data and should be treated as distinct mentions.
  DO NOT extract generic facet names like "disease", "ethnicity", "sex" on their own when
  they appear in these phrases - only extract the complete phrase.
...
"""
```

### Examples

**Before:**

- Query: "disease not specified"
- LLM extracted: "disease"
- Result: Matched many disease terms (Alzheimer's, diabetes, etc.)

**After:**

- Query: "disease not specified"
- LLM extracted: "disease not specified"
- Result: Matched "Unspecified" concept only ✅

---

## Evaluation Framework

### Purpose

Systematic testing framework to measure and track concept resolution quality across different facets.

### Structure

Located in `evals/`:

```
evals/
├── datasets/                    # Test case definitions
│   ├── disease_tests.csv
│   ├── phenotypic_sex_tests.csv
│   └── reported_ethnicity_tests.csv
├── results/                     # Test run outputs
│   ├── baseline/               # Baseline results for comparison
│   └── *.json                  # Timestamped test results
├── run_eval.py                 # Main evaluation runner
└── eval_models.py              # Data models for tests
```

### Test Categories

Each test suite includes multiple categories:

- **basic**: Simple single-term queries
- **synonym**: Alternative names/spellings
- **abbreviation**: Common abbreviations
- **typo**: Common misspellings
- **edge_case**: Special cases (unknown, unspecified, null)
- **negative_test**: Queries that should NOT extract
- **negative_precision**: Ensure negation filtering works

### Running Evaluations

```bash
# Run single test suite
python evals/run_eval.py --dataset disease_tests.csv

# Run with baseline comparison
python evals/run_eval.py --dataset disease_tests.csv --save-baseline

# Run in mock mode (pattern matching, no LLM)
python evals/run_eval.py --dataset disease_tests.csv --mode mock
```

### Current Results

As of 2025-12-16:

| Test Suite         | Passed | Failed | Pass Rate     |
| ------------------ | ------ | ------ | ------------- |
| Disease            | 15     | 0      | **100.0%** ✅ |
| Phenotypic Sex     | 15     | 1      | 93.8%         |
| Reported Ethnicity | 21     | 3      | 87.5%         |
| **Overall**        | **51** | **4**  | **92.7%**     |

### Example Test Case

From `evals/datasets/disease_tests.csv`:

```csv
test_id,query,expected_facet,expected_terms,notes,category
dis_001,diabetes,diagnoses.disease,Diabetes mellitus,Common disease name,basic
dis_007,diabtes,diagnoses.disease,Diabetes mellitus;;;Type 1 diabetes mellitus,Typo - missing e,typo
dis_016,disease not specified,diagnoses.disease,Unspecified,Not specified variant,edge_case
```

### Test Output Format

```json
{
  "metadata": {
    "date": "2025-12-16T23:28:28",
    "dataset": "disease_tests",
    "total_tests": 15,
    "passed": 15,
    "failed": 0,
    "pass_rate": 1.0
  },
  "results": [
    {
      "test_id": "dis_001",
      "query": "diabetes",
      "passed": true,
      "expected": {
        "facet": "diagnoses.disease",
        "terms": ["Diabetes mellitus"]
      },
      "actual": {
        "facet": "diagnoses.disease",
        "terms": ["Diabetes mellitus"]
      },
      "error_type": null,
      "notes": "Common disease name",
      "category": "basic"
    }
  ],
  "by_category": {
    "basic": { "passed": 2, "failed": 0, "pass_rate": 1.0 },
    "typo": { "passed": 1, "failed": 0, "pass_rate": 1.0 }
  }
}
```

---

## Summary of Improvements

### Before

- ❌ Single-pass fuzzy matching with many false positives
- ❌ "hispanic" matched "Not Hispanic or Latino"
- ❌ "alcoholic" matched "Non-alcoholic fatty liver disease"
- ❌ No way to query for unspecified/null values
- ❌ No systematic quality measurement

### After

- ✅ Two-pass query with exact (50.0) → fuzzy (15.0) fallback
- ✅ Metadata-based negation filtering with NEGATION_VALUE and CANONICAL_NAME roles
- ✅ 18 "Unspecified" concepts with facet-specific synonyms
- ✅ Improved LLM prompt for complete phrase extraction
- ✅ Comprehensive evaluation framework tracking 92.7% accuracy

### Performance Metrics

**Disease Tests**: 15/15 (100.0%) ✅
**Phenotypic Sex Tests**: 15/16 (93.8%)
**Reported Ethnicity Tests**: 21/24 (87.5%)
**Overall**: 51/55 (92.7%)

---

## Future Improvements

### Component-Based Expansion

For compound ethnicity values like "Black or African American|Hispanic/Latino(a)", implement component-based matching so:

- "african american" matches both "Black or African American" AND "Black or African American|Hispanic/Latino(a)"
- "native american" matches both individual and combined ethnicity terms

### Single-Letter Abbreviation Handling

Improve LLM extraction or concept resolution for single-letter queries in context:

- "F patients" should match "Female"
- "M patients" should match "Male"

### Typo Tolerance Tuning

Continue refining fuzzy match thresholds and fuzziness settings for optimal typo handling without false positives.

---

## References

- [OpenSearch Mapping Documentation](./OPENSEARCH_MAPPING.md)
- [Concept Database](../opensearch/concepts-with-synonyms.json)
- [Evaluation Tests](./evals/datasets/)
- [OpenSearch Concept Resolver](./services/opensearch_concept_resolver.py)
- [LLM Mention Extractor](./services/llm_mention_extractor.py)
