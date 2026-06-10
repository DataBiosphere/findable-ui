import { getQueryCallbackUrl } from "../src/hooks/authentication/session/useSessionActive";

describe("getQueryCallbackUrl", () => {
  it("returns the string when query is a non-empty same-origin path", () => {
    expect(getQueryCallbackUrl("/atlases")).toBe("/atlases");
  });

  it("preserves query string and fragment in the returned path", () => {
    expect(getQueryCallbackUrl("/atlases?tab=metadata#row-1")).toBe(
      "/atlases?tab=metadata#row-1",
    );
  });

  it("returns the first element when query is a string array", () => {
    expect(getQueryCallbackUrl(["/atlases", "/other"])).toBe("/atlases");
  });

  it("returns undefined when query is undefined", () => {
    expect(getQueryCallbackUrl(undefined)).toBeUndefined();
  });

  it("returns undefined when query is an empty string", () => {
    expect(getQueryCallbackUrl("")).toBeUndefined();
  });

  it("returns undefined when query is an empty array", () => {
    expect(getQueryCallbackUrl([])).toBeUndefined();
  });

  it("returns undefined when the first array element is empty", () => {
    expect(getQueryCallbackUrl(["", "/other"])).toBeUndefined();
  });

  it("rejects absolute http URLs (open-redirect guard)", () => {
    expect(getQueryCallbackUrl("https://evil.example/phish")).toBeUndefined();
    expect(getQueryCallbackUrl("http://evil.example/phish")).toBeUndefined();
  });

  it("rejects protocol-relative URLs (browsers treat as absolute)", () => {
    expect(getQueryCallbackUrl("//evil.example/phish")).toBeUndefined();
  });

  it("rejects values that do not start with '/'", () => {
    expect(getQueryCallbackUrl("atlases")).toBeUndefined();
    expect(getQueryCallbackUrl("javascript:alert(1)")).toBeUndefined();
  });
});
