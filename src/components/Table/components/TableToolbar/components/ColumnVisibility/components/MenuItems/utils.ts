import { Column, RowData } from "@tanstack/react-table";

/**
 * Returns columns that are enabled to be hidden.
 * @param columns - Columns.
 * @returns columns that are enabled to be hidden.
 */
export function getCanHideColumns<T extends RowData>(
  columns: Column<T>[]
): Column<T>[] {
  return columns.filter(({ getCanHide }) => getCanHide());
}

/**
 * Returns the number of visible columns, excluding grouped columns.
 * @param columns - Columns.
 * @returns number of visible, un-grouped columns.
 */
export function getVisibleColumnCount<T extends RowData>(
  columns: Column<T>[]
): number {
  return columns.filter(
    ({ getIsGrouped, getIsVisible }) => getIsVisible() && !getIsGrouped()
  ).length;
}

/**
 * Returns whether the column visibility toggle is disabled.
 * - If the column is grouped, the toggle is disabled.
 * - If the column is visible and the count of visible, un-grouped columns is 1, the toggle is disabled.
 * @param column - Column.
 * @param visibleCount - Count of visible, un-grouped columns.
 * @returns true if the column visibility toggle is disabled.
 */
export function isToggleVisibilityDisabled<T extends RowData>(
  column: Column<T>,
  visibleCount: number
): boolean {
  if (column.getIsGrouped()) return true;
  return column.getIsVisible() && visibleCount === 1;
}
