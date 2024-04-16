import { useEffect } from "react";
import { useExploreState } from "./useExploreState";
import { useURLFilterParams } from "./useURLFilterParams";

/**
 * Updates URL search params when the filter state changes.
 */
export const useUpdateURLSearchParams = (): void => {
  const { exploreState } = useExploreState();
  const { updateFilterQueryString } = useURLFilterParams();
  const { catalogState, filterState } = exploreState;

  /**
   * Update the URL search params when the filter state changes.
   */
  useEffect(() => {
    updateFilterQueryString(catalogState, filterState);
  }, [catalogState, filterState, updateFilterQueryString]);
};
