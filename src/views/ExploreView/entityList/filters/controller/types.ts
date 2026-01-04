import {
  FILTER_SORT,
  OnFilterSortChange,
} from "../../../../../common/filters/sort/config/types";
import { ReactNode } from "react";
import { OnFilterWithTracking } from "../hooks/UseFilters/types";
import { OnFilterReset } from "../../../../../common/tables/hooks/UseTableFilters/types";
import { EntityListTable } from "../../table/types";

export interface EntityListFilterController {
  actions: {
    onFilter: OnFilterWithTracking;
    onFilterReset: OnFilterReset;
    onFilterSortChange?: OnFilterSortChange;
  };
  filterSort: FILTER_SORT;
}

export interface FilterControllerProps<T = unknown> extends EntityListTable<T> {
  children: (props: EntityListFilterController) => ReactNode;
}
