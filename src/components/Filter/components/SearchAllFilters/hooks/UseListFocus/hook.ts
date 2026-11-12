import { type FocusEvent, type KeyboardEvent, useCallback } from "react";
import type { UseListFocus, UseListFocusParams } from "./types";
import { handleListBlur, handleListKeyDown } from "./utils";

/**
 * Keyboard focus in the search all filters list, whose terms sit in the tab order right after the search input: Tab and Shift+Tab move through the terms and on from the list's edges, ArrowDown and ArrowUp move through the terms, Escape returns to the input, and focus leaving the list and the input closes the list, keeping the search.
 * @param params - Parameters.
 * @param params.autocompleteRef - Ref to the autocomplete root element.
 * @param params.onClose - Function to close the list.
 * @returns Blur and key down handlers, for the list's paper.
 */
export const useListFocus = ({
  autocompleteRef,
  onClose,
}: UseListFocusParams): UseListFocus => {
  const onListBlur = useCallback(
    (event: FocusEvent<HTMLElement>): void =>
      handleListBlur(event, autocompleteRef.current, onClose),
    [autocompleteRef, onClose],
  );

  const onListKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>): void =>
      handleListKeyDown(event, autocompleteRef.current, onClose),
    [autocompleteRef, onClose],
  );

  return { onListBlur, onListKeyDown };
};
