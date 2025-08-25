import { useCallback } from "react";
import { FILTER_SORT } from "../../../../common/filters/sort/config/types";
import { useConfig } from "../../../../hooks/useConfig";
import { useExploreState } from "../../../../hooks/useExploreState";
import { updateFilterSort } from "../../../../providers/exploreState/actions/updateFilterSort/dispatch";
import { UseUpdateFilterSort } from "./types";

export const useUpdateFilterSort = (): UseUpdateFilterSort => {
  const { config } = useConfig();
  const { exploreDispatch, exploreState } = useExploreState();
  const { filterSort } = exploreState;
  const enabled = Boolean(config.filterSort?.sortBy);

  const onFilterSortChange = useCallback(
    (filterSort: FILTER_SORT) => exploreDispatch(updateFilterSort(filterSort)),
    [exploreDispatch]
  );

  return { enabled, filterSort, onFilterSortChange };
};
