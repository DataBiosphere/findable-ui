import { ColumnFiltersOptions, RowData } from "@tanstack/react-table";
import { useExploreMode } from "../../../../../hooks/useExploreMode/useExploreMode";
import { COLUMN_FILTERS } from "./constants";

/**
 * Returns the ColumnFiltersOptions for the table.
 * @returns ColumnFiltersOptions.
 */
export function useColumnFiltersOptions<T extends RowData>(): Partial<
  ColumnFiltersOptions<T>
> {
  const exploreMode = useExploreMode();

  return { ...COLUMN_FILTERS[exploreMode] };
}
