import { RowData, SortingOptions } from "@tanstack/react-table";
import { SORTING_OPTIONS } from "./constants";

/**
 * Returns the table's sorting options; sorting is on, and a column's sorting
 * can't be removed by toggling it.
 * @returns Sorting options.
 */
export function useSortingOptions<T extends RowData>(): SortingOptions<T> {
  return { ...SORTING_OPTIONS };
}
