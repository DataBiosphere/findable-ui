import { PaginationOptions } from "@tanstack/react-table";
import { useExploreMode } from "../../../../../hooks/useExploreMode/useExploreMode";
import { PAGINATION_OPTIONS } from "./constants";

/**
 * Returns the PaginationOptions for the table.
 * @returns PaginationOptions.
 */
export function usePaginationOptions(): PaginationOptions {
  const exploreMode = useExploreMode();

  return { ...PAGINATION_OPTIONS[exploreMode] };
}
