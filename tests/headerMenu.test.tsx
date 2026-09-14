import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";

const TRIGGER_NAME = "Open menu";

// The open dialog renders the header toolbar, which reaches for the router.
jest.unstable_mockModule("next/router", () => ({
  ...jest.requireActual<typeof import("next/router")>("next/router"),
  default: { push: jest.fn() },
  useRouter: jest.fn(() => ({ asPath: "/", push: jest.fn() })),
}));

const { Menu } =
  await import("../src/components/Layout/components/Header/components/Content/components/Actions/components/Menu/menu");

/**
 * Renders the collapsed header's menu trigger and the dialog it opens.
 * @param open - Whether the dialog is open.
 */
function renderMenu(open: boolean): void {
  render(
    <Menu
      closeMenu={jest.fn()}
      headerProps={{ navigation: [undefined, undefined, undefined] }}
      isMenuIn
      open={open}
      openMenu={jest.fn()}
    />,
  );
}

describe("Header Menu", () => {
  // The trigger opens a dialog rather than a menu, so aria-haspopup has to say
  // so — "true" would announce the wrong kind of surface.
  it("should declare that the trigger opens a dialog", () => {
    renderMenu(false);
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  // MUI puts role="dialog" and the accessible name on the paper, not on the
  // modal root that Dialog's own props land on, so this guards the wiring.
  it("should name the dialog and point the trigger at it", () => {
    renderMenu(true);
    const dialog = screen.getByRole("dialog", { name: "Menu" });
    // The open modal aria-hides the rest of the page, the trigger included.
    const trigger = screen.getByRole("button", {
      hidden: true,
      name: TRIGGER_NAME,
    });
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(trigger.getAttribute("aria-controls")).toBe(dialog.id);
  });
});
