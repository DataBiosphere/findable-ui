import { isUserMessage } from "../../../../../state/guards/guards";
import { Message } from "../../../../../state/types";
import { KEY } from "./constants";
import { KeyboardInputEvent, Refs, SetValue } from "./types";

/**
 * Extracts the text of user messages from a list of messages and returns them in reverse order.
 * @param messages - An array of Message objects to extract user messages from.
 * @returns An array of strings containing the text of user messages, ordered from most recent to oldest.
 */
export function getHistory(messages: Message[]): string[] {
  return messages
    .filter(isUserMessage)
    .map((message) => message.text)
    .reverse();
}

/**
 * Handles arrow up/down key presses to navigate through input history.
 * @param e - The keyboard event.
 * @param history - The history entries to navigate.
 * @param refs - Refs for draft text and history index.
 * @param setValue - Setter for the controlled input value.
 * @returns Void.
 */
export function handleArrowKey(
  e: KeyboardInputEvent,
  history: string[],
  refs: Refs,
  setValue: SetValue,
): void {
  const { draftRef, historyIndexRef } = refs;

  if (e.key === KEY.ARROW_DOWN && historyIndexRef.current === -1) {
    return;
  }

  if (historyIndexRef.current === -1) {
    draftRef.current = e.currentTarget.value;
  }

  const currentIndex = historyIndexRef.current;
  const newIndex =
    e.key === KEY.ARROW_UP
      ? Math.min(currentIndex + 1, history.length - 1)
      : Math.max(currentIndex - 1, -1);

  if (newIndex === -1) {
    setValue(draftRef.current);
    historyIndexRef.current = -1;
    return;
  }

  setValue(history[newIndex] || "");
  historyIndexRef.current = newIndex;
}

/**
 * Handles the Enter key press to submit the form, or allows newline on Shift+Enter.
 * @param e - The keyboard event.
 * @returns Void.
 */
export function handleEnterKey(e: KeyboardInputEvent): void {
  if (e.shiftKey) return;
  e.preventDefault();
  const formEl = e.currentTarget.form;
  formEl?.requestSubmit();
}

/**
 * Handles the Escape key press to clear the input and reset history navigation.
 * @param refs - Refs for draft text and history index.
 * @param setValue - Setter for the controlled input value.
 * @returns Void.
 */
export function handleEscapeKey(refs: Refs, setValue: SetValue): void {
  const { draftRef, historyIndexRef } = refs;
  setValue("");
  draftRef.current = "";
  historyIndexRef.current = -1;
}

/**
 * Handles the Tab key press to auto-fill the input with the placeholder.
 * @param e - The keyboard event.
 * @param setValue - Setter for the controlled input value.
 * @returns Void.
 */
export function handleTabKey(e: KeyboardInputEvent, setValue: SetValue): void {
  const inputEl = e.currentTarget;
  if (e.currentTarget.value) return;
  e.preventDefault();
  setValue(inputEl.placeholder);
}
