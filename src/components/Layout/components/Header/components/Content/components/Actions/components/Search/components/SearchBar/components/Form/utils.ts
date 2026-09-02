import { FormEvent } from "react";
import { FIELD_NAME } from "./constants";

/**
 * Clears the search input and returns focus to it.
 * The input is uncontrolled, so the value is cleared on the element itself.
 * @param input - Search input element.
 */
export function clearInput(input: HTMLInputElement | null): void {
  if (!input) return;
  input.value = "";
  input.focus();
}

/**
 * Returns the trimmed search term from the submitted form.
 * Reads the value straight off the form element, so the input stays uncontrolled.
 * @param e - Form event.
 * @returns The search term, or an empty string when the field is blank or absent.
 */
export function getSearchTerm(e: FormEvent<HTMLFormElement>): string {
  const value = new FormData(e.currentTarget).get(FIELD_NAME.SEARCH_TERM);
  return value?.toString().trim() ?? "";
}
