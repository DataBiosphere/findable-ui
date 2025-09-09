import {
  Cell,
  Column,
  ColumnFiltersState,
  memo,
  PaginationState,
  Row,
  RowData,
  sortingFns,
  Table,
} from "@tanstack/react-table";
import { Category } from "../../../common/categories/models/types";
import { EXPLORE_MODE, ExploreMode } from "../../../hooks/useExploreMode/types";

/**
 * Internal model of a category term count keyed by category term.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This type matches react table getFacetedUniqueValues return type see https://github.com/TanStack/table/blob/6d4a91e74676da0b28fe07fcc1b7d26f535db0f4/packages/table-core/src/utils/getFacetedUniqueValues.ts.
type CountByTerms = Map<any, number>;

/**
 * Pinned cell and pinned cell index tuple.
 */
type PinnedCell<T extends RowData> = [Cell<T, unknown>, number];

/**
 * Build view-specific models from react table faceted values function.
 * @param columns - Table columns.
 * @param columnFilters - Column filters state.
 * @returns Array of category views objects.
 */
export function buildCategoryViews<T extends RowData>(
  columns: Column<T>[],
  columnFilters: ColumnFiltersState
): Category[] {
  const categoryViews: Category[] = [];
  for (const column of columns) {
    const {
      columnDef,
      getCanFilter,
      getFacetedMinMaxValues,
      getFacetedUniqueValues,
      id,
    } = column;
    const { header: columnHeader } = columnDef;
    if (getCanFilter()) {
      const key = id;
      const label = columnHeader as string;
      // Handle range categories.
      if (columnDef.filterFn === "inNumberRange") {
        const minMax = getFacetedMinMaxValues();
        categoryViews.push({
          key,
          label,
          max: minMax?.[1] || Infinity,
          min: minMax?.[0] || -Infinity,
          selectedMax: null, // Selected state updated in reducer.
          selectedMin: null, // Selected state updated in reducer.
        });
      }
      // Handle select categories.
      if (columnDef.filterFn === "arrIncludesSome") {
        updateFacetedUniqueValues(getFacetedUniqueValues(), columnFilters, id);
        const values = [...getFacetedUniqueValues()].map(([value, count]) => ({
          count,
          key: value,
          label: String(value ?? ""),
          selected: false, // Selected state updated in reducer.
        }));
        categoryViews.push({
          key,
          label,
          values: values,
        });
      }
    }
  }
  return categoryViews;
}

/**
 * Returns the header for a column as a string.
 * @param column - Column.
 * @returns column header.
 */
export function getColumnHeader<T extends RowData>(column: Column<T>): string {
  const { columnDef, id = "" } = column;
  const { header, meta } = columnDef;

  // Return header if it is a string.
  if (typeof header === "string") return header;

  // Return header from meta or id.
  return meta?.header || id;
}

/**
 * Returns unique category term counts keyed by category terms.
 * Custom function based off react table function getFacetedUniqueValues, see
 * https://tanstack.com/table/v8/docs/api/features/filters#getfaceteduniquevalues, and
 * https://github.com/TanStack/table/blob/6d4a91e74676da0b28fe07fcc1b7d26f535db0f4/packages/table-core/src/utils/getFacetedUniqueValues.ts.
 * @returns Unique category term counts keyed by category terms.
 */
export function getFacetedUniqueValuesWithArrayValues<T extends RowData>(): (
  table: Table<T>,
  columnId: string
) => () => CountByTerms {
  return (table, columnId) =>
    memo(
      () => [table.getColumn(columnId)?.getFacetedRowModel()],
      (facetedRowModel) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This type matches react table getFacetedUniqueValues return type.
        const facetedUniqueValues = new Map<any, number>();
        if (facetedRowModel) {
          for (let i = 0; i < facetedRowModel.flatRows.length; i++) {
            const value = facetedRowModel?.flatRows[i]?.getValue(columnId);
            if (Array.isArray(value)) {
              value.map((val) => {
                updateCountByTerms(facetedUniqueValues, val);
              });
            } else {
              updateCountByTerms(facetedUniqueValues, value);
            }
          }
        }
        return facetedUniqueValues;
      },
      {
        debug: () => table.options.debugAll ?? table.options.debugTable,
        key:
          process.env.NODE_ENV === "development" &&
          "getFacetedUniqueValues_" + columnId,
        // eslint-disable-next-line @typescript-eslint/no-empty-function -- allow dummy function for default.
        onChange: () => {},
      }
    );
}

/**
 * Returns the pinned cell and its index tuple.
 * @param row - Row.
 * @returns pinned cell and index tuple.
 */
export function getPinnedCellIndex<T extends RowData>(
  row: Row<T>
): PinnedCell<T> {
  const visibleCells = row.getVisibleCells();
  let pinnedIndex = 0;
  for (let i = 0; i < visibleCells.length; i++) {
    const cell = visibleCells[i];
    if (cell.getIsGrouped()) {
      pinnedIndex = i;
      break;
    }
    if (cell.column.columnDef.meta?.columnPinned) {
      pinnedIndex = i;
      break;
    }
  }
  return [visibleCells[pinnedIndex], pinnedIndex];
}

/**
 * Returns table state pagination.
 * @param pageIndex - Explore state page index.
 * @param pageSize - Explore state page size.
 * @returns table state pagination.
 */
