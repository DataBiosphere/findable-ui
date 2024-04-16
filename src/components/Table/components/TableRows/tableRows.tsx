import { TableCell, TableRow as MTableRow } from "@mui/material";
import { flexRender, Row, Table } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";
import React, { Fragment } from "react";

export interface TableRowsProps<T> {
  tableInstance: Table<T>;
  virtualizer: Virtualizer<Window, Element>;
}

export const TableRows = <T extends object>({
  tableInstance,
  virtualizer,
}: TableRowsProps<T>): JSX.Element => {
  const { getRowModel } = tableInstance;
  const { rows } = getRowModel();
  const virtualItems = virtualizer.getVirtualItems();
  return (
    <Fragment>
      {virtualItems.map((virtualRow) => {
        const row = rows[virtualRow.index] as Row<T>;
        return (
          <MTableRow
            key={row.id}
            data-index={virtualRow.index}
            ref={virtualizer.measureElement}
          >
            {row.getVisibleCells().map((cell) => {
              return (
                <TableCell key={cell.id}>
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
