import { Row, RowData, Table } from "@tanstack/react-table";
import { ROW_DIRECTION } from "../../common/entities";

/**
 * Filters and returns the appropriate rows for a virtualized table based on row direction
 * and grouping state.
 * Rows are filtered if `ROW_DIRECTION` is `VERTICAL` and the table is grouped.
 * @param table - Table.
 * @param rows - Rows.
 * @param rowDirection - Row direction.
 * @returns Rows based on the provided row direction and table grouping state.
 */
export function getAllVirtualizedRows<T extends RowData>(
  table: Table<T>,
  rows: Row<T>[],
  rowDirection: ROW_DIRECTION
): Row<T>[] {
  if (rowDirection === ROW_DIRECTION.DEFAULT) return rows;
  if (table.getState().grouping.length === 0) return rows;
  return rows.filter(({ getIsGrouped }) => getIsGrouped());
}
