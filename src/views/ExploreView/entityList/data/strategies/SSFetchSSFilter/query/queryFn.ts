import { QueryKey } from "./types";
import { Options } from "ky";
import { QueryFunctionContext } from "@tanstack/react-query";
import { fetchApi } from "../../../../../../../entity/common/client";
import { buildHeaders } from "../../../../../../../entity/common/utils";
import { AzulEntitiesResponse } from "../../../../../../../apis/azul/common/entities";
import { transformFilters } from "../../../../../../../apis/azul/common/filterTransformer";
import { mapSelectedFilters } from "../../../../../../../providers/tables/adapter/columnFilters";

/**
 * Builds ky search parameters for use in a React Query fetch request with the Azul API.
 * TODO(fran): use `columnFilters` and other table state values from TableState.
 *
 * @param queryKey - Query key.
 * @returns Search parameters.
 */
export function buildSearchParams(queryKey: QueryKey): Options["searchParams"] {
  const [, , catalog, { columnFilters, pagination, sorting }] = queryKey;
  // const { index } = pagination;
  // const { type: searchAfterOrBefore = "search_after", value } = index || {};
  return {
    catalog,
    filters: transformFilters(mapSelectedFilters(columnFilters)),
    order: sorting[0]?.desc ? "desc" : "asc",
    // [searchAfterOrBefore]: value ?? undefined, // `undefined` will be removed from ky search params therefore it is ok to fallback to `search_after`.
    size: pagination.pageSize,
    sort: sorting[0]?.id,
  };
}

/**
 * Fetches data from the Azul API using React Query.
 *
 * @param endpoint - Endpoint.
 * @param accessToken - Access token.
 * @returns Data from the Azul endpoint.
 */
export function queryFn<T = unknown>(
  endpoint: string,
  accessToken: string | undefined,
): (
  context: QueryFunctionContext<QueryKey>,
) => Promise<AzulEntitiesResponse<T>> {
  return ({ queryKey, signal }: QueryFunctionContext<QueryKey>) => {
    return fetchApi<AzulEntitiesResponse<T>>(endpoint, {
      headers: buildHeaders(accessToken),
      searchParams: buildSearchParams(queryKey),
      signal,
    }).json();
  };
}
