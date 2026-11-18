import { jest } from "@jest/globals";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createAppTheme } from "../src/theme/theme";
import { expectControlsResolveToMenu } from "./utils/ariaPopup";

const PROFILE = { email: "x@y.z", image: "", name: "Ada Lovelace" };
const TRIGGER_NAME = `Account menu for ${PROFILE.name}`;

jest.unstable_mockModule("../src/auth/hooks/useAuth", () => ({
  useAuth: jest.fn(() => ({ service: { requestLogout: jest.fn() } })),
}));

const { AuthenticationMenu } =
  await import("../src/components/Layout/components/Header/components/Content/components/Actions/components/Authentication/components/AuthenticationMenu/authenticationMenu");

// The menu's styled contents read theme.spacing, so they need the app theme.
/**
 * Renders the account menu trigger and the menu it opens.
 * @returns The menu's trigger.
 */
function renderAuthenticationMenu(): HTMLElement {
  render(
    <ThemeProvider theme={createAppTheme()}>
      <AuthenticationMenu profile={PROFILE} />
    </ThemeProvider>,
  );
  return screen.getByRole("button", { name: TRIGGER_NAME });
}

describe("AuthenticationMenu", () => {
  it("should declare that the trigger opens a menu", () => {
    const trigger = renderAuthenticationMenu();
    expect(trigger.getAttribute("aria-haspopup")).toBe("true");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.getAttribute("aria-controls")).toBeNull();
  });

  it("should reference the menu once it is open", () => {
    const trigger = renderAuthenticationMenu();

    fireEvent.click(trigger);

    expectControlsResolveToMenu(trigger);
  });

  // The signed-in summary is disabled: it does nothing when chosen, so focus
  // opens on Logout, the menu's first enabled item.
  it("should focus Logout when the menu opens", () => {
    const trigger = renderAuthenticationMenu();

    fireEvent.click(trigger);

    expect(document.activeElement).toBe(
      screen.getByRole("menuitem", { name: "Logout" }),
    );
  });

  it("should keep the signed-in summary in the menu, disabled", () => {
    const trigger = renderAuthenticationMenu();

    fireEvent.click(trigger);

    const summary = screen.getByRole("menuitem", {
      name: `You are signed in as: ${PROFILE.name}`,
    });
    expect(summary.getAttribute("aria-disabled")).toBe("true");
  });

  it("should skip the signed-in summary with the arrow keys", () => {
    const trigger = renderAuthenticationMenu();
    fireEvent.click(trigger);
    const logout = screen.getByRole("menuitem", { name: "Logout" });

    fireEvent.keyDown(logout, { key: "ArrowUp" });

    expect(document.activeElement).toBe(logout);
  });

  it.each(["Escape", "Tab"])(
    "should close on %s and return focus to the trigger",
    async (key) => {
      const trigger = renderAuthenticationMenu();
      // MUI's Menu returns focus to what held it on opening: the trigger, for a
      // keyboard user. A click alone doesn't move focus in jsdom.
      trigger.focus();
      fireEvent.click(trigger);

      fireEvent.keyDown(document.activeElement as Element, { key });

      expect(trigger.getAttribute("aria-expanded")).toBe("false");
      await waitFor(() => expect(document.activeElement).toBe(trigger));
    },
  );
});
