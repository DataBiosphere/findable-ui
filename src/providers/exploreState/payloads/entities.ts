import {
  ColumnSort,
  GroupingState,
  RowSelectionState,
} from "@tanstack/react-table";
import { Category } from "../../../common/categories/models/types";
import { VIEW_KIND } from "../../../common/categories/views/types";
import {
  CategoryKey,
  CategoryValueKey,
  PaginationDirectionType,
  SelectedFilter,
} from "../../../common/entities";
import { RowPreviewState } from "../../../components/Table/features/RowPreview/entities";
import { ListItems, PaginationResponse } from "../../exploreState";
import { ListItem } from "../entities";

/**
 * Apply saved filter payload.
 */
export interface ApplySavedFilterPayload {
  categoryKey: CategoryKey;
  selected: boolean;
  selectedValue: CategoryValueKey;
  viewKind?: VIEW_KIND; // viewKind is included here because this payload shares a dispatch with UpdateFilter.
}

/**
 * Paginate table payload.
 */
export type PaginateTablePayload = PaginationDirectionType;

/**
 * Patch explore response payload.
 */
export interface PatchExploreResponsePayload {
  listItemKey: keyof ListItem;
  updatedListItems: ListItems;
}

/**
 * Process explore response payload.
 */
export interface ProcessExploreResponsePayload {
  listItems: ListItems;
  loading: boolean;
  paginationResponse: PaginationResponse;
  selectCategories?: Category[];
}

/**
 * Reset explore response payload.
 */
export type ResetExploreResponsePayload = undefined;

/**
 * Update entity filters payload.
 */
export interface UpdateEntityFiltersPayload {
  entityListType: string;
  filters: SelectedFilter[];
  grouping?: GroupingState;
  sorting?: ColumnSort[];
}
/**
 * Update entity view access payload.
 */
export interface UpdateEntityViewAccessPayload {
  canEdit: boolean;
}

/**
 * Update filter payload.
 */
export interface UpdateFilterPayload {
  categoryKey: CategoryKey;
  selected: boolean;
  selectedValue: CategoryValueKey;
  viewKind?: VIEW_KIND;
}

/**
 * Update row preview payload.
 */
export type UpdateRowPreviewPayload = RowPreviewState;

/**
 * Update row selection payload.
 */
export type UpdateRowSelectionPayload = RowSelectionState;

/**
 * Update sorting payload.
 */
export type UpdateSortingPayload = ColumnSort[];
