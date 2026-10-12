import { useCallback } from "react";
import { FILTER_SORT } from "../../../../common/filters/sort/config/types";
import { useConfig } from "../../../../hooks/useConfig";
import { useExploreState } from "../../../../hooks/useExploreState";
import { updateFilterSort } from "../../../../providers/exploreState/actions/updateFilterSort/dispatch";
import { UseUpdateFilterSort } from "./types";

/**
 * Provides the current filter sort and a callback that updates it in explore state.
 * @returns Whether filter sort is enabled, the current filter sort, and the change handler.
 */
export const useUpdateFilterSort = (): UseUpdateFilterSort => {
  const { config } = useConfig();
  const { exploreDispatch, exploreState } = useExploreState();
  const { filterSort } = exploreState;
  const enabled = Boolean(config.filterSort?.sortBy);

  const onFilterSortChange = useCallback(
    (filterSort: FILTER_SORT) => exploreDispatch(updateFilterSort(filterSort)),
    [exploreDispatch],
  );

  return { enabled, filterSort, onFilterSortChange };
};
