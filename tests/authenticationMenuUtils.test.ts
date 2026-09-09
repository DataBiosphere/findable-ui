import { ARIA_LABEL } from "../src/components/Layout/components/Header/components/Content/components/Actions/components/Authentication/components/AuthenticationMenu/constants";
import { getAccountMenuLabel } from "../src/components/Layout/components/Header/components/Content/components/Actions/components/Authentication/components/AuthenticationMenu/utils";

describe("getAccountMenuLabel", () => {
  it("should name the signed-in user", () => {
    expect(getAccountMenuLabel("Ada Lovelace")).toBe(
      "Account menu for Ada Lovelace",
    );
  });

  it("should trim surrounding whitespace from the name", () => {
    expect(getAccountMenuLabel("  Ada Lovelace  ")).toBe(
      "Account menu for Ada Lovelace",
    );
  });

  it.each([
    ["empty", ""],
    ["whitespace-only", "   "],
  ])("should fall back when the name is %s", (_, name) => {
    expect(getAccountMenuLabel(name)).toBe(ARIA_LABEL.ACCOUNT_MENU);
  });
});
