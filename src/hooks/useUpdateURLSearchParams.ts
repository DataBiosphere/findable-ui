import { useEffect } from "react";
import { useCatalogParam } from "../providers/catalog/hook";
import { useExploreState } from "./useExploreState";
import { useURLFilterParams } from "./useURLFilterParams";

/**
 * Updates URL search params when the filter state changes.
 * @deprecated - Avoid using this hook if possible; we intend on using ExploreState actions to manage URL state.
 */
export const useUpdateURLSearchParams = (): void => {
  const { exploreState } = useExploreState();
  const catalog = useCatalogParam();
  const { updateFilterQueryString } = useURLFilterParams();
  const { filterState } = exploreState;

  /**
   * Update the URL search params when the filter state changes.
   */
  useEffect(() => {
    updateFilterQueryString(catalog, filterState);
  }, [catalog, filterState, updateFilterQueryString]);
};
