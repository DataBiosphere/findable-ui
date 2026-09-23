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
 * @param disabled - Whether the label is disabled.
 */
function renderFilterLabel(
  isOpen: boolean,
  panelId?: string,
  disabled = false,
): void {
  render(
    <FilterLabel
      disabled={disabled}
      isOpen={isOpen}
      label={LABEL}
      onClick={jest.fn()}
      panelId={panelId}
      surfaceType={SURFACE_TYPE.DRAWER}
    />,
  );
}

describe("FilterLabel", () => {
  // The panel is a Popper in a portal behind a backdrop — a floating dialog,
  // not a region expanding in place — so the label has to declare a popup.
  it("should declare that the label opens a dialog", () => {
    renderFilterLabel(false, PANEL_ID);
    const label = screen.getByRole("button", { expanded: false, name: LABEL });
    expect(label.getAttribute("aria-haspopup")).toBe("dialog");
  });

  // A disabled label cannot open the panel, so no expanded state is offered;
  // this matches how CollapsableCell treats its disabled toggle.
  it("should omit expanded state and controls while disabled", () => {
    renderFilterLabel(true, PANEL_ID, true);
    const label = screen.getByRole("button", { name: LABEL });
    expect(label.hasAttribute("aria-expanded")).toBe(false);
    expect(label.hasAttribute("aria-controls")).toBe(false);
    expect(label.getAttribute("aria-haspopup")).toBe("dialog");
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
