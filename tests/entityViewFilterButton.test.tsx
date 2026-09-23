import { jest } from "@jest/globals";
import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { DrawerProvider } from "../src/components/common/Drawer/provider/provider";
import { createAppTheme } from "../src/theme/theme";

jest.unstable_mockModule("../src/hooks/useExploreState", () => ({
  useExploreState: jest.fn(() => ({ exploreState: { filterCount: 0 } })),
}));

const { FilterButton } =
  await import("../src/components/Index/components/EntityView/components/controls/FilterButton/filterButton");

const TRIGGER_NAME = /Filter/;

// The button's styles read theme breakpoints, so it needs the app theme.
/**
 * Renders the entity view filter button under a drawer provider.
 * @param disabled - Whether the button is disabled.
 * @returns The rendered button.
 */
function renderFilterButton(disabled = false): HTMLElement {
  render(
    <ThemeProvider theme={createAppTheme()}>
      <DrawerProvider>
        <FilterButton disabled={disabled} />
      </DrawerProvider>
    </ThemeProvider>,
  );
  return screen.getByRole("button", { name: TRIGGER_NAME });
}

describe("EntityView FilterButton", () => {
  // The drawer it opens is a dialog, so aria-haspopup has to say "dialog".
  it("should declare that the trigger opens a dialog", () => {
    const trigger = renderFilterButton();
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  // A consumer can disable the trigger through ButtonProps. It then cannot open
  // the drawer, so it announces no expanded state or controlled surface.
  it("should omit expanded state while the trigger is disabled", () => {
    const trigger = renderFilterButton(true);
    expect(trigger.hasAttribute("disabled")).toBe(true);
    expect(trigger.hasAttribute("aria-expanded")).toBe(false);
    expect(trigger.hasAttribute("aria-controls")).toBe(false);
    expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
  });
});
