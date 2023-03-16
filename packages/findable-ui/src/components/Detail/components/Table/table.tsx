import {
  TableBody,
  TableCell,
  TableCellProps as MTableCellProps,
  TableContainer,
  TableContainerProps as MTableContainerProps,
  TableHead,
  TableProps as MTableProps,
  TableRow,
} from "@mui/material";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { Table as GridTable } from "../../../Table/table.styles";

export interface TableView {
  table?: Partial<MTableProps>;
  tableCell?: Partial<MTableCellProps>;
  tableContainer?: Partial<MTableContainerProps>;
}

export interface TableProps<T extends object> {
  columns: ColumnDef<T>[];
  gridTemplateColumns: string;
  items: T[];
  tableView?: TableView;
}

export const Table = <T extends object>({
  columns,
  gridTemplateColumns,
  items,
  tableView,
}: TableProps<T>): JSX.Element => {
  const { table, tableCell, tableContainer } = tableView || {};
  const { stickyHeader = false } = table || {};
  const { size: tableCellSize = "medium" } = tableCell || {};
  const { sx: tableContainerSx } = tableContainer || {};
  const tableInstance = useReactTable({
    columns,
    data: items,
    getCoreRowModel: getCoreRowModel(),
  });
  const { getHeaderGroups, getRowModel } = tableInstance;
  return (
    <TableContainer sx={tableContainerSx}>
      <GridTable
        gridTemplateColumns={gridTemplateColumns}
        stickyHeader={stickyHeader}
      >
        {getHeaderGroups().map((headerGroup) => (
          <TableHead key={headerGroup.id}>
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
          </TableHead>
        ))}
        <TableBody>
          {getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell key={cell.id} size={tableCellSize}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </GridTable>
    </TableContainer>
  );
};
