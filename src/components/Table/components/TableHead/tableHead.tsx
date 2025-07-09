import { SouthRounded } from "@mui/icons-material";
import {
  TableHead as MTableHead,
  TableRow as MTableRow,
  TableCell,
  TableSortLabel,
} from "@mui/material";
import { flexRender, RowData } from "@tanstack/react-table";
import React, { Fragment } from "react";
import { Tooltip } from "../../../DataDictionary/components/Tooltip/tooltip";
import {
  getTableCellAlign,
  getTableCellPadding,
} from "../TableCell/common/utils";
import { handleToggleSorting } from "../TableFeatures/RowSorting/utils";
import { TableHeadProps } from "./types";
import { isSortDisabled, shouldSortColumn } from "./utils";

export const TableHead = <T extends RowData>({
  tableInstance,
}: TableHeadProps<T>): JSX.Element => {
  return (
    <Fragment>
      {tableInstance.getHeaderGroups().map((headerGroup) => (
        <MTableHead key={headerGroup.id}>
          <MTableRow>
            {headerGroup.headers.map(({ column, getContext, id }) => {
              const { columnDef, getIsGrouped, getIsSorted } = column;
              const annotation = columnDef.meta?.annotation;
              return getIsGrouped() ? null : (
                <TableCell
                  key={id}
                  align={getTableCellAlign(column)}
                  padding={getTableCellPadding(id)}
                >
                  <Tooltip
                    description={annotation?.description}
                    title={annotation?.label}
                  >
                    {shouldSortColumn(tableInstance, column) ? (
                      <TableSortLabel
                        IconComponent={SouthRounded}
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
                  </Tooltip>
                </TableCell>
              );
            })}
          </MTableRow>
        </MTableHead>
      ))}
    </Fragment>
  );
};
