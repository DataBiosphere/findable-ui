import { RowData } from "@tanstack/react-table";
import { ColumnConfig } from "../../../config/entities";
import { RowSelectionCell } from "../../Table/components/TableCell/components/RowSelectionCell/rowSelectionCell";

export const ACCESSOR_KEYS = {
  ROW_POSITION: "rowPosition",
  SELECT: "select",
};

export const COLUMN_CONFIGS: Record<string, ColumnConfig<RowData>> = {
  SELECT: {
    columnPinned: false,
    componentConfig: { component: RowSelectionCell },
    disableHiding: true,
    enableGrouping: false,
    enableHiding: false,
    enableSorting: false,
    header: ACCESSOR_KEYS.SELECT,
    id: ACCESSOR_KEYS.SELECT,
    meta: {
      header: "",
    },
    width: "max-content",
  },
};
