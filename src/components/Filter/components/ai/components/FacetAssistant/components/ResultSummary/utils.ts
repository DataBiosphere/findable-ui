import type { ResultSummaryData } from "./types";

/**
 * Renders a human-readable summary from the result summary data.
 * @param summary - The result summary data.
 * @returns A formatted string summarizing the matched and unmatched items.
 */
export function renderSummary(summary: ResultSummaryData): string {
  const matched = summary.matched.length;
  const unmatched = summary.unmatched.length;

  if (!unmatched) {
    // If there are no unmatched items, just report the matched count.
    return `${matched} matched`;
  }

  if (!matched) {
    // If there are no matched items, report only unmatched count.
    return `${unmatched} unmatched`;
  }

  // Otherwise, report both matched and unmatched counts.
  return `${matched} matched, ${unmatched} unmatched`;
}
