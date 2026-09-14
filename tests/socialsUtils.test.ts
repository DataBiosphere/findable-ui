import { ARIA_LABEL } from "../src/components/common/Socials/constants";
import { getSocialLabel } from "../src/components/common/Socials/utils";

const URL_GITHUB = "https://github.com/DataBiosphere/findable-ui";

describe("getSocialLabel", () => {
  it("should use a string label as the accessible name", () => {
    expect(getSocialLabel("GitHub", URL_GITHUB)).toBe("GitHub");
  });

  // Social.label is typed ReactNode, so a non-string is possible even though
  // every known consumer passes a string. Falling every social back to one
  // generic name would leave a list of links indistinguishable, so the host
  // stands in for the label instead.
  it.each([
    ["null", null],
    ["undefined", undefined],
    ["empty", ""],
    ["whitespace-only", "  "],
    ["a number", 42],
  ])("should fall back to the host when the label is %s", (_, label) => {
    expect(getSocialLabel(label, URL_GITHUB)).toBe("github.com");
  });

  it("should strip a leading www. from the host", () => {
    expect(getSocialLabel(null, "https://www.youtube.com/@databiosphere")).toBe(
      "youtube.com",
    );
  });

  // Distinct hosts must stay distinct, which is the whole point of the fallback.
  it("should give socials on different hosts different names", () => {
    expect(getSocialLabel(null, URL_GITHUB)).not.toBe(
      getSocialLabel(null, "https://x.com/humancellatlas"),
    );
  });

  it.each([
    ["relative", "/socials"],
    ["not a URL", "github"],
  ])("should fall back to a generic name when the url is %s", (_, url) => {
    expect(getSocialLabel(null, url)).toBe(ARIA_LABEL.SOCIAL);
  });
});
