import { Row, RowData, Table } from "@tanstack/react-table";

/**
 * Returns the validation message for a row.
 * @param row - Row.
 * @param table - Table.
 * @returns The validation message for the row.
 */
export function getSelectionValidation<T extends RowData>(
  row: Row<T>,
  table: Table<T>,
): string | undefined {
  if (!table.options.enableRowSelectionValidation) return;
  return table.options.getRowSelectionValidation?.(row);
}
