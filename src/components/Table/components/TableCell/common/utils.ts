import { TableCellProps } from "@mui/material";
import { Column, CoreCell, CoreHeader, RowData } from "@tanstack/react-table";
import {
  TABLE_CELL_PADDING_X,
  TABLE_CELL_PROPS,
} from "../../../../../styles/common/mui/tableCell";
import { isGridTrackFitContent } from "../../../../TableCreator/options/columnTrackSizing/typeGuards";
import { COLUMN_IDENTIFIER } from "../../../common/columnIdentifier";

/**
 * Returns table cell alignment based on the cell.
 * @param column - Column.
 * @returns table cell alignment.
 */
export function getTableCellAlign<T extends RowData, TValue>(
  column: Column<T, TValue>,
): TableCellProps["align"] {
  return column.columnDef.meta?.align;
}

/**
 * Returns the table cell padding for the column.
 * @param column - Column.
 * @returns table cell padding.
 */
export function getColumnCellPadding<T extends RowData, TValue>(
  column: Column<T, TValue>,
): TableCellProps["padding"] {
  return column.columnDef.meta?.padding ?? getTableCellPadding(column.id);
}

/**
 * Returns table cell padding based on the cell ID.
 * @param id - Cell ID.
 * @returns table cell padding.
 */
export function getTableCellPadding<T extends RowData, TValue>(
  id: CoreHeader<T, TValue>["id"] | CoreCell<T, TValue>["id"],
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

/**
 * Returns the maximum content width of a fit-content column.
 * @param column - Column.
 * @returns maximum content width.
 */
export function getTableCellContentMaxWidth<T extends RowData, TValue>(
  column: Column<T, TValue>,
): string | undefined {
  const width = column.columnDef.meta?.width;
  if (!isGridTrackFitContent(width)) return;
  const limit = width.slice("fit-content(".length, -1);
  return `calc(${limit} - ${getHorizontalPadding(column)}px)`;
}

/**
 * Returns the horizontal padding (px) of the column's cells.
 * @param column - Column.
 * @returns horizontal padding.
 */
function getHorizontalPadding<T extends RowData, TValue>(
  column: Column<T, TValue>,
): number {
  switch (getColumnCellPadding(column)) {
    case TABLE_CELL_PROPS.PADDING.NONE:
      return 0;
    case TABLE_CELL_PROPS.PADDING.CHECKBOX:
      return TABLE_CELL_PADDING_X;
    default:
      return 2 * TABLE_CELL_PADDING_X;
  }
}
