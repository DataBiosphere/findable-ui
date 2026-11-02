import {
  DefaultError,
  UseQueryResult,
  useQuery as useReactQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import type { AzulEntitiesResponse } from "../../../../../../../apis/azul/common/entities";
import { useToken } from "../../../../../../../hooks/authentication/token/useToken";
import { useCatalog } from "../../../../../../../hooks/useCatalog";
import { useEntityService } from "../../../../../../../hooks/useEntityService";
import { useExploreState } from "../../../../../../../hooks/useExploreState";
import { queryFn } from "./queryFn";
import type { QueryKey } from "./types";
import { createQueryClient, keepPreviousEntityData } from "./utils";

/**
 * Fetches the entity list from the server, with server-side filtering, using findable-ui's own query client: created
 * once per mount, with the defaults in ./constants, so apps need no QueryClientProvider and their client defaults never
 * apply. Data is only ever returned for the query it belongs to: a response for an earlier query never replaces the
 * current one, and its request is cancelled. An error is thrown to the error boundary once its request has settled (the
 * client's `throwOnError`); a query that failed is requested again when it is next used.
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
  const [queryClient] = useState(createQueryClient);

  return useReactQuery<
    AzulEntitiesResponse,
    DefaultError,
    AzulEntitiesResponse,
    QueryKey
  >(
    {
      // Keeps the previous response while the next one loads, for the same entity list type; the adapter then sends
      // it into explore state with `loading: true`, which clears the rows and shows the loading look.
      placeholderData: keepPreviousEntityData(entityListType),
      // The key holds the entity list type for the path, and whether the user is signed in for the token: a token
      // refresh for the same user doesn't fetch again, and the token stays out of the query cache.
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
    },
    queryClient,
  );
};
