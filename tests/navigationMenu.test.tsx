import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { NavigationMenu } from "../src/components/Layout/components/Header/components/Content/components/Navigation/components/NavigationMenu/navigationMenu";
import { createAppTheme } from "../src/theme/theme";

const TRIGGER_NAME = "Datasets";

const SUBMENU_NAME = "More";

// External URLs render a plain anchor, so choosing an item needs no router.
const MENU_ITEMS = [
  { label: "All", url: "https://example.org/all" },
  { label: "Other", url: "https://example.org/other" },
  {
    label: SUBMENU_NAME,
    menuItems: [
      { label: "Team", url: "https://example.org/team" },
      { label: "FAQ", url: "https://example.org/faq" },
    ],
    url: "",
  },
];

/**
 * Returns the menu item with the given name.
 * @param name - Menu item name.
 * @returns The menu item.
 */
function getMenuItem(name: string): HTMLElement {
  return screen.getByRole("menuitem", { name });
}

/**
 * Opens the menu, then opens the submenu from its item with Enter.
 * @param trigger - The menu's trigger.
 */
function openSubMenu(trigger: HTMLElement): void {
  fireEvent.click(trigger);
  pressKey("ArrowDown");
  pressKey("ArrowDown");
  pressKey("Enter");
}

/**
 * Presses a key on the focused element.
 * @param key - Key.
 * @returns False when a handler prevented the key's default action.
 */
function pressKey(key: string): boolean {
  return fireEvent.keyDown(document.activeElement as Element, { key });
}

/**
 * Renders a header navigation dropdown. Its styles read the app theme.
 * @returns The dropdown's trigger.
 */
function renderNavigationMenu(): HTMLElement {
  render(
    <ThemeProvider theme={createAppTheme()}>
      <NavigationMenu menuItems={MENU_ITEMS} menuLabel={TRIGGER_NAME} />
    </ThemeProvider>,
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

  it("should focus the first item when the menu opens", () => {
    const trigger = renderNavigationMenu();

    fireEvent.click(trigger);

    expect(document.activeElement).toBe(getMenuItem("All"));
  });

  it("should move focus between items with the arrow keys", () => {
    const trigger = renderNavigationMenu();
    fireEvent.click(trigger);

    pressKey("ArrowDown");
    expect(document.activeElement).toBe(getMenuItem("Other"));

    pressKey("ArrowUp");
    expect(document.activeElement).toBe(getMenuItem("All"));
  });

  it.each(["Escape", "Tab"])(
    "should close on %s and return focus to the trigger",
    (key) => {
      const trigger = renderNavigationMenu();
      fireEvent.click(trigger);

      pressKey(key);

      expect(trigger.getAttribute("aria-expanded")).toBe("false");
      expect(document.activeElement).toBe(trigger);
    },
  );

  // The browser's own Tab would otherwise move focus on from the trigger the
  // menu just returned it to.
  it("should keep focus on the trigger when Tab closes the menu", () => {
    const trigger = renderNavigationMenu();
    fireEvent.click(trigger);

    expect(pressKey("Tab")).toBe(false);
  });

  it("should close when an item is chosen and return focus to the trigger", () => {
    const trigger = renderNavigationMenu();
    fireEvent.click(trigger);
    // jsdom can't navigate; the menu's own click handling still runs.
    document.addEventListener("click", (e) => e.preventDefault(), {
      capture: true,
      once: true,
    });

    fireEvent.click(getMenuItem("Other"));

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(trigger);
  });

  // The parent menu's arrow keys focus the submenu's item, not the nav button
  // inside it, so the item opens the submenu and describes it.
  it("should open a submenu from its item with Enter and focus its first item", () => {
    const trigger = renderNavigationMenu();

    openSubMenu(trigger);

    const subMenuItem = getMenuItem(SUBMENU_NAME);
    expect(subMenuItem.getAttribute("aria-haspopup")).toBe("true");
    expect(subMenuItem.getAttribute("aria-expanded")).toBe("true");
    expect(document.activeElement).toBe(getMenuItem("Team"));
  });

  it("should move focus within a submenu without moving it in the parent menu", () => {
    const trigger = renderNavigationMenu();
    openSubMenu(trigger);

    pressKey("ArrowDown");

    expect(document.activeElement).toBe(getMenuItem("FAQ"));
  });

  it("should close only the submenu on Escape and return focus to its item", () => {
    const trigger = renderNavigationMenu();
    openSubMenu(trigger);

    pressKey("Escape");

    const subMenuItem = getMenuItem(SUBMENU_NAME);
    expect(subMenuItem.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(document.activeElement).toBe(subMenuItem);
  });

  // A click in the submenu reaches its item through the portal; it must not
  // reopen the submenu the chosen item just closed.
  it("should close every menu when a submenu item is chosen", () => {
    const trigger = renderNavigationMenu();
    openSubMenu(trigger);
    const subMenuItem = getMenuItem(SUBMENU_NAME);
    document.addEventListener("click", (e) => e.preventDefault(), {
      capture: true,
      once: true,
    });

    fireEvent.click(getMenuItem("Team"));

    expect(subMenuItem.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(trigger);
  });

  it("should close every menu on Tab in a submenu and return focus to the trigger", () => {
    const trigger = renderNavigationMenu();
    openSubMenu(trigger);

    pressKey("Tab");

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(trigger);
  });

  it("should take the submenu's nav button out of the tab order", () => {
    const trigger = renderNavigationMenu();
    fireEvent.click(trigger);

    const subMenuButton = screen.getByRole("button", { name: SUBMENU_NAME });
    expect(subMenuButton.getAttribute("tabindex")).toBe("-1");
    expect(subMenuButton.hasAttribute("aria-haspopup")).toBe(false);
  });
});
