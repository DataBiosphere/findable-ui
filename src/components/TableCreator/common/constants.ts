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
