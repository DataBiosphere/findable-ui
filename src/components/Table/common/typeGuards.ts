import { Column, RowData } from "@tanstack/react-table";

/**
 * Type guard to check if a column's header is a string.
 * @param column - Column.
 * @returns true if the column has a string header.
 */
export function isStringHeaderColumn<T extends RowData>(
  column: Column<T>,
): column is Column<T> & { columnDef: { header: string } } {
  return typeof column.columnDef.header === "string";
}
