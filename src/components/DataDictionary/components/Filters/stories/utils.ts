import { ColumnFiltersState } from "@tanstack/react-table";

/**
 * Builds column filters from filter store.
 * @param filterStore - The filter store.
 * @returns The column filters.
 */
export function buildColumnFilters(
  filterStore: Record<string, unknown>,
): ColumnFiltersState {
  return Object.entries(filterStore).reduce((acc, [id, value]) => {
    if (!value) return acc;
    return [...acc, { id, value }];
  }, [] as ColumnFiltersState);
}
