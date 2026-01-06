import { SelectCategoryValueView } from "../../../../../../../../../../../common/entities";
import { MAX_BAR_COUNT } from "./constants";

/**
 * Returns the initial bar count for the chart.
 * @param selectCategoryValueViews - Category value views.
 * @returns Initial bar count.
 */
export function initBarCount(
  selectCategoryValueViews: SelectCategoryValueView[],
): number | undefined {
  return isChartExpandable(selectCategoryValueViews)
    ? MAX_BAR_COUNT
    : undefined;
}

/**
 * Returns true if the chart is expandable.
 * The chart is expandable if the number of category values is greater than the maximum bar count.
 * @param selectCategoryValueViews - Category value views.
 * @returns True if the chart is expandable.
 */
export function isChartExpandable(
  selectCategoryValueViews: SelectCategoryValueView[],
): boolean {
  return selectCategoryValueViews.length > MAX_BAR_COUNT;
}

/**
 * Updates the bar count for the chart.
 * @param barCount - Current bar count.
 * @returns Updated bar count.
 */
export function updateBarCount(
  barCount: number | undefined,
): number | undefined {
  return barCount === undefined ? MAX_BAR_COUNT : undefined;
}
