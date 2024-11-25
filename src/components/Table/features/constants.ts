import { PaginationState } from "@tanstack/react-table";

/**
 * Default TanStack pagination state.
 * See https://tanstack.com/table/latest/docs/guide/custom-features#getinitialstate.
 */
export const DEFAULT_PAGINATION: PaginationState = {
  pageIndex: 0,
  pageSize: 10,
};
