import { useQuery } from "../query/useQuery";
import { useEntities } from "../../../../../hooks/UseEntities/hook";
import { UseAdapter } from "./types";

/**
 * Hook for server-side fetch and server-side filter.
 *
 * Fetches entities from the server with server-side filter applied
 * based on current filter state and pagination.
 *
 * @typeParam T - Entity type.
 * @param entityListType - Entity identifier.
 * @returns Fetched data.
 */
export const useAdapter = <T = unknown>(
  entityListType: string,
): UseAdapter<T> => {
  const { apiPath } = useEntities(entityListType);
  const { data, isFetching } = useQuery<T>(apiPath, entityListType);
  const { hits, pagination, termFacets } = data ?? {};
  const { pages: pageCount = 0 } = pagination ?? {};
  return { data: hits, isFetching, pageCount, termFacets };
};
