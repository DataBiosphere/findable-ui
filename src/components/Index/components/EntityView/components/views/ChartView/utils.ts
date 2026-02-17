import { isSelectCategoryView } from "../../../../../../../common/categories/views/select/typeGuards";
import { SelectCategoryView } from "../../../../../../../common/entities";
import { CategoryFilter } from "../../../../../../Filter/components/Filters/filters";

/**
 * Returns the set of select category views that have chart view enabled.
 * @param categoryFilters - Category filters.
 * @returns Set of category views with chart view enabled.
 */
export function getSelectCategoryViews(
  categoryFilters: CategoryFilter[],
): SelectCategoryView[] {
  return categoryFilters
    .flatMap(({ categoryViews }) => categoryViews)
    .filter(isSelectCategoryView)
    .filter(({ chart }) => chart?.enable !== false)
    .filter(({ values }) => values.length > 0);
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
