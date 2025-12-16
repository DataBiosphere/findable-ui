"""Data models for evaluation framework."""

from dataclasses import dataclass, field
from typing import Set, Optional


@dataclass
class TestCase:
    """Represents a single test case from CSV."""

    test_id: str
    query: str
    expected_facet: str
    expected_terms: Set[str]
    notes: str
    category: str


@dataclass
class TestResult:
    """Results from running a test case."""

    test_id: str
    query: str
    passed: bool
    expected_facet: str
    expected_terms: Set[str]
    actual_facet: Optional[str]
    actual_terms: Set[str]
    error_type: Optional[str]
    notes: str
    category: str

    def to_dict(self) -> dict:
        """Convert to dictionary for JSON serialization."""
        return {
            "test_id": self.test_id,
            "query": self.query,
            "passed": self.passed,
            "expected": {
                "facet": self.expected_facet if self.expected_facet else None,
                "terms": sorted(list(self.expected_terms)),
            },
            "actual": {
                "facet": self.actual_facet,
                "terms": sorted(list(self.actual_terms)),
            },
            "error_type": self.error_type,
            "notes": self.notes,
            "category": self.category,
        }


# Error type constants
ERROR_FACET_NOT_EXTRACTED = "facet_not_extracted"
ERROR_WRONG_FACET = "wrong_facet"
ERROR_TERM_NOT_FOUND = "term_not_found"
ERROR_WRONG_TERM = "wrong_term"
ERROR_PARTIAL_MATCH = "partial_match"
ERROR_EXTRA_TERMS = "extra_terms"
ERROR_UNEXPECTED_EXTRACTION = "unexpected_extraction"
ERROR_PASS = None  # No error
