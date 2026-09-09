import { ARIA_LABEL } from "../src/components/Filter/components/Filter/constants";
import { getCloseCategoryLabel } from "../src/components/Filter/components/Filter/utils";
import { ARIA_LABEL as DRAWER_ARIA_LABEL } from "../src/components/Filter/components/surfaces/drawer/components/IconButton/constants";

const CATEGORY = "Organism";

describe("getCloseCategoryLabel", () => {
  it("should name the close button after the category it closes", () => {
    expect(getCloseCategoryLabel(CATEGORY)).toBe("Close Organism filter");
  });

  it("should trim surrounding whitespace from the category label", () => {
    expect(getCloseCategoryLabel("  Organism  ")).toBe("Close Organism filter");
  });

  // The drawer's own close button is in the tree at the same time, so the two
  // must not collide. Imported rather than hardcoded so that changing either
  // name into a collision fails here.
  it("should not collide with the filter drawer's close button name", () => {
    expect(getCloseCategoryLabel(CATEGORY)).not.toBe(DRAWER_ARIA_LABEL.CLOSE);
  });

  it.each([
    ["empty", ""],
    ["whitespace-only", "   "],
  ])("should fall back when the category label is %s", (_, categoryLabel) => {
    expect(getCloseCategoryLabel(categoryLabel)).toBe(
      ARIA_LABEL.CLOSE_CATEGORY,
    );
  });
});
