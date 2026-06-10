import { resolveLogoutOptions } from "../src/nextauth/hooks/utils";

describe("resolveLogoutOptions", () => {
  test("defaults to no-callbackUrl + redirect:false when neither side supplies one", () => {
    expect(resolveLogoutOptions(undefined, undefined)).toEqual({
      callbackUrl: undefined,
      redirect: false,
    });
  });

  test("uses provider logoutCallbackUrl with redirect:true when caller omits options", () => {
    expect(resolveLogoutOptions(undefined, "/")).toEqual({
      callbackUrl: "/",
      redirect: true,
    });
  });

  test("caller-supplied callbackUrl overrides provider logoutCallbackUrl", () => {
    expect(
      resolveLogoutOptions({ callbackUrl: "/account-disabled" }, "/"),
    ).toEqual({
      callbackUrl: "/account-disabled",
      redirect: true,
    });
  });

  test("caller-supplied redirect:false wins even when a callbackUrl is resolved", () => {
    expect(resolveLogoutOptions({ redirect: false }, "/")).toEqual({
      callbackUrl: "/",
      redirect: false,
    });
  });

  test("caller-supplied full options pass through unchanged", () => {
    expect(
      resolveLogoutOptions(
        { callbackUrl: "/account-disabled", redirect: true },
        undefined,
      ),
    ).toEqual({
      callbackUrl: "/account-disabled",
      redirect: true,
    });
  });

  test("caller-supplied callbackUrl alone (no redirect) implies redirect:true", () => {
    expect(resolveLogoutOptions({ callbackUrl: "/x" }, undefined)).toEqual({
      callbackUrl: "/x",
      redirect: true,
    });
  });

  test("normalizes a caller-supplied empty-string callbackUrl to undefined + redirect:false", () => {
    expect(resolveLogoutOptions({ callbackUrl: "" }, undefined)).toEqual({
      callbackUrl: undefined,
      redirect: false,
    });
  });

  test("normalizes a provider-supplied empty-string logoutCallbackUrl to undefined + redirect:false", () => {
    expect(resolveLogoutOptions(undefined, "")).toEqual({
      callbackUrl: undefined,
      redirect: false,
    });
  });
});
