import { fireEvent, render, screen } from "@testing-library/react";
import { NavigationMenu } from "../src/components/Layout/components/Header/components/Content/components/Navigation/components/NavigationMenu/navigationMenu";

const TRIGGER_NAME = "Datasets";

/**
 * Renders a header navigation dropdown.
 * @returns The dropdown's trigger.
 */
function renderNavigationMenu(): HTMLElement {
  render(
    <NavigationMenu
      menuItems={[{ label: "All", url: "/all" }]}
      menuLabel={TRIGGER_NAME}
    />,
  );
  return screen.getByRole("button", { name: TRIGGER_NAME });
}

describe("NavigationMenu", () => {
  it("should declare that the trigger opens a menu", () => {
    const trigger = renderNavigationMenu();
    expect(trigger.getAttribute("aria-haspopup")).toBe("true");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.getAttribute("aria-controls")).toBeNull();
  });

  // The Popper root is a role="tooltip" wrapper, so the reference has to land
  // on the MenuList inside it.
  it("should reference the menu list once it is open", () => {
    const trigger = renderNavigationMenu();

    fireEvent.click(trigger);

    const menuId = trigger.getAttribute("aria-controls") as string;
    expect(menuId).toBeTruthy();
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(document.getElementById(menuId)).toBe(screen.getByRole("menu"));
  });
});
