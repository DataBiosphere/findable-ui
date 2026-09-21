import { jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { FILTER_SORT } from "../src/common/filters/sort/config/types";
import { Drawer } from "../src/components/Filter/components/surfaces/drawer/Drawer/drawer";

// The SurfaceProps the adapter hands every surface. They are not
// MuiDrawerProps, so they must never reach the DOM.
const SURFACE_ONLY_PROPS = [
  "filterSort",
  "filterSortEnabled",
  "onFilterSortChange",
];

/**
 * Renders the filter drawer with the full SurfaceProps set and opens it.
 * @returns The opened drawer's root element.
 */
function renderOpenDrawer(): HTMLElement {
  render(
    <Drawer
      categoryFilters={[]}
      filterSort={FILTER_SORT.ALPHA}
      filterSortEnabled
      onFilter={jest.fn()}
      onFilterSortChange={jest.fn()}
    />,
  );
  fireEvent.click(screen.getByRole("button", { name: /filter/i }));
  return screen.getByRole("presentation");
}

describe("Filter Drawer", () => {
  let consoleError: ReturnType<typeof jest.spyOn>;

  beforeEach(() => {
    consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => void 0);
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  /*
   * Regression: these fell into the rest spread and MUI forwarded them to the
   * DOM. React logs a format string with the prop name in a later argument,
   * so every argument has to be inspected, not just the first.
   */
  it("should not warn about surface props reaching the DOM", () => {
    renderOpenDrawer();
    const warnings = consoleError.mock.calls
      .map((call) => call.map(String).join(" "))
      .filter((message) =>
        SURFACE_ONLY_PROPS.some((prop) => message.includes(prop)),
      );
    expect(warnings).toEqual([]);
  });

  // React lowercases an unrecognised prop it does render, so `filterSort`
  // reached the drawer root as `filtersort="ALPHA"`.
  it("should not emit surface props as DOM attributes", () => {
    const el = renderOpenDrawer();
    for (const prop of SURFACE_ONLY_PROPS) {
      const attribute = prop.toLowerCase();
      expect(el.hasAttribute(attribute)).toBe(false);
      expect(el.querySelector(`[${attribute}]`)).toBeNull();
    }
  });
});
