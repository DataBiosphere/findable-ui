import { CHART_SORT } from "../src/common/chart/sort/types";
import type {
  SelectCategoryValueView,
  SelectCategoryView,
} from "../src/common/entities";
import type { CategoryFilter } from "../src/components/Filter/components/Filters/filters";
import { getSelectCategoryViews } from "../src/components/Index/components/EntityView/components/views/ChartView/utils";

const VALUES: SelectCategoryValueView[] = [
  { count: 5, key: "beta", label: "beta", selected: false },
  { count: 20, key: "gamma", label: "gamma", selected: false },
  { count: 10, key: "alpha", label: "alpha", selected: false },
];

describe("getSelectCategoryViews", () => {
  it("sorts each view's values by count when no chart sort is configured", () => {
    const [view] = getSelectCategoryViews([buildCategoryFilter()]);
    expect(view.values.map(({ key }) => key)).toEqual([
      "gamma",
      "alpha",
      "beta",
    ]);
  });

  it("sorts each view's values by the configured chart sort", () => {
    const [view] = getSelectCategoryViews([
      buildCategoryFilter({ enable: true, sortBy: CHART_SORT.ALPHA }),
    ]);
    expect(view.values.map(({ key }) => key)).toEqual([
      "alpha",
      "beta",
      "gamma",
    ]);
  });

  it("does not reorder the category filters' values", () => {
    const categoryFilter = buildCategoryFilter();
    getSelectCategoryViews([categoryFilter]);
    expect(
      (categoryFilter.categoryViews[0] as SelectCategoryView).values,
    ).toEqual(VALUES);
  });

  it("excludes views whose chart is disabled", () => {
    expect(
      getSelectCategoryViews([buildCategoryFilter({ enable: false })]),
    ).toEqual([]);
  });
});

/**
 * Builds a category filter with a single select category view of copies of VALUES.
 * @param chart - Chart configuration of the view.
 * @returns Category filter.
 */
function buildCategoryFilter(
  chart?: SelectCategoryView["chart"],
): CategoryFilter {
  return {
    categoryViews: [
      { chart, key: "category", label: "Category", values: [...VALUES] },
    ],
  };
}
