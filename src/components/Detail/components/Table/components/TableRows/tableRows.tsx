import { TableCell } from "@mui/material";
import { flexRender, RowData, Table } from "@tanstack/react-table";
import React, { Fragment } from "react";
import {
  getTableCellAlign,
  getTableCellPadding,
} from "../../../../../Table/components/TableCell/common/utils";
import { TableRow } from "../../../../../Table/components/TableRow/tableRow.styles";
import { TableView } from "../../table";

export interface TableRowsProps<T extends RowData> {
  tableInstance: Table<T>;
  tableView?: TableView;
}

export const TableRows = <T extends RowData>({
  tableInstance,
  tableView,
}: TableRowsProps<T>): JSX.Element => {
  const { getRowModel } = tableInstance;
  const { rows } = getRowModel();
  const { tableCell } = tableView || {};
  const { size: tableCellSize = "medium" } = tableCell || {};
  return (
    <Fragment>
      {rows.map((row) => {
        return (
          <TableRow
            key={row.id}
            isGrouped={row.getIsGrouped()}
            isPreview={row.getIsPreview()}
          >
            {row.getVisibleCells().map((cell) => {
              if (cell.getIsAggregated()) return null; // Display of aggregated cells is currently not supported.
              if (cell.getIsPlaceholder()) return null; // Display of placeholder cells is currently not supported.
              return (
                <TableCell
                  key={cell.id}
                  align={getTableCellAlign(cell.column)}
                  padding={getTableCellPadding(cell.column.id)}
                  size={tableCellSize}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </Fragment>
  );
};
