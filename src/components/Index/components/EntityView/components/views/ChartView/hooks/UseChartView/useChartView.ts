import { useMemo, useRef } from "react";
import {
  getBorderBoxSize,
  useResizeObserver,
} from "../../../../../../../../../hooks/useResizeObserver";
import { CategoryFilter } from "../../../../../../../../Filter/components/Filters/filters";
import { getSelectCategoryViews, getSVGWidth } from "../../utils";
import { UseChartView } from "./types";

/**
 * Selects the category views to chart (select categories with values whose chart is not disabled) and measures the chart view's width while there are any.
 * @param categoryFilters - Category filters.
 * @returns The chart view ref, the category views to chart, and the chart width: the chart view's width less its horizontal padding (see getSVGWidth), or 0 until measured.
 */
export const useChartView = (
  categoryFilters: CategoryFilter[],
): UseChartView => {
  const chartViewRef = useRef<HTMLDivElement>(null);
  const selectCategoryViews = useMemo(
    () => getSelectCategoryViews(categoryFilters),
    [categoryFilters],
  );
  const shouldObserve = useMemo(
    () => selectCategoryViews.length > 0,
    [selectCategoryViews],
  );
  const chartViewRect = useResizeObserver(
    chartViewRef,
    getBorderBoxSize,
    shouldObserve,
  );
  const width = getSVGWidth(chartViewRect?.width);
  return { chartViewRef, selectCategoryViews, width };
};
