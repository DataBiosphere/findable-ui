import { functionalUpdate, PaginationState } from "@tanstack/react-table";
import { TablesState } from "../../state/types";
import { UpdatePaginationPayload } from "./types";

/**
 * Builds the next pagination state for the table.
 * Uses TanStack updater to update the pagination state.
 * @param state - State.
 * @param payload - Payload.
 * @returns pagination state.
 */
export function buildNextPagination(
  state: TablesState,
  payload: UpdatePaginationPayload,
): PaginationState {
  return functionalUpdate(
    payload.updaterOrValue,
    getOldPagination(state, payload),
  );
}

/**
 * Retrieves the old pagination state for the table.
 *
 * If the revision is not provided, returns the current pagination state.
 * If the revision matches the current revision, returns the current pagination state.
 * Otherwise, returns pagination state with page index reset.
 *
 * @param state - State.
 * @param payload - Payload.
 * @returns pagination state.
 */
function getOldPagination(
  state: TablesState,
  payload: UpdatePaginationPayload,
): PaginationState {
  // Current pagination state.
  const pagination = state.tables[payload.tableKey].pagination;

  // No revision awareness -> use reducer state
  if (!payload.revision) return pagination;

  // Same revision -> reducer state is valid
  if (payload.revision === state.revision) return pagination;

  // Revision mismatch -> pagination is stale, reset
  return {
    pageIndex: 0,
    pageSize: pagination.pageSize,
  };
}
