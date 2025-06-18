import { InitialTableState, PaginationTableState } from "@tanstack/react-table";
import { PAGINATION_TABLE_STATE } from "./constants";

/**
 * Initializes pagination state by merging default values with initial state.
 * TanStack Table always applies a default pagination of `{ pageIndex: 0, pageSize: 10 }`,
 * so this function ensures custom pagination state is properly initialized from the initial state.
 * @param initialState - The initial state.
 * @returns The initialized pagination state.
 */
export function initPaginationState(
  initialState?: InitialTableState
): PaginationTableState {
  if (!initialState?.pagination) return PAGINATION_TABLE_STATE;
  return {
    pagination: {
      ...PAGINATION_TABLE_STATE.pagination,
      ...initialState.pagination,
    },
  };
}
