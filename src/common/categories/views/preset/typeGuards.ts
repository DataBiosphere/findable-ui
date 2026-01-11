import { CategoryView } from "../types";
import { PresetCategoryView } from "./types";

/**
 * Returns true if the category view is a preset category view.
 * @param view - Category view.
 * @returns true if the category view is a preset category view.
 */
export function isPresetCategoryView(
  view: CategoryView,
): view is PresetCategoryView {
  return "presets" in view;
}
