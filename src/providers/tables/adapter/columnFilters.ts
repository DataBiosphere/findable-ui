import { ColumnFilter } from "@tanstack/react-table";
import { SelectedFilter } from "../../../common/entities";

/**
 * Maps selected filters to TanStack column filters.
 * @param selectedFilters - Selected filters.
 * @returns TanStack column filters.
 */
export function mapColumnFilters(
  selectedFilters: SelectedFilter[],
): ColumnFilter[] {
  return selectedFilters.map(({ categoryKey: id, value }) => ({ id, value }));
}

/**
 * Maps TanStack column filters to selected filters.
 * @param columnFilters - TanStack column filters.
 * @returns Selected filters.
 */
export function mapSelectedFilters(
  columnFilters: ColumnFilter[],
): SelectedFilter[] {
  return columnFilters.map(
    ({ id: categoryKey, value }) =>
      ({
        categoryKey,
        value,
      }) as SelectedFilter,
  );
}
