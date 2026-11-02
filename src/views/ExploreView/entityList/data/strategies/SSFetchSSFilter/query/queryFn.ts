import type { QueryFunctionContext } from "@tanstack/react-query";
import type { SortingState } from "@tanstack/react-table";
import type {
  AzulEntitiesResponse,
  AzulListParams,
} from "../../../../../../../apis/azul/common/entities";
import { transformFilters } from "../../../../../../../apis/azul/common/filterTransformer";
import {
  fetchEntitiesFromApiURL,
  fetchEntitiesFromQuery,
} from "../../../../../../../entity/api/service";
import type { FilterState } from "../../../../../../../hooks/useCategoryFilter";
import { DataExplorerError } from "../../../../../../../types/error";
import type { QueryKey } from "./types";

/**
 * Builds the list params for the first page of results: the filters and sort, with no sort key.
 * @param filterState - Filter state.
 * @param sorting - Sorting.
 * @returns List params.
 */
export function buildListParams(
  filterState: FilterState,
  sorting: SortingState,
): AzulListParams {
  const [sort] = sorting;
  const listParams: AzulListParams = sort
    ? { order: sort.desc ? "desc" : "asc", sort: sort.id }
    : {};
  const filters = transformFilters(filterState);
  if (filters) listParams.filters = filters;
  return listParams;
}

/**
 * Returns the query function for the entity list. A next or previous page requests Azul's pagination link exactly as
 * given; otherwise, the first page is requested with the filters and sort. Errors are thrown as `DataExplorerError`,
 * for the error boundary.
 * @param apiPath - API path of the entity list.
 * @param accessToken - Access token.
 * @returns Query function.
 */
export function queryFn(
  apiPath: string,
  accessToken: string | undefined,
): (context: QueryFunctionContext<QueryKey>) => Promise<AzulEntitiesResponse> {
  return async ({ queryKey, signal }) => {
    const [, , catalog, { filterState, sorting, url }] = queryKey;
    try {
      if (url) {
        return await fetchEntitiesFromApiURL(apiPath, url, accessToken, signal);
      }
      return await fetchEntitiesFromQuery(
        apiPath,
        buildListParams(filterState, sorting),
        catalog,
        accessToken,
        signal,
      );
    } catch (error) {
      throw new DataExplorerError(error);
    }
  };
}
