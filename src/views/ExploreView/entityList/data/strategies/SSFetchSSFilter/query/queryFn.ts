import type { QueryFunctionContext } from "@tanstack/react-query";
import type { Options } from "ky";
import type { AzulEntitiesResponse } from "../../../../../../../apis/azul/common/entities";
import { transformFilters } from "../../../../../../../apis/azul/common/filterTransformer";
import { fetchApi } from "../../../../../../../entity/common/client";
import {
  assertDataSourceOrigin,
  getKyRequestOptions,
} from "../../../../../../../entity/common/utils";
import { DataExplorerError } from "../../../../../../../types/error";
import type { QueryKey } from "./types";

/**
 * Builds the search params for the first page of results, each Azul parameter taken from the query key: the catalog,
 * the filters, the sort and its order, and the page size. `order` is only sent with a sort, and ky leaves undefined
 * values out of the request. Not used for Azul's pagination links, which are requested exactly as given.
 * @param queryKey - Query key.
 * @returns Search params.
 */
function buildSearchParams(queryKey: QueryKey): Options["searchParams"] {
  const [, , catalog, , { filterState, size, sorting }] = queryKey;
  const [sort] = sorting;
  return {
    catalog,
    filters: transformFilters(filterState),
    order: sort && (sort.desc ? "desc" : "asc"),
    size,
    sort: sort?.id,
  };
}

/**
 * Requests the entity list. A next or previous page requests Azul's pagination link exactly as given, with no search
 * params: ky would replace the link's query string with them. Otherwise, the first page is requested with search params
 * built from the query key. Throws unless a pagination link is on the data source's origin, so a link from the response
 * can't send the access token elsewhere.
 * @param apiPath - API path of the entity list.
 * @param accessToken - Access token.
 * @param queryKey - Query key.
 * @param signal - Signal that cancels the request.
 * @returns Entities response.
 */
function fetchEntities(
  apiPath: string,
  accessToken: string | undefined,
  queryKey: QueryKey,
  signal: AbortSignal,
): Promise<AzulEntitiesResponse> {
  const [, , , , { url }] = queryKey;
  const options = { ...getKyRequestOptions(accessToken), signal };
  if (url) {
    assertDataSourceOrigin(url);
    return fetchApi<AzulEntitiesResponse>(url, options).json();
  }
  return fetchApi<AzulEntitiesResponse>(apiPath, {
    ...options,
    searchParams: buildSearchParams(queryKey),
  }).json();
}

/**
 * Returns the query function for the entity list: requests the page (see `fetchEntities`). Errors are thrown as
 * `DataExplorerError`, for the error boundary.
 * @param apiPath - API path of the entity list.
 * @param accessToken - Access token.
 * @returns Query function.
 */
export function queryFn(
  apiPath: string,
  accessToken: string | undefined,
): (context: QueryFunctionContext<QueryKey>) => Promise<AzulEntitiesResponse> {
  return async ({ queryKey, signal }) => {
    try {
      return await fetchEntities(apiPath, accessToken, queryKey, signal);
    } catch (error) {
      throw new DataExplorerError(error);
    }
  };
}
