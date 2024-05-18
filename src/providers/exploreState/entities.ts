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
  savedFilterState: SelectedFilter[];
  savedSelectCategories: SelectCategory[];
  savedStateByCategoryValueKey?: SavedStateByCategoryValueKey;
}

export type EntityStateByCategoryGroupConfigKey = Map<
  CategoryGroupConfigKey,
  EntityState
>;

export type CategoryGroupConfigKey = CategoryGroupConfig["key"];

export interface SavedState {
  filters: SelectedFilter[];
  sorting?: ColumnSort[];
}

export type SavedStateByCategoryValueKey = Map<CategoryValueKey, SavedState>;
