import { getExpandedRowModel, PaginationOptions } from "@tanstack/react-table";
import { EXPLORE_MODE } from "../../../../../hooks/useExploreMode/types";

export const PAGINATION_OPTIONS: Record<
  EXPLORE_MODE,
  Pick<PaginationOptions, "getPaginationRowModel" | "manualPagination">
> = {
  CS_FETCH_CS_FILTERING: {
    getPaginationRowModel: getExpandedRowModel(),
  },
  SS_FETCH_CS_FILTERING: {
    getPaginationRowModel: getExpandedRowModel(),
  },
  SS_FETCH_SS_FILTERING: {
    getPaginationRowModel: undefined,
    manualPagination: true,
  },
};

//   getPaginationRowModel: getPaginationRowModel(),
//   manualPagination: true,
//   pageCount,
