import { VIEW_KIND } from "../../views/types";
import { CategoryConfig, PresetCategoryConfig } from "../types";

/**
 * Type guard to check if a category config is a preset category config.
 * @param categoryConfig - Category config.
 * @returns True if the category config is a preset category config.
 */
export function isPresetCategoryConfig(
  categoryConfig: CategoryConfig,
): categoryConfig is PresetCategoryConfig {
  return categoryConfig.viewKind === VIEW_KIND.PRESET;
}
