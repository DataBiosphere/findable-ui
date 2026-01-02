#!/usr/bin/env python3
"""Evaluation script for LLM mention extraction quality testing.

Tests the LLM's ability to extract mentions and assign them to correct facets.
"""
import csv
import json
import sys
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Set, Tuple
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests


class LLMExtractionTestCase:
    """Test case for LLM extraction evaluation."""

    def __init__(
        self,
        test_id: str,
        query: str,
        expected_extractions: Dict[str, Set[str]],
        notes: str,
        category: str,
    ):
        """Initialize test case.

        Args:
            test_id: Unique test identifier
            query: Natural language query
            expected_extractions: Dict mapping facet name to set of expected mentions
            notes: Test description
            category: Test category
        """
        self.test_id = test_id
        self.query = query
        self.expected_extractions = expected_extractions
        self.notes = notes
        self.category = category


class LLMExtractionTestResult:
    """Test result for LLM extraction evaluation."""

    def __init__(
        self,
        test_id: str,
        query: str,
        passed: bool,
        expected_extractions: Dict[str, Set[str]],
        actual_extractions: Dict[str, Set[str]],
        missing_mentions: List[Tuple[str, str]],
        extra_mentions: List[Tuple[str, str]],
        wrong_facet_assignments: List[Tuple[str, str, str]],
        notes: str,
        category: str,
    ):
        """Initialize test result.

        Args:
            test_id: Test identifier
            query: Query string
            passed: Whether test passed
            expected_extractions: Expected facet -> mentions mapping
            actual_extractions: Actual facet -> mentions mapping
            missing_mentions: List of (facet, mention) that were expected but not extracted
            extra_mentions: List of (facet, mention) that were extracted but not expected
            wrong_facet_assignments: List of (mention, expected_facet, actual_facet)
            notes: Test notes
            category: Test category
        """
        self.test_id = test_id
        self.query = query
        self.passed = passed
        self.expected_extractions = expected_extractions
        self.actual_extractions = actual_extractions
        self.missing_mentions = missing_mentions
        self.extra_mentions = extra_mentions
        self.wrong_facet_assignments = wrong_facet_assignments
        self.notes = notes
        self.category = category

    def to_dict(self) -> dict:
        """Convert result to dictionary for JSON serialization.

        Returns:
            Dictionary representation
        """
        return {
            "test_id": self.test_id,
            "query": self.query,
            "passed": self.passed,
            "expected": {
                facet: list(mentions)
                for facet, mentions in self.expected_extractions.items()
            },
            "actual": {
                facet: list(mentions)
                for facet, mentions in self.actual_extractions.items()
            },
            "missing_mentions": [
                {"facet": facet, "mention": mention}
                for facet, mention in self.missing_mentions
            ],
            "extra_mentions": [
                {"facet": facet, "mention": mention}
                for facet, mention in self.extra_mentions
            ],
            "wrong_facet_assignments": [
                {
                    "mention": mention,
                    "expected_facet": expected_facet,
                    "actual_facet": actual_facet,
                }
                for mention, expected_facet, actual_facet in self.wrong_facet_assignments
            ],
            "notes": self.notes,
            "category": self.category,
        }


def parse_extractions(extractions_str: str) -> Dict[str, Set[str]]:
    """Parse expected extractions from CSV format.

    Format: "Facet1:mention1|Facet1:mention2|Facet2:mention3"

    Args:
        extractions_str: Extractions string from CSV

    Returns:
        Dict mapping facet name to set of expected mentions
    """
    extractions = defaultdict(set)

    if not extractions_str or not extractions_str.strip():
        return {}

    for extraction in extractions_str.split("|"):
        extraction = extraction.strip()
        if ":" not in extraction:
            continue

        facet, mention = extraction.split(":", 1)
        extractions[facet.strip()].add(mention.strip())

    return dict(extractions)


