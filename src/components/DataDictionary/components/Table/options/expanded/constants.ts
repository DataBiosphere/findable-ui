import {
  ExpandedOptions,
  getExpandedRowModel,
  RowData,
} from "@tanstack/react-table";

export const EXPANDED_OPTIONS: Pick<
  ExpandedOptions<RowData>,
  "enableExpanding" | "getExpandedRowModel" | "getRowCanExpand"
> = {
  enableExpanding: true,
  getExpandedRowModel: getExpandedRowModel(),
  getRowCanExpand: () => true,
};
