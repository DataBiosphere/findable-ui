import type { ResultSummaryData } from "./types";

/**
 * Returns the appropriate noun ("match" or "matches") based on the count.
 * @param count - The number of matches.
 * @returns The singular or plural form of "match".
 */
function getMatchNoun(count: number): string {
  return count === 1 ? "match" : "matches";
}

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
    return `AI found ${matched} ${getMatchNoun(matched)}`;
  }

  if (!matched) {
    // If there are no matched items, report only unmatched count.
    return `AI found ${unmatched} with no match`;
  }

  // Otherwise, report both matched and unmatched counts.
  return `AI found ${matched} ${getMatchNoun(
    matched
  )} and ${unmatched} with no match`;
}
