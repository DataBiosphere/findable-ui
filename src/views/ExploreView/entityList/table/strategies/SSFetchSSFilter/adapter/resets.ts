import { Table } from "@tanstack/react-table";

/**
 * Applies table resets, when column filters change.
 * Pagination, row preview, and row selection are reset to blank states.
 * @param table - Table.
 */
export function forColumnFiltersChange<T = unknown>(table: Table<T>): void {
  table.resetPageIndex(true);
  table.resetRowPreview();
  table.resetRowSelection(true);
}
