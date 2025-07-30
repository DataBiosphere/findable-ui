import { Column, RowData, Table } from "@tanstack/react-table";
import { CategoryView } from "../../../../../../common/categories/views/types";
import { SelectCategoryValueView } from "../../../../../../common/entities";
import { getColumnHeader } from "../../../../../Table/common/utils";
import { getSortedFacetedValues } from "../../../../../Table/featureOptions/facetedColumn/utils";
import { SurfaceProps } from "../../../surfaces/types";

/**
 * Adapter for TanStack table column filters to category filters.
 * @param table - Table.
 * @returns Category filters.
 */
export function buildColumnFilters<T extends RowData>(
  table: Table<T>
): SurfaceProps["categoryFilters"] {
  // Build the category views; single category filter.
  const categoryViews = table
    .getAllColumns()
    .filter((column) => column.getCanFilter())
    .map(mapColumnToCategoryView);

  return [{ categoryViews }];
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
 * Adapter for TanStack column to category view.
 * Currently supports only select category views.
 * @param column - Column.
 * @returns Category view.
 */
function mapColumnToCategoryView<T extends RowData>(
  column: Column<T>
): CategoryView {
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
