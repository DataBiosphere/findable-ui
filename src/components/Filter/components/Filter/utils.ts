import { isPresetCategoryView } from "../../../../common/categories/views/preset/typeGuards";
import { isRangeCategoryView } from "../../../../common/categories/views/range/typeGuards";
import { CategoryView } from "../../../../common/categories/views/types";

/**
 * Returns the count to display for a filter label based on the category view type.
 * @param categoryView - Category view.
 * @returns Count for filter label, or undefined for range views.
 */
export function getFilterLabelCount(
  categoryView: CategoryView,
): number | undefined {
  if (isRangeCategoryView(categoryView)) return undefined;
  if (isPresetCategoryView(categoryView)) return categoryView.presets.length;
  return categoryView.values.length;
}
