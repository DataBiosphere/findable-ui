import { COLLATOR_CASE_INSENSITIVE } from "../../../constants";
import { SelectCategoryValueView } from "../../../entities";
import { FILTER_SORT, type FilterSortCompare } from "../config/types";

/**
 * Returns the built-in comparator for the given filter sort, so a custom comparator can hand values it does not order itself to the built-in sort.
 * @param filterSort - Sort configuration (ALPHA or COUNT).
 * @returns Built-in comparator for the filter sort.
 */
export function getFilterSortFn(
  filterSort: FILTER_SORT,
): (cvv0: SelectCategoryValueView, cvv1: SelectCategoryValueView) => number {
  return filterSort === FILTER_SORT.ALPHA
    ? sortCategoryValueViewsAlpha
    : sortCategoryValueViewsCount;
}

/**
 * Sort category value views based on filter sort configuration.
 * Uses function selection pattern for efficiency.
 * @param categoryValueViews - Array of category value views to sort.
 * @param filterSort - Sort configuration (ALPHA or COUNT).
 * @param compare - Optional comparator, used in place of the built-in comparator for the filter sort.
 */
export function sortCategoryValueViews(
  categoryValueViews: SelectCategoryValueView[],
  filterSort: FILTER_SORT,
  compare?: FilterSortCompare,
): void {
  categoryValueViews.sort(
    compare
      ? (cvv0, cvv1): number => compare(cvv0, cvv1, filterSort)
      : getFilterSortFn(filterSort),
  );
}

/**
 * Sort category value views alphabetically.
 * @param cvv0 - First category value view to compare.
 * @param cvv1 - Second category value view to compare.
 * @returns Number indicating sort precedence of cvv0 vs cvv1.
 */
export function sortCategoryValueViewsAlpha(
  cvv0: SelectCategoryValueView,
  cvv1: SelectCategoryValueView,
): number {
  // Handle empty labels.
  if (!cvv0.label) return 1;
  if (!cvv1.label) return -1;

  return COLLATOR_CASE_INSENSITIVE.compare(cvv0.label, cvv1.label);
}

/**
 * Sort category value views by count (descending), then alphabetically.
 * @param cvv0 - First category value view to compare.
 * @param cvv1 - Second category value view to compare.
 * @returns Number indicating sort precedence of cvv0 vs cvv1.
 */
export function sortCategoryValueViewsCount(
  cvv0: SelectCategoryValueView,
  cvv1: SelectCategoryValueView,
): number {
  // Sort by count descending, then alphabetically.
  const countDiff = cvv1.count - cvv0.count;

  if (countDiff !== 0) return countDiff;

  return sortCategoryValueViewsAlpha(cvv0, cvv1);
}
