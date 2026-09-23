import { jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { FILTER_SORT } from "../src/common/filters/sort/config/types";
import { SURFACE_PROP_KEYS } from "../src/components/Filter/components/surfaces/constants";
import { Drawer } from "../src/components/Filter/components/surfaces/drawer/Drawer/drawer";
import { isSurfaceProp } from "../src/components/Filter/components/surfaces/utils";

// Typed as a record over keyof SurfaceProps, so this list cannot go stale; it
// is used as the leak oracle directly rather than through isSurfaceProp.
const SURFACE_KEYS = Object.keys(SURFACE_PROP_KEYS);

/**
 * Returns the names of the props React applied to every host element in the
 * document. React never writes a function prop, or an unknown boolean one, as
 * an HTML attribute, so checking attributes alone cannot tell whether
 * `onFilterSortChange` or `filterSortEnabled` reached the DOM. React's
 * unknown-prop warning is no better: it fires once per prop per module
 * instance, so whether a test sees it depends on test order. The props React
 * holds for the host element are neither.
 * @returns Prop names applied to host elements.
 */
function getHostPropNames(): string[] {
  return Array.from(document.querySelectorAll("*")).flatMap((element) => {
    const key = Object.keys(element).find((name) =>
      name.startsWith("__reactProps$"),
    );
    if (!key) return [];
    return Object.keys((element as unknown as Record<string, object>)[key]);
  });
}

describe("Filter Drawer", () => {
  // Regression: the surface props the drawer does not use fell into the rest
  // spread and MUI forwarded them to the DOM, warning on every mobile render.
  it("should not pass surface props to any DOM element", () => {
    render(
      <Drawer
        categoryFilters={[]}
        count={0}
        filterSort={FILTER_SORT.ALPHA}
        filterSortEnabled
        onFilter={jest.fn()}
        onFilterSortChange={jest.fn()}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /filter/i }));

    const names = getHostPropNames();
    // Guards against a vacuous pass should React stop exposing host props.
    expect(names).toContain("className");
    expect(names.filter((name) => SURFACE_KEYS.includes(name))).toEqual([]);
  });
});

describe("isSurfaceProp", () => {
  it("should match surface props", () => {
    for (const prop of [
      "filterSort",
      "filterSortEnabled",
      "onFilterSortChange",
    ]) {
      expect(isSurfaceProp(prop)).toBe(true);
    }
  });

  it("should not match MUI Drawer props", () => {
    for (const prop of ["anchor", "className", "open", "slotProps"]) {
      expect(isSurfaceProp(prop)).toBe(false);
    }
  });

  // An own-key check, so Object.prototype members are not mistaken for keys.
  it("should not match inherited object members", () => {
    expect(isSurfaceProp("toString")).toBe(false);
  });
});
