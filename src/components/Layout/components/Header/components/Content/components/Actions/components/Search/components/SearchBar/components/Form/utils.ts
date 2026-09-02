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
