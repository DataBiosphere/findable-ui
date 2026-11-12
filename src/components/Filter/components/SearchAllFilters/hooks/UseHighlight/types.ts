import type { KeyboardEvent, RefObject } from "react";
import type { OnFilterFn } from "../../../../../../hooks/useCategoryFilter";
import type { SearchAllFiltersItem } from "../../common/entities";

/**
 * Keyboard event handled by the Mui Autocomplete root; setting defaultMuiPrevented skips Mui's own handling.
 */
export type AutocompleteKeyboardEvent = KeyboardEvent<HTMLDivElement> & {
  defaultMuiPrevented?: boolean;
};

/**
 * Parameters of the search all filters key down handler.
 */
export interface KeyDownParams {
  highlightedIndex: number;
  highlightedOptionId: string | undefined;
  items: SearchAllFiltersItem[];
  onFilter: OnFilterFn;
  open: boolean;
  searchTerm: string;
  setHighlightedKey: (key: string | null) => void;
}

/**
 * Return value of the useHighlight hook.
 */
export interface UseHighlight {
  highlightedIndex: number;
  onKeyDown: (event: AutocompleteKeyboardEvent) => void;
  optionIdPrefix: string;
  resetHighlight: () => void;
}

/**
 * Parameters of the useHighlight hook.
 */
export interface UseHighlightParams {
  autocompleteRef: RefObject<HTMLDivElement | null>;
  items: SearchAllFiltersItem[];
  onFilter: OnFilterFn;
  open: boolean;
  searchTerm: string;
}
