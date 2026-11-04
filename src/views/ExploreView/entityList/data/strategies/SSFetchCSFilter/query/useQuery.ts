import {
  type DefaultError,
  skipToken,
  type UseQueryResult,
  useQuery as useReactQuery,
} from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useToken } from "../../../../../../../hooks/authentication/token/useToken";
import { useEntities } from "../../../../../hooks/UseEntities/hook";
import { queryFn } from "./queryFn";
import type { QueryKey } from "./types";
import { createQueryClient, selectEntities } from "./utils";

/**
 * Fetches every entity in the entity list from the server, for client-side filtering, and maps them to list items with
 * the entity's mapper (`select`). Uses findable-ui's own query client: created once per mount, with the defaults in
 * ./constants, so apps need no QueryClientProvider and their client defaults never apply. Data is only ever returned
 * for the query it belongs to: a response for an earlier query, e.g. one requested before signing in, never replaces
 * the current one, and its request is cancelled. An error is thrown to the error boundary once its request has settled
 * (the client's `throwOnError`); a query that failed is requested again when it is next used. An entity list with no
 * API path, e.g. a client-side fetched one still selected while the page changes, isn't requested.
 * @param entityListType - Entity list type.
 * @returns Query result, with the list items as data.
 */
export const useQuery = (
  entityListType: string,
): UseQueryResult<unknown[], DefaultError> => {
  const { apiPath, entityMapper } = useEntities(entityListType);
  const { token } = useToken();
  const [queryClient] = useState(createQueryClient);
  const select = useMemo(() => selectEntities(entityMapper), [entityMapper]);

  return useReactQuery<unknown[], DefaultError, unknown[], QueryKey>(
    {
      // The key holds the entity list type for the path, and whether the user is signed in for the token: a token
      // refresh for the same user doesn't fetch again, and the token stays out of the query cache.
      queryFn: apiPath ? queryFn(apiPath, token) : skipToken,
      queryKey: [
        "entities",
        entityListType,
        { isAuthenticated: Boolean(token) },
      ],
      select,
    },
    queryClient,
  );
};
