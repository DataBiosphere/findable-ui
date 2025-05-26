import { GroupingOptions, getGroupedRowModel } from "@tanstack/react-table";

export const GROUPING_OPTIONS: Pick<
  GroupingOptions,
  "enableGrouping" | "getGroupedRowModel"
> = {
  enableGrouping: true,
  getGroupedRowModel: getGroupedRowModel(),
};
