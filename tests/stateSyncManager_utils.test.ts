import {
  hasParams,
  isSynced,
  stringifyQuery,
  wasPop,
} from "../src/hooks/stateSyncManager/hooks/UseStateSync/utils";
import { NextHistoryState } from "../src/services/beforePopState/types";

/**
 * Builds a minimal NextHistoryState for tests.
 * @param url - The href stored by Next.js in history state (the route
 *   pattern on dynamic routes, e.g. `/[entityListType]/[entityId]`; the same
 *   string as the URL on static routes).
 * @param as - The resolved URL shown to the user. Defaults to `url` for
 *   static-route cases where the two are identical.
 * @returns NextHistoryState with the given fields and no-op options.
 */
function buildHistoryState(url: string, as: string = url): NextHistoryState {
  return { as, options: {}, url };
}

describe("wasPop", () => {
  it("returns false when nextHistoryState is undefined", () => {
    expect(wasPop("", "/projects", undefined)).toBe(false);
  });

  it("returns true when pathname matches the path component of the history URL", () => {
    expect(wasPop("", "/projects", buildHistoryState("/projects"))).toBe(true);
  });

  it("strips the query string off the history URL before comparing", () => {
    expect(
      wasPop("", "/projects", buildHistoryState("/projects?filter=foo")),
    ).toBe(true);
  });

  it("returns false when pathname does not match", () => {
    expect(wasPop("", "/projects", buildHistoryState("/files"))).toBe(false);
  });

  it("defaults basePath to empty string when not provided", () => {
    expect(wasPop(undefined, "/projects", buildHistoryState("/projects"))).toBe(
      true,
    );
  });

  it("prepends basePath to pathname before comparing", () => {
    expect(
      wasPop("/data", "/projects", buildHistoryState("/data/projects")),
    ).toBe(true);
  });

  it("returns false when basePath is set but missing from the history URL", () => {
    expect(wasPop("/data", "/projects", buildHistoryState("/projects"))).toBe(
      false,
    );
  });

  // Documents the contract: nextHistoryState.url is the href stored by
  // Next.js — the route pattern on dynamic routes, the static URL on static
  // routes. `pathname` must be in the same form for the comparison to match.
  it("matches on a dynamic route when both sides are the route pattern", () => {
    expect(
      wasPop(
        "",
        "/[entityListType]/[entityId]",
        buildHistoryState(
          "/[entityListType]/[entityId]?filter=foo",
          "/anvil-cmg/abc-123?filter=foo",
        ),
      ),
    ).toBe(true);
  });

  it("does not match when pathname is the resolved URL but history url is the route pattern", () => {
    expect(
      wasPop(
        "",
        "/anvil-cmg/abc-123",
        buildHistoryState("/[entityListType]/[entityId]", "/anvil-cmg/abc-123"),
      ),
    ).toBe(false);
  });
});

describe("hasParams", () => {
  it("returns true when any param key has a defined value in the query", () => {
    expect(hasParams({ filter: "foo" }, ["filter"])).toBe(true);
  });

  it("returns true when at least one of multiple param keys is present", () => {
    expect(hasParams({ sort: "asc" }, ["filter", "sort"])).toBe(true);
  });

  it("returns false when none of the param keys are in the query", () => {
    expect(hasParams({ other: "x" }, ["filter", "sort"])).toBe(false);
  });

  it("returns false for an empty paramKeys list", () => {
    expect(hasParams({ filter: "foo" }, [])).toBe(false);
  });

  it("returns false when a param key is present but undefined", () => {
    expect(hasParams({ filter: undefined }, ["filter"])).toBe(false);
  });
});

describe("isSynced", () => {
  it("returns true for two empty queries", () => {
    expect(isSynced({}, {})).toBe(true);
  });

  it("returns true when queries have the same keys/values in different order", () => {
    // eslint-disable-next-line sort-keys -- intentionally unsorted to exercise insertion-order independence.
    expect(isSynced({ a: "1", b: "2" }, { b: "2", a: "1" })).toBe(true);
  });

  it("returns false when queries differ in value", () => {
    expect(isSynced({ a: "1" }, { a: "2" })).toBe(false);
  });

  it("returns false when one query has extra keys", () => {
    expect(isSynced({ a: "1" }, { a: "1", b: "2" })).toBe(false);
  });
});

describe("stringifyQuery", () => {
  it("produces identical output regardless of insertion order", () => {
    expect(stringifyQuery({ a: "1", b: "2" })).toBe(
      // eslint-disable-next-line sort-keys -- intentionally unsorted to exercise insertion-order independence.
      stringifyQuery({ b: "2", a: "1" }),
    );
  });

  it("produces empty-object JSON for an empty query", () => {
    expect(stringifyQuery({})).toBe("{}");
  });
});
