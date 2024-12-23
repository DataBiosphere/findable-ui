import { Column, ColumnSort, RowData, Table } from "@tanstack/react-table";
import { buildColumnSort } from "../RowSorting/utils";

/**
 * Clears the grouping state of the table and optionally resets the sorting state.
 * ### Grouping State:
 * - Grouping state is reset to `[]`.
 * ### Sorting State:
 * - Sorting state is reset to initial state (if sorting is enabled).
 * @param table - Table.
 */
export function handleClearGroupingState<T extends RowData>(
  table: Table<T>
): void {
  const {
    options: { enableSorting },
    resetGrouping,
    resetSorting,
  } = table;
  resetGrouping(true); // Clears grouping state to `[]`.
  if (enableSorting) resetSorting(); // Resets sorting state to initial state.
}

/**
 * Toggles the grouping state for the given column.
 * ### Grouping State
 * - **Column grouping is not enabled**:
 *   - No grouping action (exit).
 * - **Column grouping is enabled**:
 *   - Toggles the grouping state of the specified column.
 * ### Sorting State
 * - **Table sorting is not enabled**:
 *   - No sorting action (exit).
 * - **Column sorting is not enabled**:
 *   - Resets sorting state to initial state.
 * - **Column sorting is enabled**:
 *   - **Single-Sort Mode**:
 *     - The grouped column is the only sortable column in the sorting state.
 *   - **Multi-Sort Mode**:
 *     - The grouped column is preserved as the first sort key, and other initial sorting state rules are appended.
 * @param table - Table.
 * @param column - Column.
 */
export function handleToggleGrouping<T extends RowData>(
  table: Table<T>,
  column: Column<T>
): void {
  const {
    options: {
      enableMultiSort,
      enableSorting,
      initialState: { sorting = [] } = {},
    },
    resetSorting,
    setSorting,
  } = table;
  const { getCanGroup, getCanSort, id } = column;

  // Column cannot be grouped.
  if (!getCanGroup()) return;

  // Toggle column grouping.
  column.toggleGrouping();

  // Table sorting is not enabled.
  if (!enableSorting) return;

  // Column sorting is enabled.
  if (getCanSort()) {
    // Create new sorting state; grouped column is preserved as the first sort.
    const nextSorting: ColumnSort[] = [buildColumnSort(column)];

    // Multi-sort mode.
    if (enableMultiSort) {
      // Filter out grouped column from initial sorting state.
      const filteredSorting = sorting.filter((sort) => sort.id !== id);
      // Append filtered sorting state to new sorting state.
      nextSorting.push(...filteredSorting);
    }

    setSorting(nextSorting);
    return;
  }

  // Column sorting is not enabled; reset sorting state to initial state.
  resetSorting();
}
