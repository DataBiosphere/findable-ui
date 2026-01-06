import { RowData, RowModel, Table } from "@tanstack/react-table";

/**
 * Returns row model, with getter for row position.
 * @param table - Table.
 * @param rowModel - Row model.
 * @returns row model.
 */
export function getRowModel<T extends RowData>(
  table: Table<T>,
  rowModel: RowModel<T>,
): RowModel<T> {
  let i = 0;
  rowModel.flatRows.forEach(({ getIsGrouped, id }) => {
    const isGroupedRow = getIsGrouped();
    const index = isGroupedRow ? -1 : i; // Capture the current value of i for this iteration.
    rowModel.rowsById[id].getRowPosition = (): number =>
      calculateRowPosition(table, index);
    if (isGroupedRow) return; // Iterate only for non-grouped rows.
    i++;
  });
  return rowModel;
}

/**
 * Returns the position of the row in the table.
 * @param rowId - Row ID.
 * @param table - Table.
 * @returns row position.
 */
export function getRowPosition<T extends RowData>(
  rowId: string,
  table: Table<T>,
): number {
  const { getRowModel } = table;
  const { rowsById } = getRowModel();
  return rowsById[rowId].getRowPosition();
}

/**
 * Calculates the position of the row in the table.
 * @param table - Table.
 * @param index - Row index.
 * @returns row position.
 */
function calculateRowPosition<T extends RowData>(
  table: Table<T>,
  index: number,
): number {
  if (index < 0) return index; // Grouped rows have a position of -1.
  const { getState } = table;
  const {
    pagination: { pageIndex, pageSize },
  } = getState();
  return pageIndex * pageSize + (index + 1);
}
