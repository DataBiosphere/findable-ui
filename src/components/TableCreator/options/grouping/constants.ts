import { getGroupedRowModel, GroupingOptions } from "@tanstack/react-table";

export const GROUPING_OPTIONS: GroupingOptions = {
  enableGrouping: false,
  getGroupedRowModel: getGroupedRowModel(),
};
