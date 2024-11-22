import { RowData } from "@tanstack/react-table";
import { TABLE_CELL_PROPS } from "../../../styles/common/mui/tableCell";
import { RowPositionCell } from "../../Table/components/TableCell/components/RowPositionCell/rowPositionCell";
import { RowSelectionCell } from "../../Table/components/TableCell/components/RowSelectionCell/rowSelectionCell";
import { BaseColumnConfig } from "./entities";

export const ACCESSOR_KEYS = {
  ROW_POSITION: "rowPosition",
  SELECT: "select",
};

export const COLUMN_CONFIGS: Record<
  string,
  BaseColumnConfig<RowData, unknown>
> = {
  ROW_POSITION: {
    columnPinned: false,
    columnVisible: true,
    componentConfig: {
      component: RowPositionCell,
      viewBuilder: (_, viewContext) => viewContext?.cellContext,
    },
    disableHiding: true,
    disableSorting: true,
    header: "",
    id: ACCESSOR_KEYS.ROW_POSITION,
    meta: {
      align: TABLE_CELL_PROPS.ALIGN.RIGHT,
      header: "",
    },
    width: "max-content",
  },
  SELECT: {
    columnPinned: false,
    columnVisible: false,
    componentConfig: { component: RowSelectionCell },
    disableHiding: true,
    disableSorting: true,
    header: ACCESSOR_KEYS.SELECT,
    id: ACCESSOR_KEYS.SELECT,
    meta: {
      header: "",
    },
    width: "max-content",
  },
};
