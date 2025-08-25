import { SelectCategoryValueView } from "../../../../../../../../../common/entities";

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
