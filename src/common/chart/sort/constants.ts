import {
  sortCategoryValueViewsAlpha,
  sortCategoryValueViewsCount,
} from "../../filters/sort/models/utils";
import { CHART_SORT, ChartSortFn } from "./types";

/**
 * Map of chart sort options to their corresponding sort functions.
 */
export const CHART_SORT_FN: Record<CHART_SORT, ChartSortFn> = {
  [CHART_SORT.ALPHA]: sortCategoryValueViewsAlpha,
  [CHART_SORT.COUNT]: sortCategoryValueViewsCount,
};
