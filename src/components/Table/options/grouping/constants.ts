import { getGroupedRowModel, GroupingOptions } from "@tanstack/react-table";

export const TABLE_OPTIONS: GroupingOptions = {
  enableGrouping: false, // Default is false.
  getGroupedRowModel: getGroupedRowModel(),
};
