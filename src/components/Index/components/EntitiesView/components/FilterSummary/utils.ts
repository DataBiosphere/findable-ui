import { SelectCategoryView } from "../../../../../../common/entities";
import { CategoryFilter } from "../../../../../Filter/components/Filters/filters";

/**
 * Returns the set of category views that have summary view enabled.
 * @param categoryFilters - Category filters.
 * @returns Set of category views with summary view enabled.
 */
export function getSummaries(
  categoryFilters: CategoryFilter[]
): SelectCategoryView[] {
  return categoryFilters
    .flatMap(({ categoryViews }) => categoryViews)
    .filter(({ enableSummaryView = true }) => enableSummaryView)
    .filter(({ values }) => values && values.length > 0);
}
