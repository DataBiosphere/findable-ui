import { RowData, RowSelectionOptions } from "@tanstack/react-table";
import { EXPLORE_MODE } from "hooks/useExploreMode/types";

export const ROW_SELECTION_OPTIONS: Record<
  EXPLORE_MODE,
  Pick<
    RowSelectionOptions<RowData>,
    "enableRowSelection" | "enableSubRowSelection" | "enableMultiRowSelection"
  >
> = {
  CS_FETCH_CS_FILTERING: {
    enableMultiRowSelection: false,
    enableRowSelection: false,
    enableSubRowSelection: false,
  },
  SS_FETCH_CS_FILTERING: {
    enableMultiRowSelection: false,
    enableRowSelection: false,
    enableSubRowSelection: false,
  },
  SS_FETCH_SS_FILTERING: {
    enableMultiRowSelection: false,
    enableRowSelection: false,
    enableSubRowSelection: false,
  },
};
