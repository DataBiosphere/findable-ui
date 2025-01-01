import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import {
  TableHead as MTableHead,
  TableRow as MTableRow,
  TableCell,
  TableSortLabel,
} from "@mui/material";
import { flexRender, RowData } from "@tanstack/react-table";
import React, { Fragment } from "react";
import { ROW_DIRECTION } from "../../common/entities";
import {
  getTableCellAlign,
  getTableCellPadding,
} from "../TableCell/common/utils";
import { handleToggleSorting } from "../TableFeatures/RowSorting/utils";
import { TableHeadProps } from "./types";
import { isSortDisabled, shouldSortColumn } from "./utils";

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
              {headerGroup.headers.map(({ column, getContext, id }) => {
                const { columnDef, getIsGrouped, getIsSorted } = column;
                return getIsGrouped() ? null : (
                  <TableCell
                    key={id}
                    align={getTableCellAlign(column)}
                    padding={getTableCellPadding(id)}
                  >
                    {shouldSortColumn(tableInstance, column) ? (
                      <TableSortLabel
                        IconComponent={SouthRoundedIcon}
                        active={Boolean(getIsSorted())}
                        direction={getIsSorted() || undefined}
                        disabled={isSortDisabled(tableInstance)}
                        onClick={(mouseEvent) =>
                          handleToggleSorting(mouseEvent, tableInstance, column)
                        }
                      >
                        {flexRender(columnDef.header, getContext())}
                      </TableSortLabel>
                    ) : (
                      flexRender(columnDef.header, getContext())
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
