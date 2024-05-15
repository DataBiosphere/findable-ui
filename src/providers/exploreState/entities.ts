import { ColumnSort } from "@tanstack/react-table";
import { SelectCategory, SelectedFilter } from "../../common/entities";
import {
  CategoriesConfig,
  CategoryConfig,
  CategoryGroupConfig,
  EntityPath,
} from "../../config/entities";

export interface EntityPageState {
  categoriesConfigKey: CategoriesConfigKey;
  columnsVisibility: Record<string, boolean>;
  sorting: ColumnSort[];
}

export interface EntityPageStateMapper {
  [key: EntityPath]: EntityPageState;
}

export interface EntityState {
  categoryConfigs?: CategoryConfig[];
  categoryGroupConfigs?: CategoryGroupConfig[];
  categoryViews: SelectCategory[];
  filterState: SelectedFilter[];
}

export type EntityStateByCategoriesConfigKey = Map<
  CategoriesConfigKey,
  EntityState
>;

export type CategoriesConfigKey = CategoriesConfig["key"];
