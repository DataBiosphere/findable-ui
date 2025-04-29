import {
  ExpandedOptions,
  getExpandedRowModel,
  RowData,
} from "@tanstack/react-table";
import { EXPLORE_MODE } from "../../../../../hooks/useExploreMode/types";

export const EXPANDED_OPTIONS: Record<
  EXPLORE_MODE,
  Pick<
    ExpandedOptions<RowData>,
    "autoResetExpanded" | "enableExpanding" | "getExpandedRowModel"
  >
> = {
  CS_FETCH_CS_FILTERING: {
    autoResetExpanded: false,
    enableExpanding: false,
    getExpandedRowModel: getExpandedRowModel(),
  },
  SS_FETCH_CS_FILTERING: {
    autoResetExpanded: false,
    enableExpanding: false,
    getExpandedRowModel: getExpandedRowModel(),
  },
  SS_FETCH_SS_FILTERING: {
    autoResetExpanded: false,
    enableExpanding: false,
    getExpandedRowModel: undefined,
  },
};
