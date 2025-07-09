import { Row, RowData, Table } from "@tanstack/react-table";
import { ROW_DIRECTION } from "../../common/entities";

/**
 * Filters and returns the appropriate rows for a virtualized table based on row direction
 * and grouping state.
 * @param table - Table.
 * @param rowDirection - Row direction.
 * @returns Rows based on the provided row direction and table grouping state.
 */
export function getRowsForVirtualization<T extends RowData>(
  table: Table<T>,
  rowDirection: ROW_DIRECTION
): Row<T>[] {
  const { getRowModel, getState } = table;
  const { rows } = getRowModel();
  const { grouping } = getState();

  // If the row direction is DEFAULT, return all rows.
  if (rowDirection === ROW_DIRECTION.DEFAULT) return rows;

  // If the table is not grouped, return all rows.
  if (grouping.length === 0) return rows;

  // If the row direction is VERTICAL, return only grouped rows.
  return rows.filter(({ getIsGrouped }) => getIsGrouped());
}
