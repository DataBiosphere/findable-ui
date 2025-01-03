import {
  ExpandedOptions,
  getExpandedRowModel,
  RowData,
} from "@tanstack/react-table";

export const EXPANDED_OPTIONS: Pick<
  ExpandedOptions<RowData>,
  "autoResetExpanded" | "enableExpanding" | "getExpandedRowModel"
> = {
  autoResetExpanded: false,
  enableExpanding: false,
  getExpandedRowModel: getExpandedRowModel(),
};
