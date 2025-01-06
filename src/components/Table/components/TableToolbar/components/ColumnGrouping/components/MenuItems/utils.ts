import { Column, RowData } from "@tanstack/react-table";
import { COLUMN_IDENTIFIER } from "../../../../../../common/columnIdentifier";
import { isStringHeaderColumn } from "../../../../../../common/typeGuards";

/**
 * Returns columns that are enabled to be grouped.
 * @param columns - Columns.
 * @returns columns that are enabled to be grouped.
 */
export function getCanGroupColumns<T extends RowData>(
  columns: Column<T>[]
): (Column<T> & { columnDef: { header: string } })[] {
  return columns
    .filter(isStringHeaderColumn)
    .filter(({ getCanGroup }) => getCanGroup());
}

/**
 * Returns the number of visible columns, excluding system columns "rowPosition" and "rowSelection".
 * @param columns - Columns.
 * @returns number of visible columns.
 */
export function getVisibleColumnCount<T extends RowData>(
  columns: Column<T>[]
): number {
  return columns
    .filter((column) => !isSystemColumn(column))
    .filter(({ getIsVisible }) => getIsVisible()).length;
}

/**
 * Returns true if the column is a system column "rowPosition" or "rowSelection".
 * @param column - Column.
 * @returns true if the column is a system column.
 */
function isSystemColumn<T extends RowData>(column: Column<T>): boolean {
  return (
    column.id === COLUMN_IDENTIFIER.ROW_POSITION ||
    column.id === COLUMN_IDENTIFIER.ROW_SELECTION
  );
}

/**
 * Returns whether the column grouping toggle is disabled.
 * - If the column is not enabled to be grouped, the toggle is disabled.
 * - If the column is not visible, the toggle is disabled.
 * - If the count of visible columns is 1, the toggle is disabled.
 * @param column - Column.
 * @param visibleCount - Count of visible, un-grouped columns.
 * @returns true if the column visibility toggle is disabled.
 */
export function isToggleGroupingDisabled<T extends RowData>(
  column: Column<T>,
  visibleCount: number
): boolean {
  if (!column.getCanGroup() || !column.getIsVisible()) return true;
  return visibleCount === 1; // We should not be able to group the last visible column; at least one un-grouped column should be visible.
}
