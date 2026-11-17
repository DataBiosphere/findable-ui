import { useEffect } from "react";
import { useCatalogParam } from "../../providers/catalog/hook";
import { useExploreOrigin } from "../../providers/exploreOrigin/hook";
import { useExploreState } from "../useExploreState";
import { useURLFilterParams } from "../useURLFilterParams/hook";

/**
 * Updates URL search params when the filter state changes: the selected catalog, the explore origin, and the filters.
 * Requires an ExploreOriginProvider.
 * @deprecated - Avoid using this hook if possible; we intend on using ExploreState actions to manage URL state.
 */
export const useUpdateURLSearchParams = (): void => {
  const { exploreState } = useExploreState();
  const catalog = useCatalogParam();
  const exploreOrigin = useExploreOrigin();
  const { updateFilterQueryString } = useURLFilterParams();
  const { filterState } = exploreState;

  /**
   * Update the URL search params when the filter state changes.
   */
  useEffect(() => {
    updateFilterQueryString(catalog, exploreOrigin, filterState);
  }, [catalog, exploreOrigin, filterState, updateFilterQueryString]);
};
