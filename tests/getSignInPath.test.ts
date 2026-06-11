import {
  getSignInPath,
  getSignInPathPattern,
} from "../src/components/Layout/components/Header/components/Content/components/Actions/components/Authentication/utils";
import { isNavigationLinkSelected } from "../src/components/Layout/components/Header/components/Content/components/Navigation/common/utils";

describe("getSignInPath", () => {
  test("returns the library default when authenticationEnabled is true", () => {
    expect(getSignInPath(true)).toBe("/login");
  });

  test("returns the library default when authenticationEnabled is false or undefined", () => {
    expect(getSignInPath(false)).toBe("/login");
    expect(getSignInPath(undefined)).toBe("/login");
  });

  test("returns the consumer-supplied string verbatim", () => {
    expect(getSignInPath("/")).toBe("/");
    expect(getSignInPath("/auth/signin")).toBe("/auth/signin");
  });
});

describe("getSignInPathPattern", () => {
  test("default login path matches exactly the login pathname", () => {
    const patterns = [getSignInPathPattern("/login")];
    expect(isNavigationLinkSelected("/login", patterns)).toBe(true);
    expect(isNavigationLinkSelected("/login/nested", patterns)).toBe(false);
    expect(isNavigationLinkSelected("/atlases", patterns)).toBe(false);
  });

  test("root sign-in path matches only the root pathname", () => {
    const patterns = [getSignInPathPattern("/")];
    expect(isNavigationLinkSelected("/", patterns)).toBe(true);
    expect(isNavigationLinkSelected("/atlases", patterns)).toBe(false);
  });

  test("tolerates trailing-slash differences between path and pathname", () => {
    const fromSlashless = [getSignInPathPattern("/login")];
    expect(isNavigationLinkSelected("/login/", fromSlashless)).toBe(true);
    const fromSlashed = [getSignInPathPattern("/login/")];
    expect(isNavigationLinkSelected("/login", fromSlashed)).toBe(true);
    expect(isNavigationLinkSelected("/login/", fromSlashed)).toBe(true);
    expect(isNavigationLinkSelected("/login/nested", fromSlashed)).toBe(false);
  });

  test("escapes regex special characters in the sign-in path", () => {
    const patterns = [getSignInPathPattern("/auth/sign-in (sso)")];
    expect(isNavigationLinkSelected("/auth/sign-in (sso)", patterns)).toBe(
      true,
    );
    expect(isNavigationLinkSelected("/auth/sign-in -sso-", patterns)).toBe(
      false,
    );
  });
});
