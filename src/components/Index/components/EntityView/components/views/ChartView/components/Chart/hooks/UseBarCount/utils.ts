import { SelectCategoryValueView } from "../../../../../../../../../../../common/entities";
import { MAX_BAR_COUNT } from "./constants";

/**
 * Returns the number of bars the chart shows: the maximum bar count when the chart is expandable and not expanded, otherwise undefined (all bars).
 * @param expandable - Whether the chart is expandable.
 * @param expanded - Whether the chart is expanded.
 * @returns Bar count, or undefined when all bars are shown.
 */
export function getBarCount(
  expandable: boolean,
  expanded: boolean,
): number | undefined {
  return expandable && !expanded ? MAX_BAR_COUNT : undefined;
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
 * Toggles whether the chart is expanded to show all bars.
 * @param expanded - Whether the chart is expanded.
 * @returns The toggled expanded state.
 */
export function toggleExpanded(expanded: boolean): boolean {
  return !expanded;
}
