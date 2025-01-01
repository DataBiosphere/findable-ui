import { RowData, RowSelectionOptions } from "@tanstack/react-table";

export const ROW_SELECTION_OPTIONS: Pick<
  RowSelectionOptions<RowData>,
  "enableRowSelection" | "enableSubRowSelection" | "enableMultiRowSelection"
> = {
  enableMultiRowSelection: false,
  enableRowSelection: false,
  enableSubRowSelection: false,
};
