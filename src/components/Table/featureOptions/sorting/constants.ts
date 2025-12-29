import {
  getSortedRowModel,
  RowData,
  SortingOptions,
} from "@tanstack/react-table";

export const SORTING_OPTIONS: Pick<
  SortingOptions<RowData>,
  | "enableMultiSort"
  | "enableSorting"
  | "enableSortingInteraction"
  | "enableSortingRemoval"
  | "getSortedRowModel"
> = {
  enableMultiSort: true,
  enableSorting: true,
  enableSortingInteraction: true,
  enableSortingRemoval: false, // false i.e. toggling the sorting on a column will not remove sorting on the column.
  getSortedRowModel: getSortedRowModel(),
};
