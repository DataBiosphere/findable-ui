import type { SelectedFilter } from "../src/common/entities";
import type { AiResponse } from "../src/components/Filter/components/ai/components/FacetAssistant/types";
import {
  buildSummary,
  mapResponse,
} from "../src/components/Filter/components/ai/components/FacetAssistant/utils";

const AI_RESPONSE: AiResponse = {
  facets: [
    {
      facet: "donors.phenotypic_sex",
      selectedValues: [
        { mention: "female", recognized: true, term: "Female" }, // matched
        { mention: "female", recognized: true, term: "unknown" }, // unmatched (unknown term)
        { mention: "female", recognized: false, term: "Female" }, // unmatched (recognized=false)
      ],
    },
    {
      facet: "diagnoses.disease",
      selectedValues: [
        {
          mention: "lung cancer",
          recognized: true, // matched
          term: "Lung cancer",
        },
      ],
    },
    {
      facet: "donors.empty_after_filter",
      selectedValues: [
        {
          mention: "x",
          recognized: true, // filtered out → facet empty
          term: "unknown",
        },
      ],
    },
    {
      facet: "unmatched",
      selectedValues: [
        {
          mention: "foo",
          recognized: false, // unmatched facet
          term: "bar",
        },
      ],
    },
    {
      facet: "unknown",
      selectedValues: [
        {
          mention: "baz",
          recognized: true, // unmatched facet
          term: "Baz",
        },
      ],
    },
  ],
  query: "ignored",
};

describe("buildSummary", () => {
  it("returns undefined when response is null", () => {
    expect(buildSummary(null)).toBeUndefined();
  });

  it("classifies matched and unmatched pairs correctly", () => {
    const summary = buildSummary(AI_RESPONSE);
    expect(summary).toBeDefined();
    if (!summary) return;
    expect(summary.matched).toEqual([
      ["female", "Female"],
      ["lung cancer", "Lung cancer"],
    ]);
    expect(summary.unmatched).toEqual([
      ["female", "unknown"],
      ["female", "Female"],
      ["x", "unknown"],
      ["foo", "bar"],
      ["baz", "Baz"],
    ]);
  });
});

describe("mapResponse", () => {
  let result: SelectedFilter[] = [];
  let categoryKeysSet: Set<string> = new Set();
  beforeEach(() => {
    result = mapResponse(AI_RESPONSE);
    categoryKeysSet = new Set(result.map(({ categoryKey }) => categoryKey));
  });
  it("filters out 'unknown' and 'unmatched' facets", () => {
    const categoryKeys = [...categoryKeysSet];
    // Should only include matched facets.
    expect(categoryKeys).toEqual(
      expect.arrayContaining(["donors.phenotypic_sex", "diagnoses.disease"])
    );

    // Should not include unknown or unmatched facets.
    expect(categoryKeys).not.toContain("unknown");
    expect(categoryKeys).not.toContain("unmatched");
  });

  it("filters out values with term 'unknown' or recognized=false", () => {
    const sexFilter = findCategoryByKey(result, "donors.phenotypic_sex");
    expect(sexFilter).toBeDefined();
    expect(sexFilter?.value).toEqual(["Female"]);
  });

  it("drops filters that end up with no values after filtering", () => {
    expect(categoryKeysSet.has("donors.empty_after_filter")).toBe(false);
  });

  it("maps terms to SelectedFilter.value correctly", () => {
    const diseaseFilter = findCategoryByKey(result, "diagnoses.disease");
    expect(diseaseFilter).toBeDefined();
    expect(diseaseFilter?.value).toEqual(["Lung cancer"]);
  });
});

/**
 * Helper function to find a filter by category key.
 * @param results - SelectedFilters.
 * @param categoryKey - Category key.
 * @returns The SelectedFilter object if found, undefined otherwise.
 */
function findCategoryByKey(
  results: SelectedFilter[],
  categoryKey: string
): SelectedFilter | undefined {
  return results.find(
    (selectedFilter) => selectedFilter.categoryKey === categoryKey
  );
}
