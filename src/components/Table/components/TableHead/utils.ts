import { Column, RowData, Table } from "@tanstack/react-table";

/**
 * Determines if the table sort label is disabled.
 * The sort label is considered disabled in the following scenarios:
 *  - Sorting interactions are not enabled in the table.
 *  - The specified column is not sortable.
 *  - The table is in single-sort mode, is grouped, and the grouped column is already sorted.
 * @param table - Table.
 * @param column - Column.
 * @returns `true` if the table sort label is disabled.
 */
export function isTableSortLabelDisabled<T extends RowData>(
  table: Table<T>,
  column: Column<T>
): boolean {
  const {
    getColumn,
    getState,
    options: { enableMultiSort, enableSortingInteraction },
  } = table;
  const { getCanSort } = column;
  const { grouping } = getState();
  if (enableSortingInteraction) {
    // Sorting interaction is enabled.
    if (getCanSort()) {
      // Column is sortable.
      if (grouping.length === 0) {
        // Table is not grouped.
        return false;
      }
      // Table is grouped.
      // Multi-sort mode is enabled.
      if (enableMultiSort) return false;
      // Single-sort mode; grouped column is sorted.
      const groupedColumn = getColumn(grouping[0]);
      return !!groupedColumn?.getIsSorted();
    }
    // Column is not sortable.
    return true;
  }
  // Sorting interaction is not enabled.
  return true;
}
