import { Column, RowData, Table } from "@tanstack/react-table";

/**
 * Toggles the visibility state for the given column.
 * ### Column Visibility State
 * - **Column visibility is not enabled**:
 *   - No column visibility action (exit).
 * - **Column visibility is enabled**:
 *   - Toggles the visibility state of the specified column.
 * ### Grouping and Sorting State
 * - **Column is not visible**:
 *   - No grouping or sorting action (exit).
 * - **Column is visible**:
 *   - **Column is grouped**:
 *     - Resets grouping state to `[]`.
 *     - Clears column from sorting state.
 *   - **Column is not grouped**:
 *     - No grouping or sorting action.
 * @param table - Table.
 * @param column - Column.
 */
export function handleToggleVisibility<T extends RowData>(
  table: Table<T>,
  column: Column<T>
): void {
  const {
    options: { enableGrouping },
    resetGrouping,
  } = table;
  const {
    clearSorting,
    getCanHide,
    getIsGrouped,
    getIsVisible,
    toggleVisibility,
  } = column;
  if (!getCanHide()) return;

  // Toggle column visibility.
  toggleVisibility();

  // Column is not visible i.e. requesting column visibility and therefore no further action is needed.
  if (!getIsVisible()) return;

  // Column is visible.
  // Table grouping is enabled, and column is grouped.
  if (enableGrouping && getIsGrouped()) {
    resetGrouping(true); // Clears grouping state to `[]`.
    // Currently, only a grouped column's sorting state is cleared.
    clearSorting(); // Clears column sorting.
  }
}
