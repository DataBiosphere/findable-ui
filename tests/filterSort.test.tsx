import { jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { FILTER_SORT } from "../src/common/filters/sort/config/types";
import { FilterSort } from "../src/components/Filter/components/controls/Controls/components/FilterSort/filterSort";
import { expectControlsResolveToMenu } from "./utils/ariaPopup";

const TRIGGER_NAME = "Sort filter values";

/**
 * Renders the sort trigger with sorting enabled, which is the only state in
 * which it renders at all.
 * @returns Filter sort under test.
 */
function renderFilterSort(): void {
  render(
    <FilterSort
      enabled
      filterSort={FILTER_SORT.ALPHA}
      onFilterSortChange={jest.fn()}
    />,
  );
}

describe("FilterSort", () => {
  // aria-haspopup is what tells a screen-reader user the control opens
  // something, rather than acting in place like a plain button.
  it("should declare that the trigger opens a menu", () => {
    renderFilterSort();
    expect(
      screen
        .getByRole("button", { name: TRIGGER_NAME })
        .getAttribute("aria-haspopup"),
    ).toBe("true");
  });

  it("should announce the trigger as collapsed while the menu is closed", () => {
    renderFilterSort();
    expect(
      screen.getByRole("button", { expanded: false, name: TRIGGER_NAME }),
    ).not.toBeNull();
  });

  // The menu only mounts once open, so the reference is held back until then
  // rather than pointing at an id that is not in the document.
  it("should reference the menu only once it is open", () => {
    renderFilterSort();
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });
    expect(trigger.getAttribute("aria-controls")).toBeNull();

    fireEvent.click(trigger);

    expectControlsResolveToMenu(trigger);
  });
});
