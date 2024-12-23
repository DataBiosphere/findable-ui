import { RowData, SortingOptions } from "@tanstack/react-table";
import { SORTING_OPTIONS } from "./constants";

export function useSortingOptions<T extends RowData>(): SortingOptions<T> {
  return { ...SORTING_OPTIONS };
}
