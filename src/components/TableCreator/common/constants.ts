import { RowData } from "@tanstack/react-table";
import { RowSelectionCell } from "../../Table/components/TableCell/components/RowSelectionCell/rowSelectionCell";
import { BaseColumnConfig } from "./entities";

export const ACCESSOR_KEYS = {
  SELECT: "select",
};

export const COLUMN_CONFIGS: Record<
  string,
  BaseColumnConfig<RowData, unknown>
> = {
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
