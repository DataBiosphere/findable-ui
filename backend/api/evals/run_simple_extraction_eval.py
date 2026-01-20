#!/usr/bin/env python3
"""Evaluation script for SimpleMentionExtractor (Stage 1 of multi-stage pipeline).

Tests the LLM's ability to extract raw text spans from queries.
Does not test facet assignment - that's handled by OpenSearch in Stage 2.
"""
import argparse
import csv
import json
import sys
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Set
from concurrent.futures import ThreadPoolExecutor, as_completed


class SimpleExtractionTestCase:
    """Test case for simple extraction evaluation."""

    def __init__(
        self,
        test_id: str,
        query: str,
        expected_terms: Set[str],
        category: str,
        notes: str,
    ):
        """Initialize test case.

        Args:
            test_id: Unique test identifier.
            query: Natural language query.
            expected_terms: Set of expected extracted terms.
            category: Test category.
            notes: Test description.
        """
        self.test_id = test_id
        self.query = query
        self.expected_terms = expected_terms
        self.category = category
        self.notes = notes


class SimpleExtractionTestResult:
    """Test result for simple extraction evaluation."""

    def __init__(
        self,
        test_id: str,
        query: str,
        expected_terms: Set[str],
        actual_terms: Set[str],
        category: str,
        notes: str,
        error: str = None,
    ):
        """Initialize test result.

        Args:
            test_id: Unique test identifier.
            query: Natural language query.
            expected_terms: Set of expected extracted terms.
            actual_terms: Set of actual extracted terms.
            category: Test category.
            notes: Test description.
            error: Error message if extraction failed.
        """
        self.test_id = test_id
        self.query = query
        self.expected_terms = expected_terms
        self.actual_terms = actual_terms
        self.category = category
        self.notes = notes
        self.error = error

    @property
    def passed(self) -> bool:
        """Check if test passed (all expected terms extracted)."""
        if self.error:
            return False
        # Normalize for comparison (lowercase)
        expected_lower = {t.lower() for t in self.expected_terms}
        actual_lower = {t.lower() for t in self.actual_terms}
        return expected_lower <= actual_lower  # All expected terms present

    @property
    def missing_terms(self) -> Set[str]:
        """Get terms that were expected but not extracted."""
        expected_lower = {t.lower(): t for t in self.expected_terms}
        actual_lower = {t.lower() for t in self.actual_terms}
        return {expected_lower[t] for t in expected_lower if t not in actual_lower}

    @property
    def extra_terms(self) -> Set[str]:
        """Get terms that were extracted but not expected."""
        expected_lower = {t.lower() for t in self.expected_terms}
        actual_lower = {t.lower(): t for t in self.actual_terms}
        return {actual_lower[t] for t in actual_lower if t not in expected_lower}


