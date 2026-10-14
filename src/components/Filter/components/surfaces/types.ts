import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { CategoryFilter } from "../Filters/filters";
import { FilterSortProps } from "../controls/Controls/components/FilterSort/types";

/**
 * Props passed to a filter surface: the category filters, filter count, filter handler and filter sort.
 */
export interface SurfaceProps extends Omit<FilterSortProps, "enabled"> {
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
