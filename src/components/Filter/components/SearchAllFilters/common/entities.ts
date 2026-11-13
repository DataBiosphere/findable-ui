import type { AutocompleteCloseReason, AutocompleteProps } from "@mui/material";
import type {
  FocusEventHandler,
  KeyboardEventHandler,
  SyntheticEvent,
} from "react";
import { SelectCategoryValueView } from "../../../../../common/entities";
import { FilterMenuSearchMatchRange } from "../../../common/entities";
import type { STEP } from "./constants";

/**
 * Search all filters autocomplete slot props.
 */
export type AutocompleteSlotProps = AutocompleteProps<
  string,
  false,
  false,
  true
>["slotProps"];

export enum ITEM_TYPE {
  CATEGORY = "CATEGORY",
  DIVIDER = "DIVIDER",
  NO_RESULTS = "NO_RESULTS",
  VALUE = "VALUE",
}

/**
 * Search all filters list item heading a category's values.
 */
export interface CategoryItem {
  categoryLabel: string;
  key: string;
  type: ITEM_TYPE.CATEGORY;
}

/**
 * Search all filters list item separating categories.
 */
export interface DividerItem {
  type: ITEM_TYPE.DIVIDER;
}

/**
 * Props of the list's popper and paper: the popper's container, and the paper's blur and key down handlers for focus in the list.
 */
export interface ListSlotProps {
  container: HTMLElement | null;
  onBlur: FocusEventHandler<HTMLElement>;
  onKeyDown: KeyboardEventHandler<HTMLElement>;
}

/**
 * Search all filters list item shown when the list has no values to show.
 */
export interface NoResultsItem {
  key: "noResults";
  type: ITEM_TYPE.NO_RESULTS;
}

/**
 * Function closing the list, with the event and reason that closed it.
 */
export type OnCloseFn = (
  event?: SyntheticEvent,
  reason?: AutocompleteCloseReason,
) => void;

export enum OVERFLOW_STYLE {
  HIDDEN = "hidden",
  NONE = "",
}

/**
 * Search all filters list item for a category value matching the search, with its category's label, and its matched label ranges when the label matched.
 */
export interface ValueItem {
  categoryKey: string;
  categoryLabel: string;
  key: string;
  matchRanges?: FilterMenuSearchMatchRange[];
  type: ITEM_TYPE.VALUE;
  value: SelectCategoryValueView;
}

export type SearchAllFiltersDynamicItem =
  CategoryItem | ValueItem | NoResultsItem;

export type SearchAllFiltersItem = SearchAllFiltersDynamicItem | DividerItem;

export type Step = (typeof STEP)[keyof typeof STEP];
