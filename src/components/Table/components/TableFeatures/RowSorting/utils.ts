import { Column, ColumnSort, RowData, Table } from "@tanstack/react-table";
import { MouseEvent } from "react";

/**
 * Constructs a `ColumnSort` object from a column.
 * @param column - Column.
 * @returns `ColumnSort` object with sorting direction and column ID.
 */
export function buildColumnSort<T extends RowData>(
  column: Column<T>
): ColumnSort {
  return { desc: column.getFirstSortDir() === "desc", id: column.id };
}

/**
 * Toggles the sorting state for the specified column.
 * The sorting state of a table is modified based on user interaction, table grouping state, and
 * its sorting configuration (single-sort or multi-sort modes).
 * ### Sorting State:
 * - **Ungrouped Table**:
 *  - Sorting is toggled normally, respecting single-sort or multi-sort modes.
 * - **Grouped Table**:
 *   - **Multi-Sort Request**:
 *     - Sorting is toggled normally.
 *   - **Single-Sort Request**:
 *     - **Multi-Sort Mode**:
 *       - Grouped column is preserved as the first sort key, and the requested column is sorted as the second sort key.
 *     - **Single-Sort Mode**:
 *       - If the grouped column is already sorted, no action taken (the grouped column remains the primary sort key).
 *       - Otherwise, sorting is toggled normally.
 * @param mouseEvent - Mouse event.
 * @param table - Table.
 * @param column - Column.
 */
export function handleToggleSorting<T extends RowData>(
  mouseEvent: MouseEvent,
  table: Table<T>,
  column: Column<T>
): void {
  const {
    getColumn,
    getState,
    options: { enableMultiSort, isMultiSortEvent },
    setSorting,
  } = table;
  const { getCanSort, getSortIndex, toggleSorting } = column;
  const { grouping, sorting } = getState();

  // Table and column sorting is not enabled.
  if (!getCanSort()) return;

  // Sorting is enabled.
  // Table is not grouped; toggle sorting as usual.
  if (grouping.length === 0) {
    toggleSorting(undefined, isMultiSortEvent?.(mouseEvent));
    return;
  }

  // Table is grouped.
  // Multi-sort mode and multi-sort requested; toggle sorting as usual.
  if (enableMultiSort && isMultiSortEvent?.(mouseEvent)) {
    toggleSorting(undefined, true);
    return;
  }

  // Retrieve the grouped column.
  const groupedColumn = getColumn(grouping[0]);

  // Single-sort requested (either single-sort or multi-sort mode).
  // Grouped column is sorted.
  if (groupedColumn?.getIsSorted()) {
    if (enableMultiSort) {
      // Multi-sort mode.
      // Column to be sorted is not the last most recent sorted column.
      if (getSortIndex() !== sorting.length - 1) {
        // Reset sorting state, preserving grouped column as the first sort, and requested column to be sorted as the second sort.
        setSorting([buildColumnSort(groupedColumn), buildColumnSort(column)]);
        return;
      }
    } else {
      // Space case; in single-sort mode we do not override a grouped sort.
      return;
    }
  }

  toggleSorting();
}
