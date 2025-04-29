import { ExpandedOptions, RowData } from "@tanstack/react-table";
import { useExploreMode } from "../../../../../hooks/useExploreMode/useExploreMode";
import { EXPANDED_OPTIONS } from "./constants";

/**
 * Returns the ExpandedOptions for the table.
 * @returns ExpandedOptions.
 */
export function useExpandedOptions<T extends RowData>(): ExpandedOptions<T> {
  const exploreMode = useExploreMode();

  return { ...EXPANDED_OPTIONS[exploreMode] };
}
