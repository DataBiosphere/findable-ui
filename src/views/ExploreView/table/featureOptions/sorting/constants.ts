import {
  getSortedRowModel,
  RowData,
  SortingOptions,
} from "@tanstack/react-table";
import { EXPLORE_MODE } from "../../../../../hooks/useExploreMode/types";

export const SORTING_OPTIONS: Record<
  EXPLORE_MODE,
  Pick<
    SortingOptions<RowData>,
    | "enableMultiSort"
    | "enableSorting"
    | "enableSortingInteraction"
    | "enableSortingRemoval"
    | "getSortedRowModel"
    | "manualSorting"
    | "onSortingChange"
  >
> = {
  CS_FETCH_CS_FILTERING: {
    enableMultiSort: true,
    enableSorting: true,
    enableSortingInteraction: true,
    enableSortingRemoval: false, // false i.e. toggling the sorting on a column will not remove sorting on the column.
    getSortedRowModel: getSortedRowModel(),
    manualSorting: false,
  },
  SS_FETCH_CS_FILTERING: {
    enableMultiSort: true,
    enableSorting: true,
    enableSortingInteraction: true,
    enableSortingRemoval: false, // false i.e. toggling the sorting on a column will not remove sorting on the column.
    getSortedRowModel: getSortedRowModel(),
    manualSorting: false,
  },
  SS_FETCH_SS_FILTERING: {
    enableMultiSort: false,
    enableSorting: true,
    enableSortingInteraction: true,
    enableSortingRemoval: false, // false i.e. toggling the sorting on a column will not remove sorting on the column.
    getSortedRowModel: undefined,
    manualSorting: true,
    onSortingChange: undefined,
  },
};
