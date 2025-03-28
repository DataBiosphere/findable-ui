import {
  ColumnSort,
  GroupingState,
  RowSelectionState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  CategoryValueKey,
  SelectCategory,
  SelectCategoryView,
  SelectedFilter,
} from "../../common/entities";
import { RowPreviewState } from "../../components/Table/features/RowPreview/entities";
import {
  CategoryConfig,
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

export type EntityStateSavedFilter = SavedFilter;

// eslint-disable-next-line  @typescript-eslint/no-explicit-any -- TODO revisit when adding react query or similar
export type ListItem = any;

export type SavedFilterByCategoryValueKey = Map<
  CategoryValueKey,
  EntityStateSavedFilter
>;
