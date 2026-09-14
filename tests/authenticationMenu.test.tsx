import { jest } from "@jest/globals";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
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
});
