import type { FocusEvent, KeyboardEvent } from "react";
import { getKeyDownHandler } from "../../../../common/focus";
import {
  CLOSE_REASON,
  KEY,
  OPTION_SELECTOR,
  STEP,
} from "../../common/constants";
import type { OnCloseFn } from "../../common/entities";
import { getInput } from "../../common/utils";

/**
 * Moves focus to the term after or before the focused one, as ArrowDown and ArrowUp do. ArrowUp from the first term returns to the search input, leaving the list open; ArrowDown from the last term stays there. Only rendered terms count: the virtualized list renders the terms either side of the one in view.
 * @param event - Key down event on the list's paper.
 * @param input - Search input.
 */
function focusAdjacentTerm(
  event: KeyboardEvent<HTMLElement>,
  input: HTMLInputElement,
): void {
  const terms = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>(OPTION_SELECTOR),
  );
  const index = terms.findIndex((term) => term === event.target);
  if (index === -1) return;
  event.preventDefault(); // Stops the list scrolling.
  const step = event.key === KEY.ARROW_DOWN ? STEP.NEXT : STEP.PREVIOUS;
  const term = terms[index + step];
  if (term) term.focus();
  else if (step === STEP.PREVIOUS) input.focus({ preventScroll: true });
}

/**
 * Handles focus leaving a term in the list: closes the list, keeping the search, unless focus moves to another term or back to the search.
 * @param event - Blur event on the list's paper.
 * @param root - Autocomplete root element.
 * @param onClose - Function to close the list.
 */
export function handleListBlur(
  event: FocusEvent<HTMLElement>,
  root: HTMLElement | null,
  onClose: OnCloseFn,
): void {
  const { currentTarget, relatedTarget } = event;
  if (
    relatedTarget instanceof Node &&
    (currentTarget.contains(relatedTarget) || root?.contains(relatedTarget))
  )
    return;
  onClose(event, CLOSE_REASON.BLUR);
}

/**
 * Handles a key down on a term in the list, as if the list sat right after the search input in the tab order.
 * ArrowDown and ArrowUp move to the next and previous term (see focusAdjacentTerm).
 * Escape closes the list and returns focus to the input, clearing the search as Escape in the input does.
 * Tab from the last term moves on to what follows the input, and Shift+Tab from the first term returns to the input. Neither closes the list itself: focus moving on closes it, keeping the search (see handleListBlur), and focus returning to the input leaves it open.
 * @param event - Key down event on the list's paper.
 * @param root - Autocomplete root element.
 * @param onClose - Function to close the list.
 */
export function handleListKeyDown(
  event: KeyboardEvent<HTMLElement>,
  root: HTMLElement | null,
  onClose: OnCloseFn,
): void {
  const input = getInput(root);
  if (!input) return;
  switch (event.key) {
    case KEY.ARROW_DOWN:
    case KEY.ARROW_UP:
      focusAdjacentTerm(event, input);
      return;
    case KEY.ESCAPE:
      event.preventDefault();
      event.stopPropagation(); // Keeps a dialog or drawer around the search open.
      // Focused while the list is still open, so opening on focus leaves it to close.
      input.focus({ preventScroll: true });
      onClose(event, CLOSE_REASON.ESCAPE);
      return;
    case KEY.TAB:
      getKeyDownHandler(input, leaveToBlur)(event);
  }
}

/**
 * Leaves closing the list to focus: Tab off the list's edges closes it only when focus moves on (see handleListBlur).
 */
function leaveToBlur(): void {
  return;
}
