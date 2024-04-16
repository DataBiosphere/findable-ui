import { ColumnSort } from "@tanstack/react-table";
import {
  CategoryKey,
  CategoryValueKey,
  PaginationDirectionType,
  SelectCategory,
} from "../../../common/entities";
import {
  ENTITY_VIEW,
  ListItems,
  PaginationResponse,
  RelatedListItems,
} from "../../exploreState";

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
 * Paginate table payload.
 */
export type PaginateTablePayload = PaginationDirectionType;

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
export type UpdateColumnVisibilityPayload = Record<string, boolean>;

/**
 * Update filter payload.
 */
export interface UpdateFilterPayload {
  categoryKey: CategoryKey;
  selected: boolean;
  selectedValue: CategoryValueKey;
}

/**
 * Update sorting payload.
 */
export type UpdateSortingPayload = ColumnSort[];
