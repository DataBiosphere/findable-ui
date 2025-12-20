import { SelectCategoryView } from "../../../entities";
import { CategoryView } from "../types";

/**
 * Returns true if the category view is a select category view.
 * @param view - Category view.
 * @returns true if the category view is a select category view.
 */
export function isSelectCategoryView(
  view: CategoryView,
): view is SelectCategoryView {
  return "values" in view;
}
