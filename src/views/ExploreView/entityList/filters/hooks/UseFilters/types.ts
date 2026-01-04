import {
  CategoryKey,
  CategoryValueKey,
} from "../../../../../../common/entities";
import { OnFilterFn } from "../../../../../../hooks/useCategoryFilter";
import { VIEW_KIND } from "../../../../../../common/categories/views/types";

export type OnFilterWithTracking = (
  fromSearchAll: boolean,
  ...args: Parameters<OnFilterFn>
) => void;

export interface ParsedFilterArgs {
  categoryKey: CategoryKey;
  categorySection: string;
  fromSearchAll: boolean;
  searchTerm: string;
  selected: boolean;
  value: CategoryValueKey;
  viewKind?: VIEW_KIND;
}

export interface UseFilters {
  onFilter: OnFilterWithTracking;
}
