import { QueryKey } from "./types";
import { QueryFunctionContext } from "@tanstack/react-query";
import { fetchApi } from "../../../../../../../entity/common/client";
import { buildHeaders } from "../../../../../../../entity/common/utils";

/**
 * Fetches data from the given endpoint using React Query.
 *
 * @param endpoint - Endpoint.
 * @param accessToken - Access token.
 * @returns Data from the specified endpoint.
 */
export function queryFn<T = unknown>(
  endpoint: string,
  accessToken: string | undefined,
): (context: QueryFunctionContext<QueryKey>) => Promise<T[]> {
  return ({ signal }: QueryFunctionContext<QueryKey>) => {
    return fetchApi<T[]>(endpoint, {
      headers: buildHeaders(accessToken),
      signal,
    }).json();
  };
}
