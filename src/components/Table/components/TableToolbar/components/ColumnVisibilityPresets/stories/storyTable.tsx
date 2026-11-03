import {
  Table as MTable,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { flexRender } from "@tanstack/react-table";
import type { JSX } from "react";
import { ColumnVisibility } from "../../ColumnVisibility/columnVisibility";
import { ColumnVisibilityPresets } from "../columnVisibilityPresets";
import { useStoryTable } from "./hook";
import type { StoryTableProps } from "./types";

/**
 * Story table: the preset toggle and the column picker above a table of the visible columns.
 * @param props - Component props.
 * @param props.grouping - Initial grouping.
 * @param props.initialColumnVisibility - Initial column visibility, if not the first preset's.
 * @returns The story table.
 */
export const StoryTable = ({
  grouping,
  initialColumnVisibility,
}: StoryTableProps): JSX.Element => {
  const table = useStoryTable(initialColumnVisibility, grouping);
  return (
    <Stack gap={4}>
      <Stack alignItems="center" direction="row" gap={2}>
        <ColumnVisibilityPresets tableInstance={table} />
        <ColumnVisibility tableInstance={table} />
      </Stack>
      <MTable>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MTable>
    </Stack>
  );
};
