import { FacetedOptions, RowData } from "@tanstack/react-table";
import { useExploreMode } from "../../../../../hooks/useExploreMode/useExploreMode";
import { FACETED_OPTIONS } from "./constants";

/**
 * Returns the FacetedOptions for the table.
 * @returns FacetedOptions.
 */
export function useFacetedOptions<T extends RowData>(): FacetedOptions<T> {
  const exploreMode = useExploreMode();

  return { ...(FACETED_OPTIONS[exploreMode] as FacetedOptions<T>) };
}
