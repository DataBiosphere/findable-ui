import { screen } from "@testing-library/react";

/**
 * Returns anchor element by id.
 * @param id - ID.
 * @returns anchor element.
 */
export function getAnchorEl(id: string): HTMLAnchorElement {
  return screen.getByTestId(id) as HTMLAnchorElement;
}

/**
 * Returns button element by id.
 * @param id - ID.
 * @returns HTML button element.
 */
export function getButtonById(id: string): HTMLButtonElement {
  return screen.getByTestId(id);
}

/**
 * Returns class names of the given element.
 * @param element - Element.
 * @returns element class names.
 */
export function getClassNames(element?: Element | null): string | null {
  if (!element) return null;
  return element.getAttribute("class");
}

/**
 * Returns tag name of the given element.
 * @param element - Element.
 * @returns element tag name.
 */
export function getTagName(element?: Element | null): string | null {
  if (!element) return null;
  return element.tagName.toLowerCase();
}
