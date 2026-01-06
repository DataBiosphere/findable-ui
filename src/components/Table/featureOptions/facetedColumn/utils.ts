import { COLLATOR_CASE_INSENSITIVE } from "../../../../common/constants";

/**
 * Sorts Map entries by key.
 * @param facetedValues - Map of faceted values.
 * @returns Sorted array of [key, value] entries.
 */
export function getSortedFacetedValues(
  facetedValues: Map<unknown, number>,
): [unknown, number][] {
  return [...facetedValues].sort((a, b) =>
    COLLATOR_CASE_INSENSITIVE.compare(String(a), String(b)),
  );
}
