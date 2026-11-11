import { useCallback, useState } from "react";
import { SelectCategoryValueView } from "../../../../../../../../../../../common/entities";
import { UseBarCount } from "./types";
import { getBarCount, isChartExpandable, toggleExpanded } from "./utils";

/**
 * Manages the number of bars a chart shows: the maximum bar count (MAX_BAR_COUNT) when there are more values than that and the chart is not expanded, otherwise all of them. Toggling expands or collapses the chart.
 * The bar count follows the current values. A chart whose values drop to the maximum bar count or fewer collapses, so it shows the maximum bar count when its values grow past it again.
 * @param selectCategoryValueViews - Category values.
 * @returns The bar count (undefined when all bars are shown), whether the chart is expandable, whether it is expanded, and the toggle handler.
 */
export const useBarCount = (
  selectCategoryValueViews: SelectCategoryValueView[],
): UseBarCount => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const expandable = isChartExpandable(selectCategoryValueViews);

  // Adjust state during render, rather than in an effect, so the chart never paints expanded without a button.
  if (expanded && !expandable) setExpanded(false);

  const onToggleBarCount = useCallback(() => {
    setExpanded(toggleExpanded);
  }, []);

  return {
    barCount: getBarCount(expandable, expanded),
    expandable,
    expanded,
    onToggleBarCount,
  };
};
