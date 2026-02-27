import { KeyboardEvent } from "react";
import { isUserMessage } from "../../../../../../../views/ResearchView/state/guards/guards";
import { Message } from "../../../../../state/types";
import { Refs } from "./types";
import { KEY } from "./constants";

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
 */
export function handleArrowKey(
  e: KeyboardEvent<HTMLInputElement>,
  history: string[],
  refs: Refs,
): void {
  const { draftRef, historyIndexRef } = refs;
  const inputEl = e.currentTarget;

  if (e.key === KEY.ARROW_DOWN && historyIndexRef.current === -1) {
    return;
  }

  if (historyIndexRef.current === -1) {
    draftRef.current = inputEl.value;
  }

  const currentIndex = historyIndexRef.current;
  const newIndex =
    e.key === KEY.ARROW_UP
      ? Math.min(currentIndex + 1, history.length - 1)
      : Math.max(currentIndex - 1, -1);

  if (newIndex === -1) {
    inputEl.value = draftRef.current;
    historyIndexRef.current = -1;
    return;
  }

  inputEl.value = history[newIndex] || "";
  historyIndexRef.current = newIndex;
}

/**
 * Handles the Enter key press to submit the form, or allows newline on Shift+Enter.
 * @param e - The keyboard event.
 */
export function handleEnterKey(e: KeyboardEvent<HTMLInputElement>): void {
  if (e.shiftKey) return;
  e.preventDefault();
  const formEl = e.currentTarget.form;
  formEl?.requestSubmit();
}

/**
 * Handles the Escape key press to clear the input and reset history navigation.
 * @param e - The keyboard event.
 * @param refs - Refs for draft text and history index.
 */
export function handleEscapeKey(
  e: KeyboardEvent<HTMLInputElement>,
  refs: Refs,
): void {
  const { draftRef, historyIndexRef } = refs;
  const inputEl = e.currentTarget;
  inputEl.value = "";
  draftRef.current = "";
  historyIndexRef.current = -1;
}

/**
 * Handles the Tab key press to auto-fill the input with the placeholder.
 * @param e - The keyboard event.
 */
export function handleTabKey(e: KeyboardEvent<HTMLInputElement>): void {
  const inputEl = e.currentTarget;
  if (inputEl.value) return;
  e.preventDefault();
  inputEl.value = inputEl.placeholder;
}
