import { ServerDataContextProps } from "../../../../data/strategies/SSFetchSSFilter/provider/types";
import { CategoryFilter } from "../../../../../../../components/Filter/components/Filters/types";
import { CategoryGroup } from "../../../../../../../config/entities";
import { ColumnFilter } from "@tanstack/react-table";
import { CategoryView } from "../../../../../../../common/categories/views/types";
import {
  SelectCategoryValue,
  SelectCategoryValueView,
  SelectCategoryView,
} from "../../../../../../../common/entities";
import { assertNoRangeCategoryConfig } from "../../../../../../../common/categories/config/assertions";
import { isPresetCategoryConfig } from "../../../../../../../common/categories/config/preset/typeGuards";
import { PresetDefinition } from "../../../../../../../common/categories/config/preset/types";
import {
  CategoryConfig,
  PresetCategoryConfig,
  SelectCategoryConfig,
} from "../../../../../../../common/categories/config/types";
import {
  PresetCategoryView,
  PresetValueView,
} from "../../../../../../../common/categories/views/preset/types";
import { sortCategoryValueViews } from "../../../../../../../common/filters/sort/models/utils";
import { FILTER_SORT } from "../../../../../../../common/filters/sort/config/types";
import {
  AzulTerm,
  AzulTermFacets,
  LABEL,
} from "../../../../../../../apis/azul/common/entities";

/**
 * Builds a category filter view from category configuration, column filter
 * state, and server-provided facet term data.
 *
 * @param categoryGroup - Category group.
 * @param filterSort - Filter sort.
 * @param columnFilters - Column filters.
 * @param termFacets - Term facets.
 * @param presetKey - Preset key (pre-configured preset).
 * @returns Category filter.
 */
function buildCategoryFilter(
  categoryGroup: CategoryGroup,
  filterSort: FILTER_SORT,
  columnFilters: ColumnFilter[],
  termFacets: ServerDataContextProps["termFacets"] | undefined,
  presetKey: string | null,
): CategoryFilter {
  const { categoryConfigs, label } = categoryGroup;

  const categoryViews = categoryConfigs.reduce<CategoryView[]>(
    (acc, categoryConfig) => {
      // Preset category views are built from config, not server data.
      if (isPresetCategoryConfig(categoryConfig)) {
        acc.push(getPresetCategoryView(categoryConfig, presetKey));
        return acc;
      }

      // Grab the facet filter values.
      const filterValue = getFilterValue(categoryConfig, columnFilters);

      // Grab the facet terms.
      const terms = getFacetTerms(categoryConfig, termFacets);

      // Build facet term state (count + selection) for the category.
      const facetTermState = buildFacetTermState(terms, filterValue);

      // Range category view are not supported for server-side filters.
      assertNoRangeCategoryConfig(categoryConfig);

      // Select category view.
      const categoryView = getSelectCategoryView(
        categoryConfig,
        filterSort,
        facetTermState,
      );

      acc.push(categoryView);

      return acc;
    },
    [],
  );

  return { categoryViews, label };
}

/**
 * Builds category filters from category groups, server-side facet term data,
 * and current column filter state.
 *
 * @param categoryGroups - Category groups.
 * @param filterSort - Filter sort.
 * @param columnFilters - Column filters.
 * @param termFacets - Term facets.
 * @param presetKey - Preset key (pre-configured preset).
 * @returns Category filters.
 */
export function buildCategoryFilters(
  categoryGroups: CategoryGroup[],
  filterSort: FILTER_SORT,
  columnFilters: ColumnFilter[],
  termFacets: ServerDataContextProps["termFacets"] | undefined,
  presetKey: string | null,
): CategoryFilter[] {
  return categoryGroups.map((categoryGroup) =>
    buildCategoryFilter(
      categoryGroup,
      filterSort,
      columnFilters,
      termFacets,
      presetKey,
    ),
  );
}

/**
 * Retrieves facet terms for a category from server-provided term facets.
 *
 * @param categoryConfig - Category config.
 * @param termFacets - Term facets.
 * @returns Facet terms.
 */
function getFacetTerms(
  categoryConfig: CategoryConfig,
  termFacets?: AzulTermFacets,
): AzulTerm[] {
  if (!termFacets) return [];

  const { key } = categoryConfig;

  if (!termFacets[key]) throw new Error(`Term facets for ${key} not found.`);

  return termFacets[key].terms;
}

/**
 * Builds facet term state (count and selection) from server-provided terms
 * and the current filter selection. Ensures that selected terms are preserved
 * even when their count is zero.
 *
 * @param terms - Facet terms returned from the server, each with a count.
 * @param filterValue - Currently selected filter values for the facet.
 * @returns A map of facet term state keyed by term value, including count and selection status.
 */

