import {
  TableCellProps as MTableCellProps,
  TableContainerProps as MTableContainerProps,
  TableProps as MTableProps,
  TableContainer,
} from "@mui/material";
import {
  ColumnDef,
  getCoreRowModel,
  RowData,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import {
  BREAKPOINT_FN_NAME,
  useBreakpointHelper,
} from "../../../../hooks/useBreakpointHelper";
import { arrIncludesSome } from "../../../Table/columnDef/columnFilters/filterFn";
import { COLUMN_DEF } from "../../../Table/common/columnDef";
import { ROW_DIRECTION } from "../../../Table/common/entities";
import { TableHead } from "../../../Table/components/TableHead/tableHead";
import { TABLE_DOWNLOAD_OPTIONS } from "../../../Table/featureOptions/tableDownload/constants";
import { ROW_POSITION } from "../../../Table/features/RowPosition/constants";
import { ROW_PREVIEW } from "../../../Table/features/RowPreview/constants";
import { TABLE_DOWNLOAD } from "../../../Table/features/TableDownload/constants";
import { GridTable } from "../../../Table/table.styles";
import { generateColumnDefinitions } from "./common/utils";
import { TableBody } from "./components/TableBody/tableBody";

export interface TableView {
  table?: Partial<MTableProps>;
  tableCell?: Partial<MTableCellProps>;
  tableContainer?: Partial<MTableContainerProps>;
}

export interface TableProps<T extends RowData> {
  className?: string;
  collapsable?: boolean;
  columns: ColumnDef<T>[];
  gridTemplateColumns: string;
  items: T[];
  tableOptions?: Partial<TableOptions<T>>;
  tableView?: TableView;
}

export const Table = <T extends RowData>({
  className,
  collapsable = true,
  columns,
  gridTemplateColumns,
  items,
  tableOptions,
  tableView,
}: TableProps<T>): JSX.Element => {
  const bpDownSm = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, "sm");
  const rowDirection =
    collapsable && bpDownSm ? ROW_DIRECTION.VERTICAL : ROW_DIRECTION.DEFAULT;
  const { table, tableContainer } = tableView || {};
  const { stickyHeader = false } = table || {};
  const { sx: tableContainerSx } = tableContainer || {};
  const tableInstance = useReactTable({
    _features: [ROW_POSITION, ROW_PREVIEW, TABLE_DOWNLOAD],
    columns: generateColumnDefinitions([
      COLUMN_DEF.ROW_POSITION as ColumnDef<T>,
      ...columns,
    ]),
    data: items,
    enableSorting: false,
    filterFns: { arrIncludesSome },
    getCoreRowModel: getCoreRowModel(),
    ...TABLE_DOWNLOAD_OPTIONS,
    ...tableOptions,
  });
  return (
    <TableContainer className={className} sx={tableContainerSx}>
      <GridTable
        collapsable={collapsable}
        gridTemplateColumns={gridTemplateColumns}
        stickyHeader={rowDirection === ROW_DIRECTION.DEFAULT && stickyHeader}
      >
        <TableHead tableInstance={tableInstance} />
        <TableBody
          rowDirection={rowDirection}
          tableInstance={tableInstance}
          tableView={tableView}
        />
      </GridTable>
    </TableContainer>
  );
};