def load_test_cases(csv_path: str) -> List[LLMExtractionTestCase]:
    """Load test cases from CSV file.

    Args:
        csv_path: Path to CSV file

    Returns:
        List of LLMExtractionTestCase objects
    """
    test_cases = []

    with open(csv_path, "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            expected_extractions = parse_extractions(row["expected_extractions"])

            test_case = LLMExtractionTestCase(
                test_id=row["test_id"],
                query=row["query"],
                expected_extractions=expected_extractions,
                notes=row["notes"],
                category=row["category"],
            )
            test_cases.append(test_case)

    return test_cases


def call_llm_extraction_api(query: str, timeout: int = 60) -> List[Dict]:
    """Call the LLM extraction API endpoint.

    Args:
        query: Natural language query
        timeout: Request timeout in seconds

    Returns:
        List of mention dicts with 'text' and 'facet' keys
    """
    # Call the LLM mention extraction endpoint directly
    url = "http://localhost:8000/api/v0/extract-mentions"
    response = requests.post(url, json={"query": query}, timeout=timeout)
    response.raise_for_status()
    return response.json()


def compare_results(
    test_case: LLMExtractionTestCase, api_response: List[Dict]
) -> LLMExtractionTestResult:
    """Compare expected vs actual LLM extraction results.

    Args:
        test_case: Expected results
        api_response: Actual API response (list of mention dicts)

    Returns:
        LLMExtractionTestResult with pass/fail and detailed error info
    """
    # Parse actual extractions from API response
    actual_extractions = defaultdict(set)
    for mention in api_response:
        facet = mention.get("facet", "")
        text = mention.get("text", "")
        if facet and text:
            actual_extractions[facet].add(text)

    actual_extractions = dict(actual_extractions)

    # Find discrepancies
    missing_mentions = []
    extra_mentions = []
    wrong_facet_assignments = []

    # Check for missing mentions (expected but not found)
    for expected_facet, expected_mentions in test_case.expected_extractions.items():
        actual_mentions = actual_extractions.get(expected_facet, set())
        for mention in expected_mentions:
            if mention not in actual_mentions:
                # Check if mention was assigned to wrong facet
                found_in_wrong_facet = False
                for actual_facet, mentions in actual_extractions.items():
                    if mention in mentions and actual_facet != expected_facet:
                        wrong_facet_assignments.append(
                            (mention, expected_facet, actual_facet)
                        )
                        found_in_wrong_facet = True
                        break

                if not found_in_wrong_facet:
                    missing_mentions.append((expected_facet, mention))

    # Check for extra mentions (found but not expected)
    for actual_facet, actual_mentions in actual_extractions.items():
        expected_mentions = test_case.expected_extractions.get(actual_facet, set())
        for mention in actual_mentions:
            # Check if this mention is expected in ANY facet
            expected_anywhere = any(
                mention in mentions
                for mentions in test_case.expected_extractions.values()
            )

            # If not expected at all, it's an extra mention
            if not expected_anywhere:
                extra_mentions.append((actual_facet, mention))

    # Test passes if no discrepancies
    passed = (
        not missing_mentions and not extra_mentions and not wrong_facet_assignments
    )

    return LLMExtractionTestResult(
        test_id=test_case.test_id,
        query=test_case.query,
        passed=passed,
        expected_extractions=test_case.expected_extractions,
        actual_extractions=actual_extractions,
        missing_mentions=missing_mentions,
        extra_mentions=extra_mentions,
        wrong_facet_assignments=wrong_facet_assignments,
        notes=test_case.notes,
        category=test_case.category,
    )


def generate_report(results: List[LLMExtractionTestResult], dataset_name: str) -> str:
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

    # Count error types
    total_missing = sum(len(r.missing_mentions) for r in results)
    total_extra = sum(len(r.extra_mentions) for r in results)
    total_wrong_facet = sum(len(r.wrong_facet_assignments) for r in results)

    # Group by category
    category_stats = defaultdict(lambda: {"passed": 0, "failed": 0})
    for result in results:
        if result.passed:
            category_stats[result.category]["passed"] += 1
        else:
            category_stats[result.category]["failed"] += 1

    # Build report
    lines = []
    lines.append("=" * 80)
    lines.append(f"LLM Extraction Evaluation Report: {dataset_name}")
    lines.append("=" * 80)
    lines.append(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    lines.append(f"Total Tests: {total}")
    lines.append(f"Passed: {passed} ({pass_rate:.1f}%)")
    lines.append(f"Failed: {failed} ({100 - pass_rate:.1f}%)")
    lines.append("")
    lines.append(f"Error Summary:")
    lines.append(f"  Missing Mentions: {total_missing}")
    lines.append(f"  Extra Mentions: {total_extra}")
    lines.append(f"  Wrong Facet Assignments: {total_wrong_facet}")
    lines.append("")

    # Show failures
    failures = [r for r in results if not r.passed]
    if failures:
        lines.append("=" * 80)
        lines.append("FAILURES")
        lines.append("=" * 80)
        lines.append("")

        for result in failures:
            lines.append(f'{result.test_id}: "{result.query}"')
            lines.append(f"  Category: {result.category}")

            if result.missing_mentions:
                lines.append(f"  Missing Mentions ({len(result.missing_mentions)}):")
                for facet, mention in result.missing_mentions:
                    lines.append(f'    [{facet}] "{mention}"')

            if result.extra_mentions:
                lines.append(f"  Extra Mentions ({len(result.extra_mentions)}):")
                for facet, mention in result.extra_mentions:
                    lines.append(f'    [{facet}] "{mention}"')

            if result.wrong_facet_assignments:
                lines.append(
                    f"  Wrong Facet Assignments ({len(result.wrong_facet_assignments)}):"
                )
                for mention, expected_facet, actual_facet in result.wrong_facet_assignments:
                    lines.append(
                        f'    "{mention}": expected [{expected_facet}] but got [{actual_facet}]'
                    )

            if result.notes:
                lines.append(f"  Note: {result.notes}")

            lines.append("")

    lines.append("=" * 80)
    lines.append("PASS RATE BY CATEGORY")
    lines.append("=" * 80)
    for category in sorted(category_stats.keys()):
        stats = category_stats[category]
        total_cat = stats["passed"] + stats["failed"]
        pass_rate_cat = (stats["passed"] / total_cat * 100) if total_cat > 0 else 0
        lines.append(
            f"{category:20s}: {stats['passed']}/{total_cat}  ({pass_rate_cat:.1f}%)"
        )

    return "\n".join(lines)


def save_results_json(
    results: List[LLMExtractionTestResult], dataset_name: str, output_path: str
) -> None:
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
            "error_summary": {
                "total_missing_mentions": sum(
                    len(r.missing_mentions) for r in results
                ),
                "total_extra_mentions": sum(len(r.extra_mentions) for r in results),
                "total_wrong_facet_assignments": sum(
                    len(r.wrong_facet_assignments) for r in results
                ),
            },
        },
        "results": [r.to_dict() for r in results],
        "by_category": dict(category_stats),
    }

    with open(output_path, "w") as f:
        json.dump(output, f, indent=2)


