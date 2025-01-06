import { Column, RowData } from "@tanstack/react-table";
import { isStringHeaderColumn } from "../../../../common/typeGuards";

/**
 * Retrieves the button label for the column grouping dropdown.
 * @param columns - Columns.
 * @returns button label.
 */
export function getButtonLabel<T extends RowData>(
  columns: Column<T>[]
): string {
  const headers = columns
    .filter(isColumnGrouped)
    .filter(isStringHeaderColumn)
    .map(mapGroupedHeader);
  if (headers.length === 0) return "Group by";
  return `Group by: ${headers.join(", ")}`;
}

/**
 * Returns true if the column is grouped.
 * @param column - Column.
 * @returns true if the column is grouped.
 */
function isColumnGrouped<T extends RowData>(column: Column<T>): boolean {
  return column.getIsGrouped();
}

/**
 * Maps a column to its header.
 * @param column - Column.
 * @returns header.
 */
function mapGroupedHeader<T extends RowData>(
  column: Column<T> & { columnDef: { header: string } }
): string {
  return column.columnDef.header;
}
