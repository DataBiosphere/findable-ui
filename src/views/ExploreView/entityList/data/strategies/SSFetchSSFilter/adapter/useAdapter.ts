import { EntityListData } from "../../../types";
import { useQuery } from "../query/useQuery";
import { useEntities } from "../../../../../hooks/UseEntities/hook";
// import {
//   transformAzulPagination,
//   transformTermFacets,
// } from "../../../../../../../apis/azul/common/filterTransformer";

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
): EntityListData<T> => {
  const { apiPath } = useEntities(entityListType);
  const { data } = useQuery<T>(apiPath, entityListType);

  // TODO(fran): Refactor to pass response directly to explore view instead of dispatching to explore state.
  // - Pagination will be stored in table state
  // - Use TanStack Query's status to determine loading state
  // - Build category views from select categories, with category config and consider saved categories

  return { data: data?.hits };
};
