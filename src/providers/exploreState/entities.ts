import { ColumnSort } from "@tanstack/react-table";
import { SelectCategory, SelectedFilter } from "../../common/entities";
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
  categoryViews: SelectCategory[];
  filterState: SelectedFilter[];
}

export type EntityStateByCategoryGroupConfigKey = Map<
  CategoryGroupConfigKey,
  EntityState
>;

export type CategoryGroupConfigKey = CategoryGroupConfig["key"];
