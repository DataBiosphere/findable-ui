import { isSelectCategoryView } from "../../../../../../../common/categories/views/select/typeGuards";
import { getChartSortFn } from "../../../../../../../common/chart/sort/utils";
import type { SelectCategoryView } from "../../../../../../../common/entities";
import type { CategoryFilter } from "../../../../../../Filter/components/Filters/filters";

/**
 * Returns the select category views that have values and chart view enabled, each with its values sorted by the category's configured chart sort.
 * @param categoryFilters - Category filters.
 * @returns Category views with chart view enabled, with sorted values.
 */
export function getSelectCategoryViews(
  categoryFilters: CategoryFilter[],
): SelectCategoryView[] {
  return categoryFilters
    .flatMap(({ categoryViews }) => categoryViews)
    .filter(isSelectCategoryView)
    .filter(({ chart }) => chart?.enable !== false)
    .filter(({ values }) => values.length > 0)
    .map((view) => ({
      ...view,
      values: [...view.values].sort(getChartSortFn(view.chart?.sortBy)),
    }));
}

/**
 * Returns the available SVG `width` from the container width.
 * @param width - View width.
 * @returns width.
 */
export function getSVGWidth(width?: number): number {
  if (!width) return 0;
  return width - 40; // 20px padding on each side.
}
