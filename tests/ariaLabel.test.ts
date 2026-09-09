import { resolveAriaLabel } from "../src/utils/ariaLabel";

const FALLBACK = "Close";

describe("resolveAriaLabel", () => {
  it("should return the given label", () => {
    expect(resolveAriaLabel("Close filters", FALLBACK)).toBe("Close filters");
  });

  it("should trim surrounding whitespace from the given label", () => {
    expect(resolveAriaLabel("  Close filters  ", FALLBACK)).toBe(
      "Close filters",
    );
  });

  it.each([
    ["undefined", undefined],
    ["empty", ""],
    ["whitespace-only", "   "],
  ])("should fall back when the label is %s", (_, label) => {
    expect(resolveAriaLabel(label, FALLBACK)).toBe(FALLBACK);
  });
});
