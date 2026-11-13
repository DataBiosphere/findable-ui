import { useCallback, useEffect, useId, useState } from "react";
import { getOptionId } from "../../common/utils";
import type {
  AutocompleteKeyboardEvent,
  UseHighlight,
  UseHighlightParams,
} from "./types";
import { findValueIndex, handleKeyDown, setActiveDescendant } from "./utils";

/**
 * Keyboard highlight of the search all filters values, following the listbox pattern: focus stays in the input, ArrowDown and ArrowUp move the highlight through the values, Enter toggles the highlighted value, and the input's aria-activedescendant points at it. Tab moves focus from the input to the highlighted term, or the first term, clearing the highlight.
 * The highlight follows its value when the list changes, and is cleared when the value leaves the list.
 * @param params - Parameters.
 * @param params.autocompleteRef - Ref to the autocomplete root element.
 * @param params.items - List items.
 * @param params.onFilter - Function invoked when a value is toggled.
 * @param params.open - Whether the list is open.
 * @param params.searchTerm - Search term.
 * @returns The highlighted item's index, the key down handler, the list item id prefix, and a function clearing the highlight.
 */
export const useHighlight = ({
  autocompleteRef,
  items,
  onFilter,
  open,
  searchTerm,
}: UseHighlightParams): UseHighlight => {
  const optionIdPrefix = useId();
  const [highlightedKey, setHighlightedKey] = useState<string | null>(null);
  const highlightedIndex = findValueIndex(items, highlightedKey);
  const highlightedOptionId =
    highlightedIndex === -1
      ? undefined
      : getOptionId(optionIdPrefix, highlightedIndex);

  // Points the input's aria-activedescendant at the highlighted item.
  useEffect(() => {
    setActiveDescendant(autocompleteRef.current, highlightedOptionId);
  }, [autocompleteRef, highlightedOptionId]);

  const onKeyDown = useCallback(
    (event: AutocompleteKeyboardEvent): void =>
      handleKeyDown(event, {
        highlightedIndex,
        highlightedOptionId,
        items,
        onFilter,
        open,
        searchTerm,
        setHighlightedKey,
      }),
    [highlightedIndex, highlightedOptionId, items, onFilter, open, searchTerm],
  );

  const resetHighlight = useCallback((): void => setHighlightedKey(null), []);

  return { highlightedIndex, onKeyDown, optionIdPrefix, resetHighlight };
};
