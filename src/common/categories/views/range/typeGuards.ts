import { CategoryView } from "../types";
import { RangeCategoryView } from "./types";

/**
 * Returns true if the category view is a range category view.
 * @param view - Category view.
 * @returns true if the category view is a range category view.
 */
export function isRangeCategoryView(
  view: CategoryView
): view is RangeCategoryView {
  return "max" in view && "min" in view;
}
