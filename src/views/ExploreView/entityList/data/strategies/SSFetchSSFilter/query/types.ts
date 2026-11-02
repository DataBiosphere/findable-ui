import type { SortingState } from "@tanstack/react-table";
import type { FilterState } from "../../../../../../../hooks/useCategoryFilter";

/**
 * The request's inputs from explore state; identifies the response it belongs to.
 */
export interface QueryParams {
  filterState: FilterState;
  isAuthenticated: boolean;
  sorting: SortingState;
  url: string | null;
}

/**
 * Query key: entity list type, catalog and request inputs.
 */
export type QueryKey = ["entities", string, string | undefined, QueryParams];
