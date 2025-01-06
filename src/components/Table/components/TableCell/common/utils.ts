import { TableCellProps } from "@mui/material";
import { Column, CoreCell, CoreHeader, RowData } from "@tanstack/react-table";
import { TABLE_CELL_PROPS } from "../../../../../styles/common/mui/tableCell";
import { COLUMN_IDENTIFIER } from "../../../common/columnIdentifier";

/**
 * Returns table cell alignment based on the cell.
 * @param column - Column.
 * @returns table cell alignment.
 */
export function getTableCellAlign<T extends RowData, TValue>(
  column: Column<T, TValue>
): TableCellProps["align"] {
  return column.columnDef.meta?.align;
}

/**
 * Returns table cell padding based on the cell ID.
 * @param id - Cell ID.
 * @returns table cell padding.
 */
export function getTableCellPadding<T extends RowData, TValue>(
  id: CoreHeader<T, TValue>["id"] | CoreCell<T, TValue>["id"]
): TableCellProps["padding"] {
  switch (id) {
    case COLUMN_IDENTIFIER.ROW_POSITION:
      return TABLE_CELL_PROPS.PADDING.NORMAL;
    case COLUMN_IDENTIFIER.ROW_SELECTION:
      return TABLE_CELL_PROPS.PADDING.CHECKBOX;
    default:
      return TABLE_CELL_PROPS.PADDING.NORMAL;
  }
}
