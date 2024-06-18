import {
  TableCellProps as MTableCellProps,
  TableContainer,
  TableContainerProps as MTableContainerProps,
  TableProps as MTableProps,
} from "@mui/material";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TableOptions } from "@tanstack/table-core";
import React from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";
import { TABLET } from "../../../../theme/common/breakpoints";
import { ROW_DIRECTION } from "../../../Table/common/entities";
import { TableHead } from "../../../Table/components/TableHead/tableHead";
import { GridTable } from "../../../Table/table.styles";
import { generateColumnDefinitions } from "./common/utils";
import { TableBody } from "./components/TableBody/tableBody";

export interface TableView {
  table?: Partial<MTableProps>;
  tableCell?: Partial<MTableCellProps>;
  tableContainer?: Partial<MTableContainerProps>;
}

export interface TableProps<T extends object> {
  className?: string;
  collapsable?: boolean;
  columns: ColumnDef<T>[];
  gridTemplateColumns: string;
  items: T[];
  tableOptions?: Partial<TableOptions<T>>;
  tableView?: TableView;
}

export const Table = <T extends object>({
  className,
  collapsable = true,
  columns,
  gridTemplateColumns,
  items,
  tableOptions,
  tableView,
}: TableProps<T>): JSX.Element => {
  const tabletDown = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, TABLET);
  const rowDirection =
    collapsable && tabletDown ? ROW_DIRECTION.VERTICAL : ROW_DIRECTION.DEFAULT;
  const { table, tableContainer } = tableView || {};
  const { stickyHeader = false } = table || {};
  const { sx: tableContainerSx } = tableContainer || {};
  const tableInstance = useReactTable({
    columns: generateColumnDefinitions(columns),
    data: items,
    enableSorting: false,
    getCoreRowModel: getCoreRowModel(),
    ...tableOptions,
  });
  return (
    <TableContainer className={className} sx={tableContainerSx}>
      <GridTable
        collapsable={collapsable}
        gridTemplateColumns={gridTemplateColumns}
        stickyHeader={rowDirection === ROW_DIRECTION.DEFAULT && stickyHeader}
      >
        <TableHead rowDirection={rowDirection} tableInstance={tableInstance} />
        <TableBody
          rowDirection={rowDirection}
          tableInstance={tableInstance}
          tableView={tableView}
        />
      </GridTable>
    </TableContainer>
  );
};
