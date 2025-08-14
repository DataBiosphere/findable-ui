import { RangeCategoryView } from "../../views/range/types";
import { VIEW_KIND } from "../../views/types";
import { CategoryConfig } from "../types";

/**
 * Determine if the given category config is a range category.
 * @param categoryConfig - Category config.
 * @returns True if the category config is a range category, false otherwise.
 */
export function isRangeCategoryConfig(
  categoryConfig: CategoryConfig
): categoryConfig is RangeCategoryView {
  return categoryConfig.viewKind === VIEW_KIND.RANGE;
}
