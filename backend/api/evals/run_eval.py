#!/usr/bin/env python3
"""Evaluation script for facet extraction quality testing."""
import csv
import json
import sys
from pathlib import Path
from datetime import datetime
from typing import List, Set, Optional
from collections import defaultdict
import requests

from eval_models import (
    TestCase,
    TestResult,
    ERROR_FACET_NOT_EXTRACTED,
    ERROR_WRONG_TERM,
    ERROR_EXTRA_TERMS,
    ERROR_UNEXPECTED_EXTRACTION,
)


def load_test_cases(csv_path: str) -> List[TestCase]:
    """Load test cases from CSV file.

    Args:
        csv_path: Path to CSV file

    Returns:
        List of TestCase objects
    """
    test_cases = []

    with open(csv_path, "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Parse expected_terms - can be empty for negative tests
            expected_terms_str = row["expected_terms"].strip()
            if expected_terms_str:
                expected_terms = set(t.strip() for t in expected_terms_str.split("|"))
            else:
                expected_terms = set()

            test_case = TestCase(
                test_id=row["test_id"],
                query=row["query"],
                expected_facet=row["expected_facet"] or None,
                expected_terms=expected_terms,
                notes=row["notes"],
                category=row["category"],
            )
            test_cases.append(test_case)

    return test_cases


def run_query(query: str, mode: str = "llm") -> dict:
    """Run query against the API.

    Args:
        query: Natural language query
        mode: API mode (llm or mock)

    Returns:
        API response as dict
    """
    url = f"http://localhost:8000/api/v0/facets?mode={mode}"
    response = requests.post(url, json={"query": query})
    response.raise_for_status()
    return response.json()


def extract_facet_terms(api_response: dict, facet_name: str) -> Set[str]:
    """Extract all terms returned for a specific facet.

    Args:
        api_response: API response dict
        facet_name: Facet to extract terms from

    Returns:
        Set of term strings
    """
    terms = set()

    for facet in api_response.get("facets", []):
        if facet["facet"] == facet_name:
            for selected_value in facet.get("selectedValues", []):
                terms.add(selected_value["term"])

    return terms


def compare_results(test_case: TestCase, api_response: dict) -> TestResult:
    """Compare expected vs actual results and categorize errors.

    Args:
        test_case: Expected results
        api_response: Actual API response

    Returns:
        TestResult with pass/fail and error categorization
    """
    # Extract actual terms for the expected facet
    actual_terms = (
        extract_facet_terms(api_response, test_case.expected_facet)
        if test_case.expected_facet
        else set()
    )

    # Determine if test passed and error type
    passed = False
    error_type = None
    actual_facet = test_case.expected_facet if actual_terms else None

    # Case 1: Negative test (should NOT extract this facet)
    if not test_case.expected_facet and not test_case.expected_terms:
        if actual_terms:
            error_type = ERROR_UNEXPECTED_EXTRACTION
        else:
            passed = True

    # Case 2: Expected facet not extracted
    elif test_case.expected_facet and not actual_terms:
        error_type = ERROR_FACET_NOT_EXTRACTED

    # Case 3: Exact match
    elif actual_terms == test_case.expected_terms:
        passed = True

    # Case 4: Wrong terms (got terms but not the expected ones)
    elif test_case.expected_terms and not test_case.expected_terms.intersection(
        actual_terms
    ):
        error_type = ERROR_WRONG_TERM

    # Case 5: Extra terms (got expected terms plus others)
    elif test_case.expected_terms.issubset(actual_terms):
        error_type = ERROR_EXTRA_TERMS

    # Case 6: Something else went wrong
    else:
        error_type = ERROR_WRONG_TERM

    return TestResult(
        test_id=test_case.test_id,
        query=test_case.query,
        passed=passed,
        expected_facet=test_case.expected_facet,
        expected_terms=test_case.expected_terms,
        actual_facet=actual_facet,
        actual_terms=actual_terms,
        error_type=error_type,
        notes=test_case.notes,
        category=test_case.category,
    )


def generate_report(results: List[TestResult], dataset_name: str) -> str:
    """Generate human-readable evaluation report.

    Args:
        results: List of test results
        dataset_name: Name of the dataset

    Returns:
        Formatted report string
    """
    total = len(results)
    passed = sum(1 for r in results if r.passed)
    failed = total - passed
    pass_rate = (passed / total * 100) if total > 0 else 0

    # Group failures by error type
    failures_by_error = defaultdict(list)
    for result in results:
        if not result.passed:
            failures_by_error[result.error_type].append(result)

    # Group by category
    category_stats = defaultdict(lambda: {"passed": 0, "failed": 0})
    for result in results:
        if result.passed:
            category_stats[result.category]["passed"] += 1
        else:
            category_stats[result.category]["failed"] += 1

    # Build report
    lines = []
    lines.append("=" * 60)
    lines.append(f"Evaluation Report: {dataset_name}")
    lines.append("=" * 60)
    lines.append(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    lines.append(f"Total Tests: {total}")
    lines.append(f"Passed: {passed} ({pass_rate:.1f}%)")
    lines.append(f"Failed: {failed} ({100 - pass_rate:.1f}%)")
    lines.append("")

    if failures_by_error:
        lines.append("=" * 60)
        lines.append("FAILURES BY ERROR TYPE")
        lines.append("=" * 60)
        lines.append("")

        for error_type, failures in sorted(failures_by_error.items()):
            lines.append(f"[{error_type}] - {len(failures)} failure(s)")
            for result in failures:
                lines.append(f'  {result.test_id}: "{result.query}"')
                if result.expected_facet:
                    expected_terms_str = ", ".join(sorted(result.expected_terms))
                    lines.append(
                        f"    Expected: {result.expected_facet} -> {expected_terms_str}"
                    )
                else:
                    lines.append(f"    Expected: No extraction")

                if result.actual_facet:
                    actual_terms_str = ", ".join(sorted(result.actual_terms))
                    lines.append(
                        f"    Actual: {result.actual_facet} -> {actual_terms_str}"
                    )
                else:
                    lines.append(
                        f"    Actual: No {result.expected_facet} facet extracted"
                    )

                if result.notes:
                    lines.append(f"    Note: {result.notes}")
                lines.append("")

    lines.append("=" * 60)
    lines.append("PASS RATE BY CATEGORY")
    lines.append("=" * 60)
    for category in sorted(category_stats.keys()):
        stats = category_stats[category]
        total_cat = stats["passed"] + stats["failed"]
        pass_rate_cat = (stats["passed"] / total_cat * 100) if total_cat > 0 else 0
        lines.append(
            f"{category:15s}: {stats['passed']}/{total_cat}  ({pass_rate_cat:.1f}%)"
        )

    return "\n".join(lines)


def save_results_json(results: List[TestResult], dataset_name: str, output_path: str):
    """Save detailed results as JSON.

    Args:
        results: List of test results
        dataset_name: Name of the dataset
        output_path: Path to save JSON file
    """
    # Calculate summary stats
    total = len(results)
    passed = sum(1 for r in results if r.passed)

    # Group by category
    category_stats = defaultdict(lambda: {"passed": 0, "failed": 0, "pass_rate": 0.0})
    for result in results:
        if result.passed:
            category_stats[result.category]["passed"] += 1
        else:
            category_stats[result.category]["failed"] += 1

    # Calculate pass rates
    for category in category_stats:
        total_cat = (
            category_stats[category]["passed"] + category_stats[category]["failed"]
        )
        category_stats[category]["pass_rate"] = (
            category_stats[category]["passed"] / total_cat if total_cat > 0 else 0.0
        )

    output = {
        "metadata": {
            "date": datetime.now().isoformat(),
            "dataset": dataset_name,
            "total_tests": total,
            "passed": passed,
            "failed": total - passed,
            "pass_rate": passed / total if total > 0 else 0.0,
        },
        "results": [r.to_dict() for r in results],
        "by_category": dict(category_stats),
    }

    with open(output_path, "w") as f:
        json.dump(output, f, indent=2)


def main():
    """Main evaluation runner."""
    import argparse

    parser = argparse.ArgumentParser(description="Run facet extraction evaluations")
    parser.add_argument(
        "--dataset", required=True, help="CSV dataset filename (in evals/datasets/)"
    )
    parser.add_argument(
        "--mode", default="llm", choices=["llm", "mock"], help="API mode"
    )
    parser.add_argument(
        "--save-baseline", action="store_true", help="Save results as baseline"
    )
    parser.add_argument(
        "--output", help="Output JSON file path (default: auto-generated)"
    )

    args = parser.parse_args()

    # Resolve paths
    script_dir = Path(__file__).parent
    dataset_path = script_dir / "datasets" / args.dataset

    if not dataset_path.exists():
        print(f"Error: Dataset not found: {dataset_path}")
        sys.exit(1)

    # Load test cases
    print(f"Loading test cases from {dataset_path}...")
    test_cases = load_test_cases(str(dataset_path))
    print(f"Loaded {len(test_cases)} test cases\n")

    # Run evaluations
    print(f"Running evaluations (mode={args.mode})...")
    results = []

    for i, test_case in enumerate(test_cases, 1):
        print(f"  [{i}/{len(test_cases)}] {test_case.test_id}: {test_case.query}")
        try:
            api_response = run_query(test_case.query, mode=args.mode)
            result = compare_results(test_case, api_response)
            results.append(result)
        except Exception as e:
            print(f"    ERROR: {e}")
            # Create a failed result
            result = TestResult(
                test_id=test_case.test_id,
                query=test_case.query,
                passed=False,
                expected_facet=test_case.expected_facet,
                expected_terms=test_case.expected_terms,
                actual_facet=None,
                actual_terms=set(),
                error_type="api_error",
                notes=f"API error: {e}",
                category=test_case.category,
            )
            results.append(result)

    print()

    # Generate report
    dataset_name = args.dataset.replace(".csv", "")
    report = generate_report(results, dataset_name)
    print(report)

    # Save JSON results
    if args.output:
        output_path = Path(args.output)
    else:
        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        if args.save_baseline:
            output_path = (
                script_dir / "results" / "baseline" / f"{dataset_name}_baseline.json"
            )
        else:
            output_path = script_dir / "results" / f"{dataset_name}_{timestamp}.json"

    output_path.parent.mkdir(parents=True, exist_ok=True)
    save_results_json(results, dataset_name, str(output_path))
    print(f"\nResults saved to: {output_path}")


if __name__ == "__main__":
    main()
