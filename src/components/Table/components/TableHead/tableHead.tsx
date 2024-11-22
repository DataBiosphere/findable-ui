import {
  TableHead as MTableHead,
  TableRow as MTableRow,
  TableCell,
  TableSortLabel,
} from "@mui/material";
import { flexRender, RowData, Table } from "@tanstack/react-table";
import React, { Fragment } from "react";
import { ROW_DIRECTION } from "../../common/entities";
import { getTableSortLabelProps } from "../../common/utils";
import {
  getTableCellAlign,
  getTableCellPadding,
} from "../TableCell/common/utils";

export interface TableHeadProps<T extends RowData> {
  rowDirection: ROW_DIRECTION;
  tableInstance: Table<T>;
}

export const TableHead = <T extends RowData>({
  rowDirection,
  tableInstance,
}: TableHeadProps<T>): JSX.Element => {
  return (
    <Fragment>
      {rowDirection === ROW_DIRECTION.DEFAULT &&
        tableInstance.getHeaderGroups().map((headerGroup) => (
          <MTableHead key={headerGroup.id}>
            <MTableRow>
              {headerGroup.headers.map((header) => {
                const {
                  column: {
                    columnDef: {
                      meta: { enableSortingInteraction = true } = {},
                    },
                  },
                } = header;
                return header.column.getIsGrouped() ? null : (
                  <TableCell
                    key={header.id}
                    align={getTableCellAlign(header.column)}
                    padding={getTableCellPadding(header.id)}
                  >
                    {header.column.getCanSort() && enableSortingInteraction ? (
                      <TableSortLabel
                        {...getTableSortLabelProps(header.column)}
                      >
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
                  </TableCell>
                );
              })}
            </MTableRow>
          </MTableHead>
        ))}
    </Fragment>
  );
};
