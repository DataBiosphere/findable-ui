import { FILTER_SORT } from "../src/common/filters/sort/config/types";
import { getFilterSortType } from "../src/common/filters/sort/config/utils";
import { SiteConfig } from "../src/config/entities";

describe("getFilterSortType", () => {
  it("returns ALPHA as default when no config is provided", () => {
    const result = getFilterSortType();
    expect(result).toBe(FILTER_SORT.ALPHA);
  });

  it("returns ALPHA as default when config is undefined", () => {
    const result = getFilterSortType(undefined);
    expect(result).toBe(FILTER_SORT.ALPHA);
  });

  it("returns ALPHA when filterSort is not configured", () => {
    const config = {} as SiteConfig;
    const result = getFilterSortType(config);
    expect(result).toBe(FILTER_SORT.ALPHA);
  });

  it("returns ALPHA when filterSort is empty object", () => {
    const config = { filterSort: {} } as SiteConfig;
    const result = getFilterSortType(config);
    expect(result).toBe(FILTER_SORT.ALPHA);
  });

  it("returns ALPHA when sortBy is undefined", () => {
    const config = { filterSort: { sortBy: undefined } } as SiteConfig;
    const result = getFilterSortType(config);
    expect(result).toBe(FILTER_SORT.ALPHA);
  });

  it("returns configured ALPHA sort type", () => {
    const config = { filterSort: { sortBy: FILTER_SORT.ALPHA } } as SiteConfig;
    const result = getFilterSortType(config);
    expect(result).toBe(FILTER_SORT.ALPHA);
  });

  it("returns configured COUNT sort type", () => {
    const config = { filterSort: { sortBy: FILTER_SORT.COUNT } } as SiteConfig;
    const result = getFilterSortType(config);
    expect(result).toBe(FILTER_SORT.COUNT);
  });
});
