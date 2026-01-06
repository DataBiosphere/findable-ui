import { Column, RowData, Table } from "@tanstack/react-table";

/**
 * Determines if the column sorting interaction should be disabled.
 * The sort label is disabled under the following conditions:
 * - The table is in single-sort mode, and is grouped, and the grouped column is already sorted.
 * When multi-sort mode is enabled or the table is not grouped, the sort label remains enabled.
 * @param table - Table.
 * @returns `true` if the sort label should be disabled; otherwise, `false`.
 */
export function isSortDisabled<T extends RowData>(table: Table<T>): boolean {
  const {
    getColumn,
    getState,
    options: { enableMultiSort },
  } = table;
  const { grouping } = getState();
  // Multi-sort is enabled - sorting is always enabled.
  if (enableMultiSort) return false;
  // Table is not grouped - sorting is always enabled.
  if (grouping.length === 0) return false;
  // In single-sort mode, check if the grouped column is already sorted.
  const groupedColumn = getColumn(grouping[0]); // Grouping state currently only supports single-column grouping.
  return Boolean(groupedColumn?.getIsSorted());
}

/**
 * Checks whether a column in a table can be sorted.
 * A column is sortable if both table sorting interactions are enabled
 * and the column itself is marked as sortable.
 * @param table - Table.
 * @param column - Column.
 * @returns {boolean} `true` if the column can be sorted; otherwise, `false`.
 */
export function shouldSortColumn<T extends RowData>(
  table: Table<T>,
  column: Column<T>,
): boolean {
  const { enableSortingInteraction } = table.options;
  const canSort = column.getCanSort();
  return Boolean(enableSortingInteraction && canSort);
}
