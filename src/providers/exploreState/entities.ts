import { ColumnSort } from "@tanstack/react-table";
import {
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
  savedFilters?: SavedFilter[];
  savedSelectCategories: SelectCategory[];
}

export type EntityStateByCategoryGroupConfigKey = Map<
  CategoryGroupConfigKey,
  EntityState
>;

export type CategoryGroupConfigKey = CategoryGroupConfig["key"];
