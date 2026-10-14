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
import { JSX } from "react";
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
import { ROW_SELECTION_VALIDATION } from "../../../Table/features/RowSelectionValidation/constants";
import { TABLE_DOWNLOAD } from "../../../Table/features/TableDownload/constants";
import { GridTable } from "../../../Table/table.styles";
import { generateColumnDefinitions } from "./common/utils";
import { TableBody } from "./components/TableBody/tableBody";

/**
 * Table view options; only `table.stickyHeader`, `tableCell.size` and `tableContainer.sx` are used.
 */
export interface TableView {
  table?: Partial<MTableProps>;
  tableCell?: Partial<MTableCellProps>;
  tableContainer?: Partial<MTableContainerProps>;
}

/**
 * Props for the Table component.
 */
export interface TableProps<T extends RowData> {
  className?: string;
  collapsable?: boolean;
  columns: ColumnDef<T>[];
  gridTemplateColumns: string;
  items: T[];
  tableOptions?: Partial<TableOptions<T>>;
  tableView?: TableView;
}

/**
 * Detail page table; the sticky header only applies when rows are laid out in
 * columns.
 * @param props - Component props.
 * @param props.className - Class name applied to the table container.
 * @param props.collapsable - Whether rows stack below the sm breakpoint. Defaults to true.
 * @param props.columns - Column definitions; a row position column is added first.
 * @param props.gridTemplateColumns - Grid template columns for the table.
 * @param props.items - Rows of data.
 * @param props.tableOptions - Table options, merged over the defaults.
 * @param props.tableView - Table view options: the sticky header, cell size and container sx.
 * @returns The table.
 */
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
    _features: [
      ROW_POSITION,
      ROW_PREVIEW,
      ROW_SELECTION_VALIDATION,
      TABLE_DOWNLOAD,
    ],
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
