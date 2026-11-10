import type { SortingState } from "@tanstack/react-table";
import type { FilterState } from "../../../../../../../hooks/useCategoryFilter";

/**
 * The request's table inputs: filters, sorting and pagination (page size, and Azul's link to the requested page, if
 * any). Identifies the response it belongs to.
 */
export interface QueryParams {
  filterState: FilterState;
  size: string | undefined;
  sorting: SortingState;
  url: string | null;
}

/**
 * Query key: entity list type, catalog, whether the user is signed in, and the request's table inputs.
 */
export type QueryKey = [
  "entities",
  string,
  string | undefined,
  boolean,
  QueryParams,
];
