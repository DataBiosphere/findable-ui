import { Dispatch, SetStateAction } from "react";
import { SelectCategoryValueView } from "../../../common/entities";

/**
 * Function invoked to update state for the search term.
 */
export type SetSearchTermFn = Dispatch<SetStateAction<string>>;

/**
 * Bounds of a matched substring.
 */
export interface FilterMenuSearchMatchRange {
  end: number;
  start: number;
}

/**
 * Score and location information for a match between a query and a string.
 */
export interface FilterMenuSearchStringMatch {
  ranges: FilterMenuSearchMatchRange[];
  score: number;
}

/**
 * Function that performs a match on a string.
 */
export type FilterMenuSearchMatchStringFn = (
  s: string
) => FilterMenuSearchStringMatch | null;

/**
 * Information about a match between a query and a SelectCategoryValueView.
 */
export interface FilterMenuSearchMatch {
  labelRanges?: FilterMenuSearchMatchRange[];
  score: number;
  value: SelectCategoryValueView;
}

/**
 * Function that performs a match on a SelectCategoryValueView.
 */
export type FilterMenuSearchSortMatchesFn = (
  values: SelectCategoryValueView[]
) => FilterMenuSearchMatch[];
