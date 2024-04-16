import { TableCell, TableHead as MTableHead, TableRow } from "@mui/material";
import { flexRender, Table } from "@tanstack/react-table";
import React, { Fragment } from "react";
import { ROW_DIRECTION } from "../../../../../Table/common/entities";

export interface TableBodyProps<T> {
  rowDirection: ROW_DIRECTION;
  tableInstance: Table<T>;
}

export const TableHead = <T extends object>({
  rowDirection,
  tableInstance,
}: TableBodyProps<T>): JSX.Element => {
  return (
    <Fragment>
      {rowDirection === ROW_DIRECTION.DEFAULT &&
        tableInstance.getHeaderGroups().map((headerGroup) => (
          <MTableHead key={headerGroup.id}>
            <TableRow>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          </MTableHead>
        ))}
    </Fragment>
  );
};
