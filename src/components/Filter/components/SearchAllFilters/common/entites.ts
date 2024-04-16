import { SelectCategoryValueView } from "../../../../../common/entities";
import { FilterMenuSearchMatchRange } from "../../../common/entities";

export enum ITEM_TYPE {
  CATEGORY = "CATEGORY",
  DIVIDER = "DIVIDER",
  NO_RESULTS = "NO_RESULTS",
  VALUE = "VALUE",
}

export interface CategoryItem {
  categoryLabel: string;
  key: string;
  type: ITEM_TYPE.CATEGORY;
}

export interface DividerItem {
  type: ITEM_TYPE.DIVIDER;
}

export interface NoResultsItem {
  key: "noResults";
  type: ITEM_TYPE.NO_RESULTS;
}

export enum OVERFLOW_STYLE {
  HIDDEN = "hidden",
  NONE = "",
}

export interface ValueItem {
  categoryKey: string;
  key: string;
  matchRanges?: FilterMenuSearchMatchRange[];
  type: ITEM_TYPE.VALUE;
  value: SelectCategoryValueView;
}

export type SearchAllFiltersDynamicItem =
  | CategoryItem
  | ValueItem
  | NoResultsItem;

export type SearchAllFiltersItem = SearchAllFiltersDynamicItem | DividerItem;
