import type { QueryFunctionContext } from "@tanstack/react-query";
import { fetchApi } from "../../../../../../../entity/common/client";
import { getKyRequestOptions } from "../../../../../../../entity/common/utils";
import { DataExplorerError } from "../../../../../../../types/error";
import type { QueryKey } from "./types";

/**
 * Returns the query function for the entity list: requests every entity from the API path in one request, with the
 * query's signal, so a superseded request is cancelled. The response is a list, or an object keyed by entity ID; either
 * way, its values are the entities. Errors are thrown as `DataExplorerError`, for the error boundary.
 * @param apiPath - API path of the entity list.
 * @param accessToken - Access token.
 * @returns Query function.
 */
export function queryFn(
  apiPath: string,
  accessToken: string | undefined,
): (context: QueryFunctionContext<QueryKey>) => Promise<unknown[]> {
  return async ({ signal }) => {
    try {
      const response = await fetchApi<Record<string, unknown> | unknown[]>(
        apiPath,
        { ...getKyRequestOptions(accessToken), signal },
      ).json();
      return Object.values(response);
    } catch (error) {
      throw new DataExplorerError(error);
    }
  };
}
