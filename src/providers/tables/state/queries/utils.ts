import { TableState } from "@tanstack/react-table";
import { PARAM } from "./constants";
import { TableKey } from "../tables/types";
import { SelectedFilter } from "../../../../common/entities";
import { mapSelectedFilters } from "../../adapter/columnFilters";

/**
 * Extracts table state properties for URL synchronization.
 * Converts column filters to URL-compatible format.
 *
 * @param state - TanStack table state.
 * @returns Object ready for URL serialization.
 */
export function extractUrlState(
  state: Partial<TableState>,
): Record<TableKey, string | SelectedFilter[]> {
  return {
    [PARAM.COLUMN_FILTERS]: mapSelectedFilters(state.columnFilters || []),
  };
}
