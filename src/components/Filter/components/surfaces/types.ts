import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { CategoryFilter } from "../Filters/filters";

export interface SurfaceProps {
  categoryFilters: CategoryFilter[];
  count?: number;
  onFilter: OnFilterFn;
}

export enum SURFACE_TYPE {
  DRAWER = "DRAWER",
  MENU = "MENU",
  POPPER_DRAWER = "POPPER_DRAWER",
  POPPER_MENU = "POPPER_MENU",
}
