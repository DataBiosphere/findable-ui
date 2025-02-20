import { TableCell } from "@mui/material";
import { flexRender, Row, RowData } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";
import React, { Fragment } from "react";
import {
  getTableCellAlign,
  getTableCellPadding,
} from "../TableCell/common/utils";
import { TableRow } from "../TableRow/tableRow.styles";

export interface TableRowsProps<T extends RowData> {
  rows: Row<T>[];
  virtualizer: Virtualizer<Window, Element>;
}

export const TableRows = <T extends RowData>({
  rows,
  virtualizer,
}: TableRowsProps<T>): JSX.Element => {
  const virtualItems = virtualizer.getVirtualItems();
  return (
    <Fragment>
      {virtualItems.map((virtualRow) => {
        const row = rows[virtualRow.index] as Row<T>;
        const { getIsGrouped, getIsPreview } = row;
        return (
          <TableRow
            key={row.id}
            data-index={virtualRow.index}
            isGrouped={getIsGrouped()}
            isPreview={getIsPreview()}
            ref={virtualizer.measureElement}
          >
            {row.getVisibleCells().map((cell) => {
              if (cell.getIsAggregated()) return null; // Display of aggregated cells is currently not supported.
              if (cell.getIsPlaceholder()) return null; // Display of placeholder cells is currently not supported.
              return (
                <TableCell
                  key={cell.id}
                  align={getTableCellAlign(cell.column)}
                  padding={getTableCellPadding(cell.column.id)}
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
