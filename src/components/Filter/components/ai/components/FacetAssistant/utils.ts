import type { SelectedFilter } from "../../../../../../common/entities";
import type {
  MentionTermPair,
  ResultSummaryData,
} from "./components/ResultSummary/types";
import type { AiResponse, Facet, SelectedValue } from "./types";

/**
 * Builds a summary of matched and unmatched mention-term pairs from the AI response.
 * @param response - The AI response object.
 * @returns A summary object with matched and unmatched pairs, or undefined if no response.
 */
export function buildSummary(
  response: AiResponse | null
): ResultSummaryData | undefined {
  if (!response) return;
  const matched: MentionTermPair[] = [];
  const unmatched: MentionTermPair[] = [];
  for (const facet of response.facets) {
    const facetUnmatched = isUnmatchedFacet(facet);
    for (const selectedValue of facet.selectedValues) {
      const { mention, term } = selectedValue;
      const pair: MentionTermPair = [mention, term];
      if (facetUnmatched || isUnknownValue(selectedValue)) {
        unmatched.push(pair);
      } else {
        matched.push(pair);
      }
    }
  }
  return { matched, unmatched };
}

/**
 * Filters out unknown facets.
 * @param facet - Facet.
 * @returns Boolean.
 */
function filterFacet(facet: Facet): boolean {
  return facet.facet !== "unknown" && facet.facet !== "unmatched";
}

/**
 * Filters out unknown or unrecognized values.
 * @param selectedValue - Selected value.
 * @returns Boolean.
 */
function filterValue(selectedValue: SelectedValue): boolean {
  return !isUnknownValue(selectedValue);
}

/**
 * Checks if a value is unknown or unrecognized.
 * @param selectedValue - Selected value to check.
 * @returns Boolean.
 */
function isUnknownValue(selectedValue: SelectedValue): boolean {
  return selectedValue.term === "unknown" || selectedValue.recognized === false;
}

/**
 * Identifies unmatched facets.
 * @param facet - Facet.
 * @returns Boolean.
 */
function isUnmatchedFacet(facet: Facet): boolean {
  return facet.facet === "unknown" || facet.facet === "unmatched";
}

/**
 * Maps the AI response to a list of selected filters.
 * @param response - AI response.
 * @returns List of selected filters.
 */
export function mapResponse(response: AiResponse): SelectedFilter[] {
  const { facets } = response;

  // Filter out unknown facets.
  const filteredFacets = facets.filter(filterFacet);

  // Map facets to selected filters.
  return filteredFacets
    .map(mapSelectedFilter)
    .filter((filter) => filter.value.length > 0);
}

/**
 * Maps the facet to a selected filter.
 * @param facet - Facet.
 * @returns Selected filter.
 */
function mapSelectedFilter(facet: Facet): SelectedFilter {
  const { facet: categoryKey, selectedValues } = facet;
  return {
    categoryKey,
    value: selectedValues.filter(filterValue).map(mapValue),
  };
}

/**
 * Maps the selected value to a string.
 * @param selectedValue - Selected value.
 * @returns String.
 */
function mapValue(selectedValue: SelectedValue): string {
  return selectedValue.term;
}
