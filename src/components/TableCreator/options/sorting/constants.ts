import { RowData, SortingOptions } from "@tanstack/react-table";

export const SORTING_OPTIONS: Pick<
  SortingOptions<RowData>,
  "enableSorting" | "enableSortingInteraction" | "enableSortingRemoval"
> = {
  enableSorting: true,
  enableSortingInteraction: true,
  enableSortingRemoval: false, // false i.e. toggling the sorting on a column will not remove sorting on the column.
};
