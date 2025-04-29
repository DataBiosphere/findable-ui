import { getGroupedRowModel, GroupingOptions } from "@tanstack/react-table";
import { EXPLORE_MODE } from "../../../../../hooks/useExploreMode/types";

export const GROUPING_OPTIONS: Record<EXPLORE_MODE, GroupingOptions> = {
  CS_FETCH_CS_FILTERING: {
    enableGrouping: false,
    getGroupedRowModel: getGroupedRowModel(),
  },
  SS_FETCH_CS_FILTERING: {
    enableGrouping: false,
    getGroupedRowModel: getGroupedRowModel(),
  },
  SS_FETCH_SS_FILTERING: {
    enableGrouping: false,
    getGroupedRowModel: getGroupedRowModel(),
  },
};
