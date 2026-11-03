import { useEffect } from "react";
import { useToken } from "../../../../../../../hooks/authentication/token/useToken";
import { useExploreState } from "../../../../../../../hooks/useExploreState";
import { ExploreActionKind } from "../../../../../../../providers/exploreState";
import { useQuery } from "../query/useQuery";
import { buildExploreResponse } from "./utils";

/**
 * Fetches every entity in the entity list for client-side filtering, and processes the response into explore state.
 * Explore state is reset when the user signs in or out, as the list is fetched again.
 * @param entityListType - Entity list type of the explore page.
 */
export const useAdapter = (entityListType: string): void => {
  const { token } = useToken();
  const { exploreDispatch, exploreState } = useExploreState();
  const { tabValue } = exploreState;
  const { data } = useQuery(tabValue);
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
    if (!data) return;
    if (tabValue !== entityListType) return;
    exploreDispatch({
      payload: buildExploreResponse(data),
      type: ExploreActionKind.ProcessExploreResponse,
    });
  }, [data, entityListType, exploreDispatch, tabValue]);
};
