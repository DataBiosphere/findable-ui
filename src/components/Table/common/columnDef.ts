import { ColumnDef, RowData } from "@tanstack/react-table";
import { TABLE_CELL_PROPS } from "../../../styles/common/mui/tableCell";
import { RowPositionCell } from "../components/TableCell/components/RowPositionCell/rowPositionCell";
import { RowSelectionCell } from "../components/TableCell/components/RowSelectionCell/rowSelectionCell";
import { HeadSelectionCell } from "../components/TableHead/components/HeadSelectionCell/headSelectionCell";
import { COLUMN_IDENTIFIER } from "./columnIdentifier";

export const COLUMN_DEF: Record<string, ColumnDef<RowData>> = {
  ROW_POSITION: {
    cell: RowPositionCell,
    enableColumnFilter: false,
    enableGrouping: false,
    enableHiding: false,
    enableSorting: false,
    header: "",
    id: COLUMN_IDENTIFIER.ROW_POSITION,
    meta: {
      align: TABLE_CELL_PROPS.ALIGN.RIGHT,
      columnPinned: false,
      header: "",
      width: "max-content",
    },
  },
  ROW_SELECTION: {
    cell: RowSelectionCell,
    enableColumnFilter: false,
    enableGrouping: false,
    enableHiding: false,
    enableSorting: false,
    header: HeadSelectionCell,
    id: COLUMN_IDENTIFIER.ROW_SELECTION,
    meta: {
      columnPinned: false,
      header: "",
      width: "max-content",
    },
  },
};