def load_test_cases(csv_path: Path) -> List[SimpleExtractionTestCase]:
    """Load test cases from CSV file.

    Supports two CSV formats:
    1. Simple format with 'expected_terms' column (comma-separated terms)
    2. LLM format with 'expected_extractions' column (facet:term|facet:term)

    Args:
        csv_path: Path to CSV file.

    Returns:
        List of test cases.
    """
    test_cases = []
    with open(csv_path, "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Try simple format first
            if "expected_terms" in row:
                expected_str = row.get("expected_terms", "")
                expected_terms = {
                    t.strip() for t in expected_str.split(",") if t.strip()
                }
            # Fall back to LLM format (facet:term|facet:term)
            elif "expected_extractions" in row:
                expected_str = row.get("expected_extractions", "")
                expected_terms = set()
                for pair in expected_str.split("|"):
                    if ":" in pair:
                        # Extract just the term part (after the colon)
                        term = pair.split(":", 1)[1].strip()
                        if term:
                            expected_terms.add(term)
            else:
                expected_terms = set()

            test_cases.append(
                SimpleExtractionTestCase(
                    test_id=row["test_id"],
                    query=row["query"],
                    expected_terms=expected_terms,
                    category=row.get("category", ""),
                    notes=row.get("notes", ""),
                )
            )
    return test_cases


def extract_terms_direct(query: str, timeout: float = 30.0) -> List[str]:
    """Extract terms directly using SimpleMentionExtractor.

    Args:
        query: Natural language query.
        timeout: Request timeout in seconds.

    Returns:
        List of extracted surface forms.
    """
    from agents.simple_mention_extractor import SimpleMentionExtractor

    # Use a shared extractor instance for efficiency
    if not hasattr(extract_terms_direct, "_extractor"):
        extract_terms_direct._extractor = SimpleMentionExtractor()

    result = extract_terms_direct._extractor.extract(query, timeout=timeout)
    # Return mention texts
    return [m.text for m in result.mentions]


def run_test(
    test_case: SimpleExtractionTestCase, timeout: float = 30.0
) -> SimpleExtractionTestResult:
    """Run a single test case.

    Args:
        test_case: The test case to run.
        timeout: Request timeout in seconds.

    Returns:
        Test result.
    """
    try:
        actual_terms = extract_terms_direct(test_case.query, timeout=timeout)
        return SimpleExtractionTestResult(
            test_id=test_case.test_id,
            query=test_case.query,
            expected_terms=test_case.expected_terms,
            actual_terms=set(actual_terms),
            category=test_case.category,
            notes=test_case.notes,
        )
    except Exception as e:
        return SimpleExtractionTestResult(
            test_id=test_case.test_id,
            query=test_case.query,
            expected_terms=test_case.expected_terms,
            actual_terms=set(),
            category=test_case.category,
            notes=test_case.notes,
            error=str(e),
        )


def run_evaluation(
    test_cases: List[SimpleExtractionTestCase],
    max_workers: int = 3,
    timeout: float = 30.0,
) -> List[SimpleExtractionTestResult]:
    """Run evaluation on all test cases.

    Args:
        test_cases: List of test cases.
        max_workers: Maximum parallel workers.
        timeout: Request timeout in seconds.

    Returns:
        List of test results.
    """
    results = []

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_test = {
            executor.submit(run_test, tc, timeout): tc for tc in test_cases
        }

        for future in as_completed(future_to_test):
            result = future.result()
            results.append(result)
            status = "PASS" if result.passed else "FAIL"
            print(f"  {result.test_id}: {status}")

    # Sort by test_id
    results.sort(key=lambda r: r.test_id)
    return results


def print_report(results: List[SimpleExtractionTestResult], dataset_name: str) -> None:
    """Print evaluation report.

    Args:
        results: List of test results.
        dataset_name: Name of the dataset.
    """
    passed = sum(1 for r in results if r.passed)
    total = len(results)
    pass_rate = passed / total if total > 0 else 0

    print("\n" + "=" * 80)
    print(f"Simple Extraction Evaluation Report: {dataset_name}")
    print("=" * 80)
    print(f"\nOverall: {passed}/{total} passed ({pass_rate*100:.1f}%)")

    # Group by category
    categories: Dict[str, List[SimpleExtractionTestResult]] = {}
    for r in results:
        cat = r.category or "uncategorized"
        if cat not in categories:
            categories[cat] = []
        categories[cat].append(r)

    # Print failures
    failures = [r for r in results if not r.passed]
    if failures:
        print("\n" + "-" * 80)
        print("FAILURES:")
        print("-" * 80)
        for r in failures:
            print(f'\n{r.test_id}: "{r.query}"')
            print(f"  Category: {r.category}")
            if r.error:
                print(f"  Error: {r.error}")
            else:
                if r.missing_terms:
                    print(f"  Missing: {sorted(r.missing_terms)}")
                if r.extra_terms:
                    print(f"  Extra: {sorted(r.extra_terms)}")
            if r.notes:
                print(f"  Note: {r.notes}")

    # Print pass rate by category
    print("\n" + "=" * 80)
    print("PASS RATE BY CATEGORY")
    print("=" * 80)
    for cat in sorted(categories.keys()):
        cat_results = categories[cat]
        cat_passed = sum(1 for r in cat_results if r.passed)
        cat_total = len(cat_results)
        cat_rate = cat_passed / cat_total if cat_total > 0 else 0
        print(f"{cat:20}: {cat_passed}/{cat_total}  ({cat_rate*100:.1f}%)")


def save_results(
    results: List[SimpleExtractionTestResult],
    output_path: Path,
    dataset_name: str,
    is_baseline: bool = False,
) -> None:
    """Save results to JSON file.

    Args:
        results: List of test results.
        output_path: Path to output file.
        dataset_name: Name of the dataset.
        is_baseline: Whether this is a baseline run.
    """
    passed = sum(1 for r in results if r.passed)
    total = len(results)

    output = {
        "metadata": {
            "date": datetime.now().isoformat(),
            "dataset": dataset_name,
            "extractor": "SimpleMentionExtractor",
            "model": "gpt-4o-mini",
            "is_baseline": is_baseline,
            "total_tests": total,
            "passed": passed,
            "pass_rate": passed / total if total > 0 else 0,
        },
        "results": [
            {
                "test_id": r.test_id,
                "query": r.query,
                "passed": r.passed,
                "expected_terms": sorted(r.expected_terms),
                "actual_terms": sorted(r.actual_terms),
                "missing_terms": sorted(r.missing_terms) if not r.passed else [],
                "extra_terms": sorted(r.extra_terms) if not r.passed else [],
                "category": r.category,
                "notes": r.notes,
                "error": r.error,
            }
            for r in results
        ],
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        json.dump(output, f, indent=2)

    print(f"\nResults saved to: {output_path}")


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Run SimpleMentionExtractor evaluation"
    )
    parser.add_argument(
        "--dataset",
        required=True,
        help="Dataset CSV file name (in evals/datasets/)",
    )
    parser.add_argument(
        "--save-baseline",
        action="store_true",
        help="Save results as baseline",
    )
    parser.add_argument(
        "--output",
        help="Output file path (default: auto-generated in evals/results/)",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=30.0,
        help="Request timeout in seconds (default: 30)",
    )
    parser.add_argument(
        "--workers",
        type=int,
        default=3,
        help="Maximum parallel workers (default: 3)",
    )

    args = parser.parse_args()

    # Resolve paths
    script_dir = Path(__file__).parent
    dataset_path = script_dir / "datasets" / args.dataset

    if not dataset_path.exists():
        print(f"Error: Dataset not found: {dataset_path}")
        sys.exit(1)

    dataset_name = args.dataset.replace(".csv", "")

    # Load test cases
    test_cases = load_test_cases(dataset_path)
    print(f"Loaded {len(test_cases)} test cases from {dataset_name}")

    # Run evaluation
    print(f"\nRunning SimpleMentionExtractor evaluation...")
    results = run_evaluation(test_cases, max_workers=args.workers, timeout=args.timeout)

    # Print report
    print_report(results, dataset_name)

    # Save results
    if args.output:
        output_path = Path(args.output)
    elif args.save_baseline:
        output_path = (
            script_dir / "results" / "baseline" / f"{dataset_name}_baseline.json"
        )
    else:
        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        output_path = script_dir / "results" / f"{dataset_name}_simple_{timestamp}.json"

    save_results(results, output_path, dataset_name, is_baseline=args.save_baseline)


if __name__ == "__main__":
    main()
