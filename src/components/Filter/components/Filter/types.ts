import { ReactNode } from "react";
import { CategoryView } from "../../../../common/categories/views/types";
import { TrackFilterOpenedFunction } from "../../../../config/entities";
import { OnFilterFn } from "../../../../hooks/useCategoryFilter";
import { SURFACE_TYPE } from "../surfaces/types";

export interface FilterProps {
  categorySection?: string;
  categoryView: CategoryView;
  closeAncestor?: () => void;
  onFilter: OnFilterFn;
  surfaceType: SURFACE_TYPE;
  tags?: ReactNode; // e.g. filter tags
  trackFilterOpened?: TrackFilterOpenedFunction;
}
