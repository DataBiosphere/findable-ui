import { useEffect } from "react";
import {
  ExploreActionKind,
  PaginationResponse,
} from "../../../../../../../providers/exploreState";
import { useExploreState } from "../../../../../../../hooks/useExploreState";
import { EntityListProps } from "../../../../types";
import { useSSFetchSSFilterQuery } from "../UseQuery/hook";

/**
 * Hook for server-side fetching and server-side filtering.
 *
 * Fetches entities from the server with server-side filtering applied
 * based on current filter state and pagination.
 *
 * @typeParam T - Entity type.
 * @param entityListType - Entity identifier.
 * @returns Fetched data.
 */
export const useSSFetchSSFilter = <T = unknown>(
  entityListType: string,
): EntityListProps<T> => {
  const { exploreDispatch } = useExploreState();
  const response = useSSFetchSSFilterQuery<T>(entityListType);

  // TODO(fran): Refactor to pass response directly to explore view instead of dispatching to explore state.
  // - Pagination will be stored in table state
  // - Use TanStack Query's loading state
  // - Build category views from select categories, with category config and consider saved categories

  useEffect(() => {
    exploreDispatch({
      payload: {
        listItems: response?.data ?? [],
        loading: !!response,
        paginationResponse:
          response?.paginationResponse ?? ({} as PaginationResponse), // to match current behaviour, pagination response snould default to {} while data is fetching to ensure current pagination state is preserved.
        selectCategories: response?.selectCategories,
      },
      type: ExploreActionKind.ProcessExploreResponse,
    });
  }, [exploreDispatch, response]);

  return { data: response?.data };
};
