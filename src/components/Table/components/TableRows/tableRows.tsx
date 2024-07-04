import { TableCell as MTableCell } from "@mui/material";
import { flexRender, Row, RowData, Table } from "@tanstack/react-table";
import { Virtualizer } from "@tanstack/react-virtual";
import React, { Fragment } from "react";
import { getTableCellPadding } from "../TableCell/common/utils";
import { TableRow } from "../TableRow/tableRow.styles";

export interface TableRowsProps<T extends RowData> {
  tableInstance: Table<T>;
  virtualizer: Virtualizer<Window, Element>;
}

export const TableRows = <T extends RowData>({
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
        const { getIsPreview } = row;
        return (
          <TableRow
            key={row.id}
            data-index={virtualRow.index}
            isPreview={getIsPreview()}
            ref={virtualizer.measureElement}
          >
            {row.getVisibleCells().map((cell) => (
              <MTableCell
                key={cell.id}
                padding={getTableCellPadding(cell.column.id)}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </MTableCell>
            ))}
          </TableRow>
        );
      })}
    </Fragment>
  );
};
