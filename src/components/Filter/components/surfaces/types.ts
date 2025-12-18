import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { CategoryFilter } from "../Filters/filters";
import { FilterSortProps } from "../controls/Controls/components/FilterSort/types";

export interface SurfaceProps
  extends Pick<FilterSortProps, "filterSort" | "onFilterSortChange"> {
  categoryFilters: CategoryFilter[];
  count?: number;
  filterSortEnabled: boolean;
  onFilter: OnFilterFn;
}

export enum SURFACE_TYPE {
  DRAWER = "DRAWER",
  MENU = "MENU",
  POPPER_DRAWER = "POPPER_DRAWER",
  POPPER_MENU = "POPPER_MENU",
}
