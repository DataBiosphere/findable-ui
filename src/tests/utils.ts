import { screen } from "@testing-library/react";

/**
 * Retrieves a button by its name.
 * @param name - The name of the button.
 * @returns The button element.
 */
export function getButton(name: string): HTMLElement {
  return screen.getByRole("button", { name });
}

/**
 * Retrieves an input element by its label text.
 * @param text - The label text of the input element.
 * @returns The input element.
 */
export function getLabelText(text: string): HTMLInputElement {
  return screen.getByLabelText(text);
}

/**
 * Retrieves an element by its text content.
 * @param text - The text content of the element.
 * @returns The element.
 */
export function getText(text: string): HTMLElement {
  return screen.getByText(text);
}
