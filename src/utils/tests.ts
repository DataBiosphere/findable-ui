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
