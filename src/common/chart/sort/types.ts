import { SelectCategoryValueView } from "../../entities";

/**
 * Chart sorting options for select categories.
 */
export enum CHART_SORT {
  ALPHA = "ALPHA",
  COUNT = "COUNT",
}

/**
 * Sorting function type for select category values.
 */
export type ChartSortFn = (
  a: SelectCategoryValueView,
  b: SelectCategoryValueView,
) => number;

/**
 * Chart sort options - either a preset (ALPHA, COUNT) or a custom sort function.
 */
export type ChartSortOptions = CHART_SORT | ChartSortFn;
