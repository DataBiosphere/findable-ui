import { SelectCategoryValueView } from "../../../../../../../../../common/entities";
import { sortCategoryValueViews } from "../../../../../../../../../hooks/useCategoryFilter";

/**
 * Renders the button text for the chart.
 * @param maxBarCount - Maximum number of bars to display.
 * @param selectCategoryValueViews - Category value views.
 * @returns Button text.
 */
export function renderButtonText(
  maxBarCount: number | undefined,
  selectCategoryValueViews: SelectCategoryValueView[]
): string {
  if (!maxBarCount) return "Show less";

  // Calculate the number of additional bars to show.
  const totalBars = selectCategoryValueViews.length;
  const count = totalBars - maxBarCount;

  return `Show ${count} additional results`;
}

/**
 * Sorts category value views by count in descending order, then label in ascending order.
 * @param a - First category value view.
 * @param b - Second category value view.
 * @returns Sorted category value views.
 */
export function sortByCountThenLabel(
  a: SelectCategoryValueView,
  b: SelectCategoryValueView
): number {
  const compare = b.count - a.count;
  return compare === 0 ? sortCategoryValueViews(a, b) : compare;
}
