import type { SelectCategoryValueView } from "../../../entities";

/**
 * Filter sort options.
 */
export enum FILTER_SORT {
  ALPHA = "ALPHA",
  COUNT = "COUNT",
}

/**
 * Comparator for sorting category value views, used in place of the built-in comparator for the current sort.
 * @param cvv0 - First category value view to compare.
 * @param cvv1 - Second category value view to compare.
 * @param sortBy - Current filter sort (ALPHA or COUNT).
 * @returns Number indicating sort precedence of cvv0 vs cvv1.
 */
export type FilterSortCompare = (
  cvv0: SelectCategoryValueView,
  cvv1: SelectCategoryValueView,
  sortBy: FILTER_SORT,
) => number;

/**
 * Filter sort configuration for site config.
 */
export interface FilterSortConfig {
  compare?: FilterSortCompare;
  sortBy?: FILTER_SORT;
}
