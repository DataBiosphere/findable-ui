import {
  ColumnSort,
  GroupingState,
  RowSelectionState,
  VisibilityState,
} from "@tanstack/react-table";
import { CategoryConfig } from "../../common/categories/config/types";
import { CategoryView } from "../../common/categories/views/types";
import {
  CategoryValueKey,
  SelectCategory,
  SelectedFilter,
} from "../../common/entities";
import { RowPreviewState } from "../../components/Table/features/RowPreview/entities";
import {
  CategoryGroup,
  CategoryGroupConfig,
  EntityPath,
  SavedFilter,
} from "../../config/entities";

export interface EntityPageState {
  categoryGroupConfigKey: CategoryGroupConfigKey;
  columnVisibility: VisibilityState;
  enableRowSelection: boolean;
  grouping: GroupingState;
  rowPreview: RowPreviewState;
  rowSelection: RowSelectionState;
  sorting: ColumnSort[];
}

export interface EntityPageStateMapper {
  [key: EntityPath]: EntityPageState;
}

export interface EntityState {
  categoryConfigs?: CategoryConfig[];
  categoryGroups?: CategoryGroup[];
  categoryViews: CategoryView[];
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

export type EntityStateSavedFilter = SavedFilter;

// eslint-disable-next-line  @typescript-eslint/no-explicit-any -- TODO revisit when adding react query or similar
export type ListItem = any;

export type SavedFilterByCategoryValueKey = Map<
  CategoryValueKey,
  EntityStateSavedFilter
>;