export function getTableStatePagination(
  pageIndex = 0,
  pageSize: number
): PaginationState {
  return {
    pageIndex,
    pageSize,
  };
}

/**
 * Returns true if any or all table rows are selected.
 * @param table - Table.
 * @returns true if a row is selected.
 */
export function isAnyRowSelected<T extends RowData>(table: Table<T>): boolean {
  const { getIsAllPageRowsSelected, getIsSomePageRowsSelected } = table;
  return getIsSomePageRowsSelected() || getIsAllPageRowsSelected();
}

/**
 * Returns true if client-side filtering is enabled.
 * @param exploreMode - Explore mode.
 * @returns true if client-side filtering is enabled.
 */
export function isClientFilteringEnabled(exploreMode: ExploreMode): boolean {
  return (
    exploreMode === EXPLORE_MODE.CS_FETCH_CS_FILTERING ||
    exploreMode === EXPLORE_MODE.SS_FETCH_CS_FILTERING
  );
}

/**
 * Returns true if the collapsable row is disabled; i.e. only one column is visible.
 * @param tableInstance - Table instance.
 * @returns true if the collapsable row is disabled.
 */
export function isCollapsableRowDisabled<T extends RowData>(
  tableInstance: Table<T>
): boolean {
  return tableInstance.getVisibleLeafColumns().length === 1;
}

/**
 * Returns sort return value from the compare function. The compare function is dependent on the row value type:
 * - row values of type "array" use a compare function based off React Table "basic" compare function,
 * - all other row values use the React Table "alphanumeric" compare function.
 * See React Table https://github.com/TanStack/table/blob/beccddcab001434f3bb11843b3fda72f8b000cc2/packages/table-core/src/sortingFns.ts.
 * @param rowA - First row to sort.
 * @param rowB - Second row to sort.
 * @param columnId - Sorted column identifier.
 * @returns sort return value from the compare function (0 | 1 | -1).
 */
export function sortingFn<T>(
  rowA: Row<T>,
  rowB: Row<T>,
  columnId: string
): number {
  const columnAValue = rowA.getValue(columnId);
  const columnBValue = rowB.getValue(columnId);
  if (Array.isArray(columnAValue) && Array.isArray(columnBValue)) {
    // Values are type "array", sort with a basic compare function.
    // Should the "basic" compare function not be sufficient for the given array value types see
    // React Table's "compareAlphanumeric" function
    // https://github.com/TanStack/table/blob/beccddcab001434f3bb11843b3fda72f8b000cc2/packages/table-core/src/sortingFns.ts#L73.
    return basicSort(
      toString(columnAValue[0]).toLowerCase(),
      toString(columnBValue[0]).toLowerCase()
    );
  }
  // Sort other values with React Table's "alphanumeric" compare function.
  return sortingFns.alphanumeric(rowA, rowB, columnId);
}

/**
 * Basic compare function, returning a sort return value.
 * See React Table https://github.com/TanStack/table/blob/beccddcab001434f3bb11843b3fda72f8b000cc2/packages/table-core/src/sortingFns.ts#L53
 * @param val0 - First value.
 * @param val1 - Second value.
 * @returns sort return value (0 | 1 | -1).
 */
function basicSort<TValue>(val0: TValue, val1: TValue): number {
  return val0 === val1 ? 0 : val0 > val1 ? 1 : -1;
}

/**
 * Returns the given value as a string.
 * See React Table "toString" function
 * https://github.com/TanStack/table/blob/beccddcab001434f3bb11843b3fda72f8b000cc2/packages/table-core/src/sortingFns.ts#L57
 * @param tValue - Cell value.
 * @returns the value as a string.
 */
function toString<TValue>(tValue: TValue): string {
  if (typeof tValue === "number") {
    if (isNaN(tValue) || tValue === Infinity || tValue === -Infinity) {
      return "";
    }
    return String(tValue);
  }
  if (typeof tValue === "string") {
    return tValue;
  }
  return "";
}

/**
 * Updates React Table faceted unique values with any selected category values from the column filter state not yet
 * mapped as a faceted unique value.
 * Unmapped selected category values indicate the value has been filtered out from subsequent category selection.
 * Selected category values filtered out are assigned a zero count.
 * @param facetedUniqueValues - Map of unique values and their occurrences.
 * @param columnFilters - Column filter state.
 * @param columnId - Column identifier.
 */
function updateFacetedUniqueValues(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- see React Table FiltersColumn getFacetedUniqueValues
  facetedUniqueValues: Map<any, number>,
  columnFilters: ColumnFiltersState,
  columnId: string
): void {
  // Grab the selected category values for the specified column.
  const filterStateValues = columnFilters.find(
    ({ id }) => id === columnId
  )?.value;
  if (Array.isArray(filterStateValues)) {
    filterStateValues.forEach((term) => {
      if (facetedUniqueValues.has(term)) {
        // Selected category value exists as a faceted value.
        return;
      }
      // Add selected category value with a zero count.
      facetedUniqueValues.set(term, 0);
    });
  }
}

/**
 * Adds or updates the map object category term count keyed by category term.
 * @param countByTerms - Category term count keyed by category term.
 * @param term - Category term.
 */
function updateCountByTerms(countByTerms: CountByTerms, term: unknown): void {
  if (countByTerms.has(term)) {
    countByTerms.set(term, (countByTerms.get(term) ?? 0) + 1);
  } else {
    countByTerms.set(term, 1);
  }
}
