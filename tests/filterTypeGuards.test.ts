import {
  isSelectedFilter,
  parseFilterParam,
} from "../src/common/filters/typeGuards";

describe("isSelectedFilter", () => {
  it("returns true for a valid SelectedFilter", () => {
    expect(isSelectedFilter({ categoryKey: "species", value: ["human"] })).toBe(
      true,
    );
  });

  it("returns true for a SelectedFilter with empty value array", () => {
    expect(isSelectedFilter({ categoryKey: "species", value: [] })).toBe(true);
  });

  it("returns false when categoryKey is missing", () => {
    expect(isSelectedFilter({ value: ["human"] })).toBe(false);
  });

  it("returns false when value is missing", () => {
    expect(isSelectedFilter({ categoryKey: "species" })).toBe(false);
  });

  it("returns false when value is not an array", () => {
    expect(isSelectedFilter({ categoryKey: "species", value: "human" })).toBe(
      false,
    );
  });

  it("returns false for wrong shape (facetName/terms)", () => {
    expect(isSelectedFilter({ facetName: "bogus", terms: ["invalid"] })).toBe(
      false,
    );
  });

  it("returns false for null", () => {
    expect(isSelectedFilter(null)).toBe(false);
  });

  it("returns false for a string", () => {
    expect(isSelectedFilter("not a filter")).toBe(false);
  });
});

describe("parseFilterParam", () => {
  it("parses a valid filter param", () => {
    const input = JSON.stringify([
      { categoryKey: "species", value: ["human"] },
    ]);
    expect(parseFilterParam(input)).toEqual([
      { categoryKey: "species", value: ["human"] },
    ]);
  });

  it("parses multiple valid filters", () => {
    const input = JSON.stringify([
      { categoryKey: "species", value: ["human"] },
      { categoryKey: "organ", value: ["brain", "heart"] },
    ]);
    expect(parseFilterParam(input)).toHaveLength(2);
  });

  it("returns empty array for malformed JSON", () => {
    expect(parseFilterParam('{"truncated')).toEqual([]);
  });

  it("returns empty array for non-array JSON", () => {
    expect(parseFilterParam('{"categoryKey":"species"}')).toEqual([]);
  });

  it("returns empty array for wrong-shape objects", () => {
    const input = JSON.stringify([{ facetName: "bogus", terms: ["invalid"] }]);
    expect(parseFilterParam(input)).toEqual([]);
  });

  it("filters out invalid entries and keeps valid ones", () => {
    const input = JSON.stringify([
      { categoryKey: "species", value: ["human"] },
      { facetName: "bogus", terms: ["invalid"] },
    ]);
    expect(parseFilterParam(input)).toEqual([
      { categoryKey: "species", value: ["human"] },
    ]);
  });

  it("returns empty array for empty string", () => {
    expect(parseFilterParam("")).toEqual([]);
  });

  it("returns empty array for valid empty array", () => {
    expect(parseFilterParam("[]")).toEqual([]);
  });
});
