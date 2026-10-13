import { FILTER_SORT } from "../../../../common/filters/sort/config/types";

/**
 * Return type for the useUpdateFilterSort hook.
 */
export interface UseUpdateFilterSort {
  enabled: boolean;
  filterSort: FILTER_SORT;
  onFilterSortChange: (filterSort: FILTER_SORT) => void;
}
