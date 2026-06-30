import { ReadonlyURLSearchParams } from "next/navigation";
import { SEARCH_PARAMETERS } from "../src/components/Layout/components/Header/components/Content/components/Actions/components/Search/components/SearchBar/common/constants";
import { getSearchParams } from "../src/components/Layout/components/Header/components/Content/components/Actions/components/Search/components/SearchBar/common/utils";

/**
 * Builds ReadonlyURLSearchParams from a query string for test input.
 * @param init - Query string.
 * @returns readonly search params.
 */
function params(init?: string): ReadonlyURLSearchParams {
  return new URLSearchParams(init) as unknown as ReadonlyURLSearchParams;
}

describe("getSearchParams", () => {
  it("sets the query param when search params are null", () => {
    const result = getSearchParams(null, "lung");
    expect(result.get(SEARCH_PARAMETERS.QUERY)).toBe("lung");
    expect(result.has(SEARCH_PARAMETERS.START)).toBe(false);
  });

  it("overwrites an existing query param", () => {
    const result = getSearchParams(params("q=lung"), "heart");
    expect(result.get(SEARCH_PARAMETERS.QUERY)).toBe("heart");
  });

  it("removes the start param on a new search", () => {
    const result = getSearchParams(params("q=lung&start=11"), "heart");
    expect(result.has(SEARCH_PARAMETERS.START)).toBe(false);
  });

  it("preserves the category while removing start and setting the new query", () => {
    const result = getSearchParams(
      params("q=lung&category=projects&start=11"),
      "heart",
    );
    expect(result.get(SEARCH_PARAMETERS.QUERY)).toBe("heart");
    expect(result.get(SEARCH_PARAMETERS.CATEGORY)).toBe("projects");
    expect(result.has(SEARCH_PARAMETERS.START)).toBe(false);
  });
});
