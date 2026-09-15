import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { FilterLabel } from "../src/components/Filter/components/FilterLabel/filterLabel";
import { SURFACE_TYPE } from "../src/components/Filter/components/surfaces/types";

const LABEL = "Organism";
const PANEL_ID = "filter-panel";

/**
 * Renders a filter label in the given open state.
 * @param isOpen - Whether the filter panel is open.
 * @param panelId - Id of the panel the label controls.
 */
function renderFilterLabel(isOpen: boolean, panelId?: string): void {
  render(
    <FilterLabel
      isOpen={isOpen}
      label={LABEL}
      onClick={jest.fn()}
      panelId={panelId}
      surfaceType={SURFACE_TYPE.DRAWER}
    />,
  );
}

describe("FilterLabel", () => {
  // A disclosure: the panel expands in place, so aria-haspopup does not apply.
  it("should announce expanded state without declaring a popup", () => {
    renderFilterLabel(false, PANEL_ID);
    const label = screen.getByRole("button", { expanded: false, name: LABEL });
    expect(label.getAttribute("aria-haspopup")).toBeNull();
  });

  it("should reference the panel only once it is open", () => {
    renderFilterLabel(true, PANEL_ID);
    expect(
      screen
        .getByRole("button", { expanded: true, name: LABEL })
        .getAttribute("aria-controls"),
    ).toBe(PANEL_ID);
  });

  // panelId is optional so the component stays usable standalone.
  it("should still announce expanded state without a panel id", () => {
    renderFilterLabel(true);
    const label = screen.getByRole("button", { expanded: true, name: LABEL });
    expect(label.getAttribute("aria-controls")).toBeNull();
  });
});
