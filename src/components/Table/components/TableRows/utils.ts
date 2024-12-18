import { Row, RowData } from "@tanstack/react-table";

/**
 * Returns identifier for a row.
 * @param row - Row.
 * @returns row identifier.
 */
export function getRowId<T extends RowData>(row: Row<T>): string | undefined {
  const { depth, getIsGrouped, id } = row;
  if (getIsGrouped()) {
    return `grouped-row-${id}`;
  }
  if (depth > 0) {
    return `sub-row-${id}`;
  }
  return row.id;
}
