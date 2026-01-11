import { VIEW_KIND } from "../views/types";
import {
  CategoryConfig,
  PresetCategoryConfig,
  RangeCategoryConfig,
} from "./types";

/**
 * Asserts that the category config is not a preset category config.
 * @param categoryConfig - Category config.
 */
export function assertNoPresetCategoryConfig(
  categoryConfig: CategoryConfig,
): asserts categoryConfig is Exclude<CategoryConfig, PresetCategoryConfig> {
  if (categoryConfig.viewKind === VIEW_KIND.PRESET) {
    throw new Error("Preset filters are not supported in this context.");
  }
}

/**
 * Asserts that the category config is not a range category config.
 * @param categoryConfig - Category config.
 */
export function assertNoRangeCategoryConfig(
  categoryConfig: CategoryConfig,
): asserts categoryConfig is Exclude<CategoryConfig, RangeCategoryConfig> {
  if (categoryConfig.viewKind === VIEW_KIND.RANGE) {
    throw new Error("Range filters are not supported.");
  }
}