def main() -> None:
    """Main evaluation runner."""
    import argparse

    parser = argparse.ArgumentParser(
        description="Run LLM mention extraction evaluations"
    )
    parser.add_argument(
        "--dataset", required=True, help="CSV dataset filename (in evals/datasets/)"
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

    # Run evaluations in parallel
    print(f"Running LLM extraction evaluations...")
    results = []

    def run_single_test(test_case: LLMExtractionTestCase) -> LLMExtractionTestResult:
        """Run a single test case and return the result."""
        try:
            api_response = call_llm_extraction_api(test_case.query)
            return compare_results(test_case, api_response)
        except Exception as e:
            return LLMExtractionTestResult(
                test_id=test_case.test_id,
                query=test_case.query,
                passed=False,
                expected_extractions=test_case.expected_extractions,
                actual_extractions={},
                missing_mentions=[
                    (facet, mention)
                    for facet, mentions in test_case.expected_extractions.items()
                    for mention in mentions
                ],
                extra_mentions=[],
                wrong_facet_assignments=[],
                notes=f"API error: {e}",
                category=test_case.category,
            )

    # Run tests in parallel with ThreadPoolExecutor
    # Use 5 workers to avoid hitting OpenAI rate limits
    max_workers = 5
    completed = 0
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_test = {
            executor.submit(run_single_test, tc): tc for tc in test_cases
        }
        for future in as_completed(future_to_test):
            test_case = future_to_test[future]
            completed += 1
            result = future.result()
            results.append(result)
            status = "PASS" if result.passed else "FAIL"
            print(f"  [{completed}/{len(test_cases)}] {status}: {test_case.test_id}")

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
