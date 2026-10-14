import { SelectCategoryValueView } from "../../../../../common/entities";
import { FilterMenuSearchMatchRange } from "../../../common/entities";

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
 * Search all filters list item shown when the list has no values to show.
 */
export interface NoResultsItem {
  key: "noResults";
  type: ITEM_TYPE.NO_RESULTS;
}

export enum OVERFLOW_STYLE {
  HIDDEN = "hidden",
  NONE = "",
}

/**
 * Search all filters list item for a category value matching the search, with its matched label ranges when the label matched.
 */
export interface ValueItem {
  categoryKey: string;
  key: string;
  matchRanges?: FilterMenuSearchMatchRange[];
  type: ITEM_TYPE.VALUE;
  value: SelectCategoryValueView;
}

export type SearchAllFiltersDynamicItem =
  CategoryItem | ValueItem | NoResultsItem;

export type SearchAllFiltersItem = SearchAllFiltersDynamicItem | DividerItem;
