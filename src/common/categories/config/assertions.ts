import { VIEW_KIND } from "../views/types";
import { CategoryConfig } from "./types";
import { RangeCategoryConfig } from "./types";

/**
 * Asserts that the category config is not a range category config.
 *
 * @param categoryConfig - Category config.
 */
export function assertNoRangeCategoryConfig(
  categoryConfig: CategoryConfig,
): asserts categoryConfig is Exclude<CategoryConfig, RangeCategoryConfig> {
  if (categoryConfig.viewKind === VIEW_KIND.RANGE) {
    throw new Error("Range filters are not supported.");
  }
}
