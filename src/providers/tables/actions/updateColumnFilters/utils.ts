import { ColumnFiltersState, functionalUpdate } from "@tanstack/react-table";
import { TablesState } from "../../state/types";
import { UpdateColumnFiltersPayload } from "./types";

/**
 * Builds the next column filters state for the table.
 * Uses TanStack updater to update the column filters state.
 * @param state - State.
 * @param payload - Payload.
 * @returns column filters state.
 */
export function buildNextColumnFilters(
  state: TablesState,
  payload: UpdateColumnFiltersPayload,
): ColumnFiltersState {
  return functionalUpdate(
    payload.updaterOrValue,
    state.tables[payload.tableKey].columnFilters,
  );
}
