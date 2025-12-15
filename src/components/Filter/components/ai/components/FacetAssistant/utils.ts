import { SelectedFilter } from "../../../../../../common/entities";
import { AiResponse, Facet, SelectedValue } from "./types";

/**
 * Filters out unknown facets.
 * @param facet - Facet.
 * @returns Boolean.
 */
function filterFacet(facet: Facet): boolean {
  return facet.facet !== "unknown" && facet.facet !== "unmatched";
}

/**
 * Filters out unknown values.
 * @param value - Value.
 * @returns Boolean.
 */
function filterValue(value: string): boolean {
  return value !== "unknown";
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
  return filteredFacets.map(mapSelectedFilter);
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
    value: selectedValues.map(mapValue).filter(filterValue),
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
