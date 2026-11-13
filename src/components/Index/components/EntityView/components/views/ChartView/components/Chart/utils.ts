import { SelectCategoryValueView } from "../../../../../../../../../common/entities";
import { MAX_BAR_COUNT } from "./hooks/UseBarCount/constants";

/**
 * Renders the button text for an expandable chart.
 * @param expanded - Whether the chart is expanded.
 * @param selectCategoryValueViews - Category value views.
 * @returns "Show less" when expanded, otherwise the number of additional results the button shows.
 */
export function renderButtonText(
  expanded: boolean,
  selectCategoryValueViews: SelectCategoryValueView[],
): string {
  if (expanded) return "Show less";
  return `Show ${selectCategoryValueViews.length - MAX_BAR_COUNT} additional results`;
}
