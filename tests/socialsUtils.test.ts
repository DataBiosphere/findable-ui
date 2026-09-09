import { ARIA_LABEL } from "../src/components/common/Socials/constants";
import { getSocialLabel } from "../src/components/common/Socials/utils";

describe("getSocialLabel", () => {
  it("should use a string label as the accessible name", () => {
    expect(getSocialLabel("GitHub")).toBe("GitHub");
  });

  it.each([
    ["null", null],
    ["undefined", undefined],
    ["empty", ""],
    ["whitespace-only", "  "],
  ])("should fall back when the label is %s", (_, label) => {
    expect(getSocialLabel(label)).toBe(ARIA_LABEL.SOCIAL);
  });

  // Social.label is typed ReactNode, so a non-string is possible even though
  // every known consumer passes a string.
  it("should fall back when the label is not a string", () => {
    expect(getSocialLabel(42)).toBe(ARIA_LABEL.SOCIAL);
  });
});
