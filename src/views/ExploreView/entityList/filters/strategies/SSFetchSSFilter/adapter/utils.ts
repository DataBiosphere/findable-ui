import { ServerDataContextProps } from "../../../../data/strategies/SSFetchSSFilter/provider/types";
import { CategoryFilter } from "../../../../../../../components/Filter/components/Filters/types";
import { CategoryGroupConfig } from "../../../../../../../config/entities";
import { ColumnFilter } from "@tanstack/react-table";
import { CategoryView } from "../../../../../../../common/categories/views/types";
import {
  SelectCategoryValueView,
  SelectCategoryView,
} from "../../../../../../../common/entities";
import { assertNoRangeCategoryConfig } from "../../../../../../../common/categories/config/assertions";
import { CategoryConfig } from "../../../../../../../common/categories/config/types";
import { sortCategoryValueViews } from "../../../../../../../common/filters/sort/models/utils";
import { FILTER_SORT } from "../../../../../../../common/filters/sort/config/types";
import { LABEL } from "../../../../../../../apis/azul/common/entities";

/**
 * Builds category filters from column filters and server-side fetched term facets.
 * @param categoryDefinition - Category definition.
 * @param columnFilters - Column filters.
 * @param termFacets - Term facets.
 * @returns Category filters.
 */
export function buildCategoryFilters(
  categoryDefinition: CategoryGroupConfig,
  columnFilters: ColumnFilter[],
  termFacets?: ServerDataContextProps["termFacets"],
): CategoryFilter[] {
  const categoryFilters: CategoryFilter[] = [];

  for (const { label, categoryConfigs } of categoryDefinition.categoryGroups) {
    // Build the category views.
    const categoryViews: CategoryView[] = [];

    for (const categoryConfig of categoryConfigs) {
      // Range category configs are not supported for server-side filters.
      assertNoRangeCategoryConfig(categoryConfig);

      // Map category term facets to unique values and their counts.
      const facetedUniqueValues = getFacetedUniqueValues(
        categoryConfig,
        termFacets,
      );

      // Selected values for the category.
      const filterValue =
        (columnFilters.find(({ id }) => id === categoryConfig.key)
          ?.value as string[]) ?? [];

      // Update faceted unique values with selected filters that are not in the faceted unique values.
      for (const value of filterValue) {
        if (typeof value !== "string") continue;
        if (facetedUniqueValues.has(value)) continue;
        facetedUniqueValues.set(value, 0);
      }

      const isDisabled = facetedUniqueValues.size === 0;

      // Build the select category values.
      const categoryValueViews: SelectCategoryValueView[] = [];

      for (const [label, count] of [...facetedUniqueValues]) {
        categoryValueViews.push({
          count,
          key: String(label),
          label: String(label ?? LABEL.UNSPECIFIED),
          selected: filterValue.includes(label),
        });
      }

      sortCategoryValueViews(categoryValueViews, FILTER_SORT.ALPHA);

      const mapper = categoryConfig.mapSelectCategoryValue || ((v) => v);

      // Build the select category view.
      const categoryView: SelectCategoryView = {
        annotation: categoryConfig.annotation,
        enableChartView: categoryConfig.enableChartView,
        isDisabled,
        key: categoryConfig.key,
        label: categoryConfig.label,
        values: categoryValueViews.map(mapper),
      };

      categoryViews.push(categoryView);
    }

    // Push the category filter to the category filters array.
    categoryFilters.push({ label, categoryViews });
  }

  return categoryFilters;
}

function getFacetedUniqueValues(
  categoryConfig: CategoryConfig,
  termFacets?: ServerDataContextProps["termFacets"],
): Map<string, number> {
  if (!termFacets) return new Map();

  const { key } = categoryConfig;

  if (!termFacets[key]) throw new Error(`Term facets for ${key} not found.`);

  return termFacets[key].terms.reduce<Map<string, number>>(
    (acc, term) => acc.set(term.term, term.count),
    new Map(),
  );
}
