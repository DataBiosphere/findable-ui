import { ARIA_LABEL } from "../src/components/Table/components/TableCell/components/CollapsableCell/constants";
import { getToggleLabel } from "../src/components/Table/components/TableCell/components/CollapsableCell/utils";

describe("getToggleLabel", () => {
  it("should name the toggle 'Collapse row' when the row is expanded", () => {
    expect(getToggleLabel(true)).toBe(ARIA_LABEL.COLLAPSE_ROW);
  });

  it("should name the toggle 'Expand row' when the row is collapsed", () => {
    expect(getToggleLabel(false)).toBe(ARIA_LABEL.EXPAND_ROW);
  });
});
