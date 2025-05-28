import { ColumnFiltersState } from "@tanstack/react-table";

/**
 * Returns column filters from the given URL parameter.
 * @param param - URL parameter.
 * @returns column filters.
 */
export function decodeFilterParam(
  param: string | string[] | undefined
): ColumnFiltersState {
  let columnFilters: ColumnFiltersState = [];

  // Return empty array if no parameter.
  if (!param) return columnFilters;

  // Filter param should be a string.
  if (typeof param === "string") {
    try {
      // Parse filter param.
      columnFilters = JSON.parse(decodeURIComponent(param));
    } catch {
      // do nothing
    }
  }

  return columnFilters;
}
