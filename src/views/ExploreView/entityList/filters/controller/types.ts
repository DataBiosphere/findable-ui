import { ReactNode } from "react";
import {
  FILTER_SORT,
  OnFilterSortChange,
} from "../../../../../common/filters/sort/config/types";
import { OnFilterReset } from "../../../../../common/tables/hooks/UseTableFilters/types";
import { EntityListTable } from "../../table/types";
import { OnFilterWithTracking } from "../hooks/UseFilters/types";
import { GetPresetTableState } from "../hooks/UsePreset/types";

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
  entityListType: string;
  getPresetTableState?: GetPresetTableState;
}
