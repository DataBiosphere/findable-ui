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
  categorySelectedFilter?: SelectedFilter
): RangeCategoryView {
  const categoryConfig = findRangeCategoryConfig(category.key, categoryConfigs);
  const [selectedMin, selectedMax] = getRangeSelectedValue(
    categorySelectedFilter
  );
  return {
    annotation: categoryConfig?.annotation,
    isDisabled: false,
    key: category.key,
    label: categoryConfig?.label || category.key,
    max: category.max,
    min: category.min,
    selectedMax,
    selectedMin,
    unit: categoryConfig?.unit,
  };
}
