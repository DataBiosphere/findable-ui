import { CellContext, RowData } from "@tanstack/react-table";

/**
 * Returns the index of the row in the table, for the current page.
 * @param cellContext - Cell context.
 * @returns row index.
 */
export function getRowIndex<TData extends RowData, TValue>(
  cellContext: CellContext<TData, TValue>
): number {
  const {
    row,
    table: { getRowModel },
  } = cellContext;
  const { rows } = getRowModel();
  return rows.findIndex(({ id }) => id === row.id);
}

/**
 * Returns the position of the row in the table.
 * @param cellContext - Cell context.
 * @returns row position.
 */
export const getRowPosition = <TData extends RowData, TValue>(
  cellContext: CellContext<TData, TValue>
): number => {
  const {
    table: { getState },
  } = cellContext;
  const {
    pagination: { pageIndex, pageSize },
  } = getState();
  const rowIndex = getRowIndex(cellContext);
  return pageIndex * pageSize + (rowIndex + 1);
};
