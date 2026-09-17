import { ARIA_LABEL } from "../src/components/Table/components/TableCell/components/CollapsableCell/constants";
import { getToggleLabel } from "../src/components/Table/components/TableCell/components/CollapsableCell/utils";

describe("getToggleLabel", () => {
  // Every row renders one of these, so a bare "Row details" repeated per row is
  // indistinguishable in a screen reader's element list.
  it("should number the row the toggle belongs to", () => {
    expect(getToggleLabel(3)).toBe(`${ARIA_LABEL.ROW_DETAILS}: 4`);
  });

  // The index is zero-based; the name a person hears should not be.
  it("should count from one", () => {
    expect(getToggleLabel(0)).toBe(`${ARIA_LABEL.ROW_DETAILS}: 1`);
  });

  it("should give each row a distinct name", () => {
    const names = [0, 1, 2].map(getToggleLabel);
    expect(new Set(names).size).toBe(names.length);
  });
});
