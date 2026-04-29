import type { ColumnFilter, RowData, Table } from "@tanstack/react-table";

/**
 * Extracts the column ID from a validated ColumnFilter entry.
 * @param entry - Validated entry.
 * @returns column ID.
 */
export function extractColumnId(entry: unknown): string {
  return (entry as ColumnFilter).id;
}

/**
 * Returns the set of valid column IDs from a TanStack table instance.
 * @param table - TanStack table instance.
 * @returns set of valid column IDs.
 */
export function getValidColumnIds<T extends RowData>(
  table: Table<T>,
): Set<string> {
  return new Set(table.getAllColumns().map((column) => column.id));
}
