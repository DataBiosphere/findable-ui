import {
  TableCell as MTableCell,
  TableHead as MTableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { flexRender, Table } from "@tanstack/react-table";
import React, { Fragment } from "react";
import { ROW_DIRECTION } from "../../common/entities";
import { getTableSortLabelProps } from "../../common/utils";
import { getTableCellPadding } from "../TableCell/common/utils";

export interface TableHeadProps<T> {
  rowDirection: ROW_DIRECTION;
  tableInstance: Table<T>;
}

export const TableHead = <T extends object>({
  rowDirection,
  tableInstance,
}: TableHeadProps<T>): JSX.Element => {
  return (
    <Fragment>
      {rowDirection === ROW_DIRECTION.DEFAULT &&
        tableInstance.getHeaderGroups().map((headerGroup) => (
          <MTableHead key={headerGroup.id}>
            <TableRow>
              {headerGroup.headers.map((header) => (
                <MTableCell
                  key={header.id}
                  padding={getTableCellPadding(header.id)}
                >
                  {header.column.getCanSort() ? (
                    <TableSortLabel {...getTableSortLabelProps(header.column)}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableSortLabel>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  )}
                </MTableCell>
              ))}
            </TableRow>
          </MTableHead>
        ))}
    </Fragment>
  );
};
