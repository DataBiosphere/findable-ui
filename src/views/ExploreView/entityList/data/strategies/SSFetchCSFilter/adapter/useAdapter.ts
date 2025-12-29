import { EntityListData } from "../../../types";
import { useQuery } from "../query/useQuery";
import { useEntities } from "../../../../../hooks/UseEntities/hook";

/**
 * Hook for server-side fetch and client-side filter.
 *
 * Fetches entities from the server with client-side filter applied via TanStack Table.
 *
 * @typeParam T - Entity type.
 * @param entityListType - Entity identifier.
 * @returns Fetched data.
 */
export const useAdapter = <T = unknown>(
  entityListType: string,
): EntityListData<T> => {
  const { apiPath } = useEntities(entityListType);
  const { data } = useQuery<T>(apiPath, entityListType);

  return { data };
};
