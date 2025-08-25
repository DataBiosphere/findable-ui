import { COLLATOR_CASE_INSENSITIVE } from "../../../constants";
import { SelectCategoryValueView } from "../../../entities";

/**
 * Sort category value views alphabetically.
 * @param cvv0 - First category value view to compare.
 * @param cvv1 - Second category value view to compare.
 * @returns Number indicating sort precedence of cvv0 vs cvv1.
 */

export function sortCategoryValueViewsAlpha(
  cvv0: SelectCategoryValueView,
  cvv1: SelectCategoryValueView
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
  cvv1: SelectCategoryValueView
): number {
  // Sort by count descending, then alphabetically.
  const countDiff = cvv1.count - cvv0.count;

  if (countDiff !== 0) return countDiff;

  return sortCategoryValueViewsAlpha(cvv0, cvv1);
}
