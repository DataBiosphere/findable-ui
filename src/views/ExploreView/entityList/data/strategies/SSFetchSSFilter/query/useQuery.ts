import {
  DefaultError,
  UseQueryResult,
  useQuery as useReactQuery,
} from "@tanstack/react-query";
import type { AzulEntitiesResponse } from "../../../../../../../apis/azul/common/entities";
import { useToken } from "../../../../../../../hooks/authentication/token/useToken";
import { useCatalog } from "../../../../../../../hooks/useCatalog";
import { useEntityService } from "../../../../../../../hooks/useEntityService";
import { useExploreState } from "../../../../../../../hooks/useExploreState";
import { queryFn } from "./queryFn";
import type { QueryKey } from "./types";
import { keepPreviousEntityData, throwSettledError } from "./utils";

/**
 * Fetches the entity list from the server, with server-side filtering.
 * Data is only ever returned for the query it belongs to: a response for an earlier query never replaces the current
 * one. Responses aren't cached: explore state holds the response, and each query is requested when it is used.
 * Retries are left to ky, and an error is thrown to the error boundary once its request has settled; a query that
 * failed is requested again when it is next used.
 * @param entityListType - Entity list type.
 * @returns Query result.
 */
export const useQuery = (
  entityListType: string,
): UseQueryResult<AzulEntitiesResponse, DefaultError> => {
  const catalog = useCatalog();
  const { path } = useEntityService(entityListType);
  const { token } = useToken();
  const { exploreState } = useExploreState();
  const { entityPageState, filterState, paginationState } = exploreState;
  const { sorting } = entityPageState[entityListType];

  const result = useReactQuery<
    AzulEntitiesResponse,
    DefaultError,
    AzulEntitiesResponse,
    QueryKey
  >({
    gcTime: 0,
    placeholderData: keepPreviousEntityData(entityListType),
    // The key holds the entity list type for the path, and whether the user is signed in for the token: a token refresh
    // for the same user doesn't fetch again, and the token stays out of the query cache.
    queryFn: queryFn(path, token),
    queryKey: [
      "entities",
      entityListType,
      catalog,
      {
        filterState,
        isAuthenticated: Boolean(token),
        sorting,
        url: paginationState.index?.url ?? null,
      },
    ],
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  throwSettledError(result);

  return result;
};
