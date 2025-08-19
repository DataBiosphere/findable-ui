import { Column, RowData, Table } from "@tanstack/react-table";
import { isRangeCategoryConfig } from "../../../../../../common/categories/config/range/typeGuards";
import { CategoryConfig } from "../../../../../../common/categories/config/types";
import { RangeCategoryView } from "../../../../../../common/categories/views/range/types";
import { CategoryView } from "../../../../../../common/categories/views/types";
import {
  SelectCategoryValueView,
  SelectCategoryView,
} from "../../../../../../common/entities";
import { CategoryGroup } from "../../../../../../config/entities";
import { getColumnHeader } from "../../../../../Table/common/utils";
import { getSortedFacetedValues } from "../../../../../Table/featureOptions/facetedColumn/utils";
import { CategoryFilter } from "../../../Filters/filters";
import { SurfaceProps } from "../../../surfaces/types";
import { ColumnFiltersTableMeta } from "./types";

/**
 * Adapter for TanStack table to category configs.
 * @param table - Table.
 * @returns Category configs.
 */
function buildCategoryConfigs<T extends RowData>(
  table: Table<T>
): CategoryConfig[] {
  return table
    .getAllColumns()
    .filter((column) => column.getCanFilter())
    .map(mapCategoryConfig);
}

/**
 * Adapter for TanStack table to category filters.
 * @param table - Table.
 * @param categoryGroups - Category groups.
 * @returns Category filters.
 */
function buildCategoryFilters<T extends RowData>(
  table: Table<T>,
  categoryGroups: CategoryGroup[]
): SurfaceProps["categoryFilters"] {
  return categoryGroups.reduce<SurfaceProps["categoryFilters"]>(
    (acc, categoryGroup) => {
      const categoryFilter = mapCategoryFilter(table, categoryGroup);
      if (categoryFilter) acc.push(categoryFilter);
      return acc;
    },
    []
  );
}

/**
 * Adapter for TanStack table column filters to category filters.
 * @param table - Table.
 * @returns Category filters.
 */
export function buildColumnFilters<T extends RowData>(
  table: Table<T>
): SurfaceProps["categoryFilters"] {
  const { options } = table;
  const { meta = {} } = options;
  const { categoryGroups } = meta as ColumnFiltersTableMeta<T>;

  if (!categoryGroups) {
    // Build single category group with all (filterable) columns.
    const categoryConfigs: CategoryConfig[] = buildCategoryConfigs(table);
    // Build category filters from single category group.
    return buildCategoryFilters(table, [{ categoryConfigs, label: "" }]);
  }

  // Build category filters from category groups.
  return buildCategoryFilters(table, categoryGroups);
}

/**
 * Adapter for TanStack table column filters to selected count.
 * @param table - Table.
 * @returns Selected count.
 */
export function getColumnFiltersCount<T extends RowData>(
  table: Table<T>
): number {
  return table
    .getState()
    .columnFilters.reduce(
      (acc, columnFilter) => acc + (columnFilter.value as unknown[]).length,
      0
    );
}

/**
 * Adapter for TanStack column to category config.
 * @param column - Column.
 * @returns Category config.
 */
function mapCategoryConfig<T extends RowData>(
  column: Column<T>
): CategoryConfig {
  return {
    key: column.id,
    label: getColumnHeader(column),
  };
}

/**
 * Adapter for TanStack table to category filter.
 * @param table - Table.
 * @param categoryGroup - Category group.
 * @returns Category filter.
 */
function mapCategoryFilter<T extends RowData>(
  table: Table<T>,
  categoryGroup: CategoryGroup
): CategoryFilter | undefined {
  const { categoryConfigs, label } = categoryGroup;

  const categoryViews = categoryConfigs.reduce<CategoryView[]>(
    (acc, categoryConfig) => {
      const column = table.getColumn(categoryConfig.key);
      if (!column) return acc;
      if (!column.getCanFilter()) return acc;

      let categoryView: CategoryView;

      if (isRangeCategoryConfig(categoryConfig)) {
        // Build range category view.
        categoryView = mapColumnToRangeCategoryView(column, categoryConfig);
      } else {
        // Build select category view.
        categoryView = mapColumnToSelectCategoryView(column, categoryConfig);
      }

      return [...acc, categoryView];
    },
    []
  );

  if (categoryViews.length === 0) return;

  return { categoryViews, label };
}

/**
 * Adapter for TanStack column to range category view.
 * @param column - Column.
 * @param categoryConfig - Category config.
 * @returns Range category view.
 */
function mapColumnToRangeCategoryView<T extends RowData>(
  column: Column<T>,
  categoryConfig?: CategoryConfig
): RangeCategoryView {
  const minMax = column.getFacetedMinMaxValues();
  const isDisabled = !minMax;

  // Selected values for the column.
  const filterValue = (column.getFilterValue() || [null, null]) as [
    number | null,
    number | null
  ];

  return {
    annotation: undefined,
    isDisabled,
    key: column.id,
    label: getColumnHeader(column),
    max: minMax?.[1] || Infinity,
    min: minMax?.[0] || -Infinity,
    selectedMax: filterValue[1],
    selectedMin: filterValue[0],
    ...categoryConfig,
  };
}

/**
 * Adapter for TanStack column to select category view.
 * @param column - Column.
 * @param categoryConfig - Category config.
 * @returns Select category view.
 */
function mapColumnToSelectCategoryView<T extends RowData>(
  column: Column<T>,
  categoryConfig?: CategoryConfig
): SelectCategoryView {
  const facetedUniqueValues = column.getFacetedUniqueValues();
  const isDisabled = facetedUniqueValues.size === 0;
  const values = mapColumnToSelectCategoryValueView(column);
  return {
    annotation: undefined,
    enableChartView: false,
    isDisabled,
    key: column.id,
    label: getColumnHeader(column),
    values,
    ...categoryConfig,
  };
}

/**
 * Adapter for TanStack column to select category value view.
 * @param column - Column.
 * @returns Select category value view.
 */
function mapColumnToSelectCategoryValueView<T extends RowData>(
  column: Column<T>
): SelectCategoryValueView[] {
  // Get the faceted unique values and sort them.
  const facetedUniqueValues = column.getFacetedUniqueValues();
  const sortedFacetsValues = getSortedFacetedValues(facetedUniqueValues);

  // Selected values for the column.
  const filterValue = (column.getFilterValue() || []) as unknown[];

  // Build the select category values.
  const selectCategoryValues: SelectCategoryValueView[] = [];
  for (const [label, count] of sortedFacetsValues) {
    selectCategoryValues.push({
      count,
      key: String(label),
      label: String(label),
      selected: filterValue.includes(label),
    });
  }

  return selectCategoryValues;
}
