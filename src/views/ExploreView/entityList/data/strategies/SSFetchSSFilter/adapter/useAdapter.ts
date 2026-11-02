import { useEffect } from "react";
import {
  transformAzulPagination,
  transformTermFacets,
} from "../../../../../../../apis/azul/common/filterTransformer";
import { useToken } from "../../../../../../../hooks/authentication/token/useToken";
import { useExploreState } from "../../../../../../../hooks/useExploreState";
import { ExploreActionKind } from "../../../../../../../providers/exploreState";
import { useQuery } from "../query/useQuery";

/**
 * Fetches the entity list with server-side filtering, and processes the response into explore state.
 * Explore state is reset when the user signs in or out, as the list is fetched again.
 * @param entityListType - Entity list type of the explore page.
 */
export const useAdapter = (entityListType: string): void => {
  const { token } = useToken();
  const { exploreDispatch, exploreState } = useExploreState();
  const { filterState, tabValue } = exploreState;
  const { data, isFetching } = useQuery(tabValue);
  const isAuthenticated = Boolean(token);

  // Reset explore response when the user signs in or out; the query key changes, so the list is fetched again.
  useEffect(() => {
    exploreDispatch({
      payload: undefined,
      type: ExploreActionKind.ResetExploreResponse,
    });
  }, [exploreDispatch, isAuthenticated]);

  // Process explore response, for the explore page's entity list type only; data belongs to the selected entity list type.
  useEffect(() => {
    if (!data?.termFacets) return;
    if (tabValue !== entityListType) return;
    exploreDispatch({
      payload: {
        listItems: data.hits,
        loading: isFetching,
        paginationResponse: transformAzulPagination(data.pagination),
        selectCategories: transformTermFacets(data.termFacets, filterState),
      },
      type: ExploreActionKind.ProcessExploreResponse,
    });
  }, [
    data,
    entityListType,
    exploreDispatch,
    filterState,
    isFetching,
    tabValue,
  ]);
};
