import { getCloseCategoryLabel } from "../src/components/Filter/components/Filter/utils";

describe("getCloseCategoryLabel", () => {
  it("should name the close button after the category it closes", () => {
    expect(getCloseCategoryLabel("Organism")).toBe("Close Organism filter");
  });

  // The drawer's own close button is named "Close filters", so the two must
  // not collide when both are on screen.
  it("should not collide with the filter drawer's close button name", () => {
    expect(getCloseCategoryLabel("Organism")).not.toBe("Close filters");
  });
});
