import { getSignInPath } from "../src/components/Layout/components/Header/components/Content/components/Actions/components/Authentication/utils";

describe("getSignInPath", () => {
  test("returns the library default when authenticationEnabled is true", () => {
    expect(getSignInPath(true)).toBe("/login");
  });

  test("returns the consumer-supplied string verbatim", () => {
    expect(getSignInPath("/")).toBe("/");
    expect(getSignInPath("/auth/signin")).toBe("/auth/signin");
  });
});
