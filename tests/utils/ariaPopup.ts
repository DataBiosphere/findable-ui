import { screen } from "@testing-library/react";

/**
 * Asserts a trigger is open and that its `aria-controls` resolves to the menu
 * itself. MUI puts a menu's root id on a presentational modal wrapper whose
 * first child is the backdrop, so asserting only that the id is present in the
 * document would pass while pointing at the wrong element.
 * @param trigger - The control that opens the menu.
 */
export function expectControlsResolveToMenu(trigger: HTMLElement): void {
  const menuId = trigger.getAttribute("aria-controls") as string;
  expect(menuId).toBeTruthy();
  expect(trigger.getAttribute("aria-expanded")).toBe("true");
  expect(document.getElementById(menuId)).toBe(
    screen.getByRole("menu", { hidden: true }),
  );
}
