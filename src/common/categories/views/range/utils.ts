import { SelectedFilter } from "../../../entities";
import { CategoryConfig } from "../../config/types";
import { findRangeCategoryConfig } from "../../config/utils";
import { RangeCategory } from "../../models/range/types";
import { getRangeSelectedValue } from "../../models/range/utils";
import { RangeCategoryView } from "../../views/range/types";

/**
 * Build the view-specific model of the given range category.
 * @param category - The range category to build a view model of.
 * @param categoryConfigs - Category configs indicating accept list as well as label configuration.
 * @param categorySelectedFilter - Current filter state for a category.
 * @returns Full built range category view, ready for display.
 */
export function buildRangeCategoryView(
  category: RangeCategory,
  categoryConfigs: CategoryConfig[],
  categorySelectedFilter?: SelectedFilter,
): RangeCategoryView {
  const categoryConfig = findRangeCategoryConfig(category.key, categoryConfigs);
  const [selectedMin, selectedMax] = getRangeSelectedValue(
    categorySelectedFilter,
  );
  return {
    annotation: categoryConfig?.annotation,
    isDisabled: !isFinite(category.min) && !isFinite(category.max),
    key: category.key,
    label: categoryConfig?.label || category.key,
    max: category.max,
    min: category.min,
    selectedMax,
    selectedMin,
    unit: categoryConfig?.unit,
  };
}

/**
 * Returns the maximum value from a faceted min/max tuple, falling back to Infinity.
 * Uses nullish coalescing to correctly handle a max of 0.
 * @param minMax - Faceted min/max values, or undefined.
 * @returns The maximum value.
 */
export function getRangeMax(minMax: [number, number] | undefined): number {
  return minMax?.[1] ?? Infinity;
}

/**
 * Returns the minimum value from a faceted min/max tuple, falling back to -Infinity.
 * Uses nullish coalescing to correctly handle a min of 0.
 * @param minMax - Faceted min/max values, or undefined.
 * @returns The minimum value.
 */
export function getRangeMin(minMax: [number, number] | undefined): number {
  return minMax?.[0] ?? -Infinity;
}
