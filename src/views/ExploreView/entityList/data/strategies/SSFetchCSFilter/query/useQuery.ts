import { useToken } from "../../../../../../../hooks/authentication/token/useToken";
import {
  DefaultError,
  UseQueryResult,
  useQuery as useReactQuery,
} from "@tanstack/react-query";
import { QueryKey } from "./types";
import { queryFn } from "./queryFn";

// TODO(fran) - we need to handle invalidation of the query when a user logs in/out.

/**
 * Fetches entities from the server using React Query.
 *
 * @param apiPath - API path.
 * @param entityListType - Entity identifier.
 * @returns UseQueryResult<T[], DefaultError>.
 */
export const useQuery = <T = unknown>(
  apiPath: string | undefined,
  entityListType: string,
): UseQueryResult<T[], DefaultError> => {
  const { token } = useToken();

  if (!apiPath) throw new Error("No API path found for entity");

  return useReactQuery<T[], DefaultError, T[], QueryKey>({
    queryFn: queryFn(apiPath, token),
    queryKey: ["entities", entityListType],
  });
};
