import { VIEW_KIND } from "../src/common/categories/views/types";
import type { SelectedFilter } from "../src/common/entities";
import type { CategoryGroup } from "../src/config/entities";
import { getFilterCount } from "../src/providers/exploreState/utils";

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    categoryConfigs: [
      { key: "ancestry", label: "Ancestry" },
      {
        key: "participantCount",
        label: "Participant Count",
        viewKind: VIEW_KIND.RANGE,
      },
    ],
    label: "Dataset",
  },
];

describe("getFilterCount", () => {
  it("counts a range filter once and each selected select value", () => {
    const filterState: SelectedFilter[] = [
      { categoryKey: "ancestry", value: ["a", "b", "c"] },
      { categoryKey: "participantCount", value: [10, 20] },
    ];

    expect(getFilterCount(filterState, CATEGORY_GROUPS)).toBe(4);
  });

  it("counts a half-open range filter once", () => {
    const filterState: SelectedFilter[] = [
      { categoryKey: "participantCount", value: [null, 20] },
    ];

    expect(getFilterCount(filterState, CATEGORY_GROUPS)).toBe(1);
  });

  it("counts each value when there are no category groups", () => {
    const filterState: SelectedFilter[] = [
      { categoryKey: "ancestry", value: ["a", "b", "c"] },
    ];

    expect(getFilterCount(filterState, undefined)).toBe(3);
  });

  it("returns 0 for an empty filter state", () => {
    expect(getFilterCount([], CATEGORY_GROUPS)).toBe(0);
  });
});
