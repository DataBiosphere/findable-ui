import { ColumnSort } from "@tanstack/react-table";
import {
  CategoryValueKey,
  SelectCategory,
  SelectCategoryView,
  SelectedFilter,
} from "../../common/entities";
import {
  CategoryConfig,
  CategoryGroup,
  CategoryGroupConfig,
  EntityPath,
  SavedFilter,
} from "../../config/entities";

export interface EntityPageState {
  categoryGroupConfigKey: CategoryGroupConfigKey;
  columnsVisibility: Record<string, boolean>;
  sorting: ColumnSort[];
}

export interface EntityPageStateMapper {
  [key: EntityPath]: EntityPageState;
}

export interface EntityState {
  categoryConfigs?: CategoryConfig[];
  categoryGroups?: CategoryGroup[];
  categoryViews: SelectCategoryView[];
  filterState: SelectedFilter[];
  savedFilterByCategoryValueKey?: SavedFilterByCategoryValueKey;
  savedFilterState: SelectedFilter[];
  savedSelectCategories: SelectCategory[];
}

export type EntityStateByCategoryGroupConfigKey = Map<
  CategoryGroupConfigKey,
  EntityState
>;

export type CategoryGroupConfigKey = CategoryGroupConfig["key"];

export interface EntityStateSavedFilter extends Omit<SavedFilter, "sort"> {
  sorting?: ColumnSort[];
}

export type SavedFilterByCategoryValueKey = Map<
  CategoryValueKey,
  EntityStateSavedFilter
>;
