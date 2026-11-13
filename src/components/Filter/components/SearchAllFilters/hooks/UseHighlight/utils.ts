import {
  IME_KEY_CODE,
  KEY,
  OPTION_SELECTOR,
  STEP,
} from "../../common/constants";
import {
  ITEM_TYPE,
  type SearchAllFiltersItem,
  type Step,
} from "../../common/entities";
import { getInput, getListbox, toggleValue } from "../../common/utils";
import type {
  AutocompleteKeyboardEvent,
  KeyDownParams,
  TabParams,
} from "./types";

/**
 * Returns the index of the value item with the given key.
 * @param items - List items.
 * @param key - Value item key, or null when nothing is highlighted.
 * @returns The value item's index, or -1 when the key is null or not in the list.
 */
export function findValueIndex(
  items: SearchAllFiltersItem[],
  key: string | null,
): number {
  if (key === null) return -1;
  return items.findIndex(
    (item) => item.type === ITEM_TYPE.VALUE && item.key === key,
  );
}

/**
 * Returns the index of the next value item in the given direction, skipping category headers, dividers and the no results item, and wrapping at either end. From no highlight (-1), the next value is the first and the previous value is the last.
 * @param items - List items.
 * @param index - Index of the highlighted item, or -1 when nothing is highlighted.
 * @param step - Direction to move.
 * @returns The next value item's index, or -1 when the list has no values.
 */
export function getNextValueIndex(
  items: SearchAllFiltersItem[],
  index: number,
  step: Step,
): number {
  const { length } = items;
  const start = index === -1 && step === STEP.PREVIOUS ? length : index;
  for (let i = 1; i <= length; i++) {
    const next = (((start + step * i) % length) + length) % length;
    if (items[next].type === ITEM_TYPE.VALUE) return next;
  }
  return -1;
}

/**
 * Returns the term Tab moves to from the search input: the highlighted term, or the list's first rendered term when nothing is highlighted or the highlighted term isn't rendered, e.g. after the list was scrolled away from it.
 * @param input - Search input.
 * @param optionId - Id of the highlighted term, or undefined when nothing is highlighted.
 * @returns The term, or null when the list has no terms.
 */
export function getTermToFocus(
  input: HTMLInputElement,
  optionId: string | undefined,
): HTMLElement | null {
  const highlightedTerm =
    optionId && input.ownerDocument.getElementById(optionId);
  if (highlightedTerm) return highlightedTerm;
  return getListbox(input)?.querySelector<HTMLElement>(OPTION_SELECTOR) ?? null;
}

/**
 * Handles a key down in the search all filters input while the list is open, and not while an input method is composing text: ArrowDown and ArrowUp move the highlight through the values, Enter toggles the highlighted value, and Tab moves focus to the highlighted term, or the first term, clearing the highlight. Tab leaves the search as usual when nothing is typed or highlighted, so an unfiltered list of every term doesn't hold it up, and when there are no terms. Mui's handling of ArrowDown, ArrowUp, PageDown and PageUp is skipped: Mui only knows the autocomplete's placeholder option. Mui does nothing on Enter, as it never highlights the placeholder and the input's text is the autocomplete's value.
 * @param event - Keyboard event.
 * @param params - Parameters.
 * @param params.highlightedIndex - Index of the highlighted item, or -1 when nothing is highlighted.
 * @param params.highlightedOptionId - Id of the highlighted item, or undefined when nothing is highlighted.
 * @param params.items - List items.
 * @param params.onFilter - Function invoked when a value is toggled.
 * @param params.open - Whether the list is open.
 * @param params.searchTerm - Search term.
 * @param params.setHighlightedKey - Function invoked with the key of the value to highlight, or null to clear the highlight.
 */
export function handleKeyDown(
  event: AutocompleteKeyboardEvent,
  {
    highlightedIndex,
    highlightedOptionId,
    items,
    onFilter,
    open,
    searchTerm,
    setHighlightedKey,
  }: KeyDownParams,
): void {
  if (!open || isComposing(event)) return;
  if (!(event.target instanceof HTMLInputElement)) return;
  switch (event.key) {
    case KEY.ARROW_DOWN:
    case KEY.ARROW_UP: {
      event.defaultMuiPrevented = true;
      event.preventDefault(); // Keeps the caret in place.
      const index = getNextValueIndex(
        items,
        highlightedIndex,
        event.key === KEY.ARROW_DOWN ? STEP.NEXT : STEP.PREVIOUS,
      );
      const item = items[index];
      if (item?.type === ITEM_TYPE.VALUE) setHighlightedKey(item.key);
      return;
    }
    case KEY.ENTER: {
      const item = items[highlightedIndex];
      if (item?.type !== ITEM_TYPE.VALUE) return;
      toggleValue(item, onFilter, searchTerm);
      return;
    }
    case KEY.PAGE_DOWN:
    case KEY.PAGE_UP:
      event.defaultMuiPrevented = true;
      return;
    case KEY.TAB:
      handleTab(event, event.target, {
        highlightedIndex,
        highlightedOptionId,
        searchTerm,
        setHighlightedKey,
      });
  }
}

/**
 * Handles Tab in the search input while the list is open: moves focus to the highlighted term, or the first term, clearing the highlight. Leaves Tab to the browser when nothing is typed or highlighted, so an unfiltered list of every term doesn't hold it up, when there are no terms, and for Shift+Tab.
 * @param event - Keyboard event.
 * @param input - Search input.
 * @param params - Parameters.
 * @param params.highlightedIndex - Index of the highlighted item, or -1 when nothing is highlighted.
 * @param params.highlightedOptionId - Id of the highlighted item, or undefined when nothing is highlighted.
 * @param params.searchTerm - Search term.
 * @param params.setHighlightedKey - Function invoked with null to clear the highlight.
 */
function handleTab(
  event: AutocompleteKeyboardEvent,
  input: HTMLInputElement,
  {
    highlightedIndex,
    highlightedOptionId,
    searchTerm,
    setHighlightedKey,
  }: TabParams,
): void {
  if (event.shiftKey) return;
  if (!searchTerm && highlightedIndex === -1) return;
  const term = getTermToFocus(input, highlightedOptionId);
  if (!term) return;
  event.preventDefault();
  setHighlightedKey(null);
  term.focus();
}

/**
 * Returns true if an input method (e.g. for Chinese or Japanese) is composing text, so the key belongs to it, e.g. Enter committing a candidate. Safari reports the key that ends composition with key code 229 rather than isComposing.
 * @param event - Keyboard event.
 * @returns True while composing.
 */
function isComposing(event: AutocompleteKeyboardEvent): boolean {
  return event.nativeEvent.isComposing || event.keyCode === IME_KEY_CODE;
}

/**
 * Points the autocomplete input's aria-activedescendant at the highlighted list item, or removes it when nothing is highlighted. Set directly on the element, as Mui sets the attribute directly while the list is open.
 * @param root - Autocomplete root element.
 * @param optionId - Id of the highlighted list item, or undefined when nothing is highlighted.
 */
export function setActiveDescendant(
  root: HTMLElement | null,
  optionId: string | undefined,
): void {
  const input = getInput(root);
  if (!input) return;
  if (optionId) input.setAttribute("aria-activedescendant", optionId);
  else input.removeAttribute("aria-activedescendant");
}
