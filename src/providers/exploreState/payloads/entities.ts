import {
  ColumnSort,
  RowSelectionState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  CategoryKey,
  CategoryValueKey,
  PaginationDirectionType,
  SelectCategory,
  SelectedFilter,
} from "../../../common/entities";
import {
  ENTITY_VIEW,
  ListItems,
  PaginationResponse,
  RelatedListItems,
} from "../../exploreState";
import { ListItem } from "../entities";

/**
 * Apply saved filter payload.
 */
export interface ApplySavedFilterPayload {
  categoryKey: CategoryKey;
  selected: boolean;
  selectedValue: CategoryValueKey;
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
  selectCategories?: SelectCategory[];
}

/**
 * Process related response payload
 */
export interface ProcessRelatedResponsePayload {
  relatedListItems: RelatedListItems;
}

/**
 * Reset explore response payload.
 */
export type ResetExploreResponsePayload = undefined;

/**
 * Toggle entity view payload.
 */
export type ToggleEntityViewPayload = ENTITY_VIEW;

/**
 * Update column visibility payload.
 */
export type UpdateColumnVisibilityPayload = VisibilityState;

/**
 * Update entity filters payload.
 */
export interface UpdateEntityFiltersPayload {
  entityListType: string;
  filters: SelectedFilter[];
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
}

/**
 * Update row selection payload.
 */
export type UpdateRowSelectionPayload = RowSelectionState;

/**
 * Update sorting payload.
 */
export type UpdateSortingPayload = ColumnSort[];
