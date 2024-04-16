import { TableCell, TableRow as MTableRow } from "@mui/material";
import { flexRender, Table } from "@tanstack/react-table";
import React, { Fragment } from "react";
import { TableView } from "../../table";

export interface TableRowsProps<T> {
  tableInstance: Table<T>;
  tableView?: TableView;
}

export const TableRows = <T extends object>({
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
          <MTableRow key={row.id}>
            {row.getVisibleCells().map((cell) => {
              return (
                <TableCell key={cell.id} size={tableCellSize}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              );
            })}
          </MTableRow>
        );
      })}
    </Fragment>
  );
};
