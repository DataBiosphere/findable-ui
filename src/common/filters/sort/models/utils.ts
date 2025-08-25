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
  // Handle empty labels
  if (!cvv0.label) return 1;
  if (!cvv1.label) return -1;

  return COLLATOR_CASE_INSENSITIVE.compare(cvv0.label, cvv1.label);
}
