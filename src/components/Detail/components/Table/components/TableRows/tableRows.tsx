import { TableCell } from "@mui/material";
import { flexRender, Row, RowData, Table } from "@tanstack/react-table";
import React, { Fragment } from "react";
import {
  getTableCellAlign,
  getTableCellPadding,
} from "../../../../../Table/components/TableCell/common/utils";
import { handleToggleExpanded } from "../../../../../Table/components/TableFeatures/RowExpanding/utils";
import { StyledTableRow } from "../../../../../Table/components/TableRow/tableRow.styles";
import { TableView } from "../../table";

export interface TableRowsProps<T extends RowData> {
  /**
   * Optional override for the rows rendered by <TableRows>.
   * - Omit to show the table’s full leaf-level row model.
   * - Pass `group.subRows` (or any other subset) to display a “mini-table” for a single group e.g. the rows that belong to one Data-Dictionary entity.
   */
  rows?: Row<T>[];
  tableInstance: Table<T>;
  tableView?: TableView;
}

export const TableRows = <T extends RowData>({
  rows: leafOrSubRows,
  tableInstance,
  tableView,
}: TableRowsProps<T>): JSX.Element => {
  const { getRowModel } = tableInstance;
  const { rows } = getRowModel();
  const { tableCell } = tableView || {};
  const { size: tableCellSize = "medium" } = tableCell || {};
  return (
    <Fragment>
      {(leafOrSubRows || rows).map((row) => {
        return (
          <StyledTableRow
            key={row.id}
            canExpand={row.getCanExpand()}
            isExpanded={row.getIsExpanded()}
            isGrouped={row.getIsGrouped()}
            isPreview={row.getIsPreview()}
            onClick={() => handleToggleExpanded(row)}
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
          </StyledTableRow>
        );
      })}
    </Fragment>
  );
};
