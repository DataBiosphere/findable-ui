import { ColumnDef, RowData } from "@tanstack/react-table";
import { TABLE_CELL_PROPS } from "../../../styles/common/mui/tableCell";
import { ACCESSOR_KEYS } from "../../TableCreator/common/constants";
import { RowPositionCell } from "../components/TableCell/components/RowPositionCell/rowPositionCell";

export const COLUMN_DEF: Record<string, ColumnDef<RowData>> = {
  ROW_POSITION: {
    cell: RowPositionCell,
    header: "",
    id: ACCESSOR_KEYS.ROW_POSITION,
    meta: { align: TABLE_CELL_PROPS.ALIGN.RIGHT, header: "" },
  },
};
