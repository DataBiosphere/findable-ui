import { CHART_SORT_FN } from "./constants";
import { CHART_SORT, ChartSortOptions, ChartSortFn } from "./types";

/**
 * Resolves chart sort options to a sorting function.
 * @param chartSortOptions - Chart sort option (ALPHA, COUNT, or custom function).
 * @returns Sorting function to use for chart data.
 */
export function getChartSortFn(
  chartSortOptions?: ChartSortOptions,
): ChartSortFn {
  // Default to COUNT sort if not specified.
  if (!chartSortOptions) {
    return CHART_SORT_FN[CHART_SORT.COUNT];
  }
  // If it's a custom function, return it directly.
  if (typeof chartSortOptions === "function") {
    return chartSortOptions;
  }
  // Otherwise, look up the function from the map.
  return CHART_SORT_FN[chartSortOptions];
}
