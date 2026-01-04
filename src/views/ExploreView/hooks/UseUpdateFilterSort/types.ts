import {
  FILTER_SORT,
  OnFilterSortChange,
} from "../../../../common/filters/sort/config/types";

export interface UseUpdateFilterSort {
  filterSort: FILTER_SORT;
  onFilterSortChange?: OnFilterSortChange;
}