function buildFacetTermState(
  terms: AzulTerm[],
  filterValue: string[],
): Map<string, Pick<SelectCategoryValue, "count" | "selected">> {
  const selectedValues = new Set(filterValue);

  const facetTermState = new Map<
    string,
    Pick<SelectCategoryValue, "count" | "selected">
  >();

  for (const { count, term } of terms) {
    facetTermState.set(term, {
      count,
      selected: selectedValues.has(term),
    });
  }

  // Preserve selected terms that are missing from the server response.
  for (const value of filterValue) {
    if (facetTermState.has(value)) continue;
    facetTermState.set(value, { count: 0, selected: true });
  }

  return facetTermState;
}

/**
 * Retrieves the current filter values for a category from table column filters.
 * Enforces the invariant that filter values must be an array.
 *
 * @param categoryConfig - Category config.
 * @param columnFilters - Column filters.
 * @returns Filter value.
 */
function getFilterValue(
  categoryConfig: CategoryConfig,
  columnFilters: ColumnFilter[],
): string[] {
  const value = columnFilters.find(
    ({ id }) => id === categoryConfig.key,
  )?.value;

  if (!value) return [];

  if (!Array.isArray(value))
    throw new Error(
      `Table columnFilters value is not an array, ${categoryConfig.key}`,
    );

  return value;
}

/**
 * Builds a preset category view from configuration and current preset selection.
 * @param presetCategoryConfig - Preset category config.
 * @param presetKey - Currently selected preset key.
 * @returns Preset category view.
 */
function getPresetCategoryView(
  presetCategoryConfig: PresetCategoryConfig,
  presetKey: string | null,
): PresetCategoryView {
  return {
    annotation: presetCategoryConfig.annotation,
    isDisabled: presetCategoryConfig.presets.length === 0,
    key: presetCategoryConfig.key,
    label: presetCategoryConfig.label,
    presets: getPresetValueViews(presetCategoryConfig.presets, presetKey),
  };
}

/**
 * Maps preset definitions to preset value views with selection state.
 * @param presetDefinitions - Preset definitions from config.
 * @param presetKey - Currently selected preset key.
 * @returns Preset value views.
 */
function getPresetValueViews(
  presetDefinitions: PresetDefinition[],
  presetKey: string | null,
): PresetValueView[] {
  return presetDefinitions.map((preset) => ({
    key: preset.key,
    label: preset.label,
    selected: preset.key === presetKey,
  }));
}

/**
 * Maps facet term state to select category value views, applying sorting and
 * optional value mapping.
 *
 * @param selectCategoryConfig - Select category config.
 * @param filterSort - Filter sort.
 * @param facetTermState - Facet term state.
 * @returns Select category value views.
 */
function getSelectCategoryValueViews(
  selectCategoryConfig: SelectCategoryConfig,
  filterSort: FILTER_SORT,
  facetTermState: Map<string, Pick<SelectCategoryValue, "count" | "selected">>,
): SelectCategoryValueView[] {
  const categoryValueViews: SelectCategoryValueView[] = [];

  for (const [term, { count, selected }] of [...facetTermState]) {
    categoryValueViews.push({
      count,
      key: term,
      label: String(term ?? LABEL.UNSPECIFIED),
      selected,
    });
  }

  // Sort values alphabetically or by count.
  sortCategoryValueViews(categoryValueViews, filterSort);

  const { mapSelectCategoryValue } = selectCategoryConfig;

  if (!mapSelectCategoryValue) return categoryValueViews;

  // Map select category values to custom display value.
  return categoryValueViews.map(mapSelectCategoryValue);
}

/**
 * Builds a select category view from configuration and facet term state.
 *
 * @param selectCategoryConfig - Select category config.
 * @param filterSort - Filter sort.
 * @param facetTermState - Facet term state.
 * @returns Select category view.
 */
function getSelectCategoryView(
  selectCategoryConfig: SelectCategoryConfig,
  filterSort: FILTER_SORT,
  facetTermState: Map<string, Pick<SelectCategoryValue, "count" | "selected">>,
): SelectCategoryView {
  return {
    annotation: selectCategoryConfig.annotation,
    enableChartView: selectCategoryConfig.enableChartView,
    isDisabled: facetTermState.size === 0,
    key: selectCategoryConfig.key,
    label: selectCategoryConfig.label,
    values: getSelectCategoryValueViews(
      selectCategoryConfig,
      filterSort,
      facetTermState,
    ),
  };
}
