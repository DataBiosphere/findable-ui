import { useMemo, useRef } from "react";
import {
  getBorderBoxSize,
  useResizeObserver,
} from "../../../../../../../../../hooks/useResizeObserver";
import { CategoryFilter } from "../../../../../../../../Filter/components/Filters/filters";
import { getSelectCategoryViews, getSVGWidth } from "../../utils";
import { UseChartView } from "./types";

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
