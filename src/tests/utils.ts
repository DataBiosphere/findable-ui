import { screen } from "@testing-library/react";
import { escapeRegExp } from "../common/utils";

/**
 * Retrieves a button by its name.
 * @param name - The name of the button.
 * @returns The button element.
 */
export function getButton<T extends HTMLElement = HTMLElement>(
  name: string | RegExp
): T {
  return screen.getByRole("button", { name });
}

/**
 * Retrieves an input element by its label text.
 * @param text - The label text of the input element.
 * @returns The input element.
 */
export function getLabelText<T extends HTMLElement = HTMLElement>(
  text: string
): T {
  return screen.getByLabelText(text);
}

/**
 * Returns regex that matches the start of the given text.
 * @param text - Text to match.
 * @returns RegExp.
 */
export function getStartsWithRegex(text: string): RegExp {
  return new RegExp(`^${escapeRegExp(text)}`);
}

/**
 * Retrieves an element by its role.
 * @param role - The role of the element.
 * @returns The element.
 */
export function getRole<T extends HTMLElement = HTMLElement>(role: string): T {
  return screen.getByRole(role);
}

/**
 * Retrieves an element by its text content.
 * @param text - The text content of the element.
 * @returns The element.
 */
export function getText<T extends HTMLElement = HTMLElement>(
  text: string | RegExp
): T {
  return screen.getByText(text);
}
