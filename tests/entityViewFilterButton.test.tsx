import { jest } from "@jest/globals";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { DrawerProvider } from "../src/components/common/Drawer/provider/provider";
import { createAppTheme } from "../src/theme/theme";

// ExploreView only renders the sidebar drawer when there are categories, so the
// button's popup ARIA depends on them; each test sets them as it needs.
let categoryViews: unknown[] = [{ key: "category" }];

jest.unstable_mockModule("../src/hooks/useExploreState", () => ({
  useExploreState: jest.fn(() => ({
    exploreState: { categoryViews, filterCount: 0 },
  })),
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
  beforeEach(() => {
    categoryViews = [{ key: "category" }];
  });

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

  // With no categories ExploreView renders no sidebar, so the button opens
  // nothing: it must not announce a dialog, nor point aria-controls at an id
  // that is not in the document once pressed.
  it("should announce no popup when there is no drawer to open", () => {
    categoryViews = [];
    const trigger = renderFilterButton();

    fireEvent.click(trigger);

    expect(trigger.hasAttribute("aria-haspopup")).toBe(false);
    expect(trigger.hasAttribute("aria-expanded")).toBe(false);
    expect(trigger.hasAttribute("aria-controls")).toBe(false);
  });

  it("should reference the drawer once pressed when there is one", () => {
    const trigger = renderFilterButton();

    fireEvent.click(trigger);

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(trigger.getAttribute("aria-controls")).toBeTruthy();
  });
});
