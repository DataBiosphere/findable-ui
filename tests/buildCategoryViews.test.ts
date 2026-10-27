import { CategoryConfig } from "../src/common/categories/config/types";
import { Category } from "../src/common/categories/models/types";
import { isSelectCategoryView } from "../src/common/categories/views/select/typeGuards";
import { SelectCategoryView } from "../src/common/entities";
import { FILTER_SORT } from "../src/common/filters/sort/config/types";
import { pinLastCompare } from "../src/components/Filter/components/adapters/tanstack/ColumnFiltersAdapter/stories/utils";
import {
  buildCategoryViews,
  FilterState,
} from "../src/hooks/useCategoryFilter";
import type { ExploreState } from "../src/providers/exploreState";
import { updateFilterSortAction } from "../src/providers/exploreState/actions/updateFilterSort/action";
import { sortCategoryViews } from "../src/providers/exploreState/actions/updateFilterSort/utils";

describe("buildCategoryViews", () => {
  const mockCategories: Category[] = [
    {
      key: "species",
      label: "Species",
      values: [
        { count: 100, key: "human", label: "Human", selected: false },
        { count: 50, key: "mouse", label: "Mouse", selected: false },
        { count: 25, key: "rat", label: "Rat", selected: false },
      ],
    },
    {
      key: "tissue",
      label: "Tissue",
      values: [
        { count: 75, key: "brain", label: "Brain", selected: false },
        { count: 40, key: "liver", label: "Liver", selected: false },
        { count: 30, key: "kidney", label: "Kidney", selected: false },
      ],
    },
  ];

  const mockCategoryConfigs: CategoryConfig[] = [
    {
      key: "species",
      label: "Species",
    },
    {
      key: "tissue",
      label: "Tissue",
    },
  ];

  const mockFilterState: FilterState = [];

  it("returns category views with ALPHA sorting applied", () => {
    const result = buildCategoryViews(
      mockCategories,
      mockCategoryConfigs,
      mockFilterState,
      FILTER_SORT.ALPHA,
    );

    expect(result).toHaveLength(2);

    // Check that categories are returned
    expect(result[0].key).toBe("species");
    expect(result[1].key).toBe("tissue");

    // Verify that select category views have values (sorting is applied internally)
    const selectCategoryViews = result.filter(isSelectCategoryView);
    expect(selectCategoryViews).toHaveLength(2);
    expect(selectCategoryViews[0].values).toHaveLength(3);
    expect(selectCategoryViews[1].values).toHaveLength(3);
  });

  it("returns category views with COUNT sorting applied", () => {
    const result = buildCategoryViews(
      mockCategories,
      mockCategoryConfigs,
      mockFilterState,
      FILTER_SORT.COUNT,
    );

    expect(result).toHaveLength(2);

    // Check that categories are returned
    expect(result[0].key).toBe("species");
    expect(result[1].key).toBe("tissue");

    // Verify that select category views have values (sorting is applied internally)
    const selectCategoryViews = result.filter(isSelectCategoryView);
    expect(selectCategoryViews).toHaveLength(2);
    expect(selectCategoryViews[0].values).toHaveLength(3);
    expect(selectCategoryViews[1].values).toHaveLength(3);
  });

  it("returns empty array when categories is undefined", () => {
    const result = buildCategoryViews(
      undefined as any,
      mockCategoryConfigs,
      mockFilterState,
      FILTER_SORT.ALPHA,
    );

    expect(result).toEqual([]);
  });

  it("returns empty array when categoryConfigs is undefined", () => {
    const result = buildCategoryViews(
      mockCategories,
      undefined,
      mockFilterState,
      FILTER_SORT.ALPHA,
    );

    expect(result).toEqual([]);
  });

  it("returns empty array when categories is empty", () => {
    const result = buildCategoryViews(
      [],
      mockCategoryConfigs,
      mockFilterState,
      FILTER_SORT.ALPHA,
    );

    expect(result).toEqual([]);
  });

  it("filters categories based on accept list in configs", () => {
    const limitedConfigs: CategoryConfig[] = [
      { key: "species", label: "Species" },
      // Only species config, tissue should be filtered out
    ];

    const result = buildCategoryViews(
      mockCategories,
      limitedConfigs,
      mockFilterState,
      FILTER_SORT.ALPHA,
    );

    // Should only return the species category
    expect(result).toHaveLength(1);
    expect(result[0].key).toBe("species");
  });

  it("handles different filter sort types without errors", () => {
    // Test with ALPHA
    const alphaResult = buildCategoryViews(
      mockCategories,
      mockCategoryConfigs,
      mockFilterState,
      FILTER_SORT.ALPHA,
    );
    expect(alphaResult).toHaveLength(2);

    // Test with COUNT
    const countResult = buildCategoryViews(
      mockCategories,
      mockCategoryConfigs,
      mockFilterState,
      FILTER_SORT.COUNT,
    );
    expect(countResult).toHaveLength(2);
  });

  it("applies ALPHA sorting correctly to category values", () => {
    const result = buildCategoryViews(
      mockCategories,
      mockCategoryConfigs,
      mockFilterState,
      FILTER_SORT.ALPHA,
    );

    const selectCategoryViews = result.filter(isSelectCategoryView);

    // Check species category - should be sorted alphabetically: Human, Mouse, Rat
    expect(getCategoryValues(selectCategoryViews, "species", "label")).toEqual([
      "Human",
      "Mouse",
      "Rat",
    ]);

    // Check tissue category - should be sorted alphabetically: Brain, Kidney, Liver
    expect(getCategoryValues(selectCategoryViews, "tissue", "label")).toEqual([
      "Brain",
      "Kidney",
      "Liver",
    ]);
  });

  it("applies COUNT sorting correctly to category values", () => {
    const result = buildCategoryViews(
      mockCategories,
      mockCategoryConfigs,
      mockFilterState,
      FILTER_SORT.COUNT,
    );

    const selectCategoryViews = result.filter(isSelectCategoryView);

    // Check species category - should be sorted by count desc: Human(100), Mouse(50), Rat(25)
    expect(getCategoryValues(selectCategoryViews, "species", "count")).toEqual([
      100, 50, 25,
    ]);

    // Check tissue category - should be sorted by count desc: Brain(75), Liver(40), Kidney(30)
    expect(getCategoryValues(selectCategoryViews, "tissue", "count")).toEqual([
      75, 40, 30,
    ]);
  });

  it("COUNT sorting falls back to alphabetical when counts are equal", () => {
    // Create test data with equal counts
    const equalCountCategories: Category[] = [
      {
        key: "equal_counts",
        label: "Equal Counts",
        values: [
          { count: 50, key: "zebra", label: "Zebra", selected: false },
          { count: 50, key: "apple", label: "Apple", selected: false },
          { count: 50, key: "banana", label: "Banana", selected: false },
        ],
      },
    ];

    const equalCountConfigs: CategoryConfig[] = [
      { key: "equal_counts", label: "Equal Counts" },
    ];

    const result = buildCategoryViews(
      equalCountCategories,
      equalCountConfigs,
      mockFilterState,
      FILTER_SORT.COUNT,
    );

    const selectCategoryViews = result.filter(isSelectCategoryView);

    // Should be sorted alphabetically when counts are equal: Apple, Banana, Zebra
    expect(
      getCategoryValues(selectCategoryViews, "equal_counts", "label"),
    ).toEqual(["Apple", "Banana", "Zebra"]);
  });
});

describe("buildCategoryViews with mapped values", () => {
  // Terms a to c tie on count and are in the reverse order of their labels.
  const LABELS: Record<string, string> = {
    a: "Zebra",
    b: "Mango",
    c: "Apple",
    d: "Kiwi",
  };

  const mappedCategories: Category[] = [
    {
      key: "ancestry",
      label: "Ancestry",
      values: [
        { count: 10, key: "a", label: "a", selected: false },
        { count: 10, key: "b", label: "b", selected: false },
        { count: 10, key: "c", label: "c", selected: false },
        { count: 20, key: "d", label: "d", selected: false },
      ],
    },
  ];

  const mappedConfigs: CategoryConfig[] = [
    {
      key: "ancestry",
      label: "Ancestry",
      mapSelectCategoryValue: (value) => ({
        ...value,
        label: LABELS[value.label] ?? value.label,
      }),
    },
  ];

  it.each([
    [FILTER_SORT.ALPHA, ["Apple", "Kiwi", "Mango", "Zebra"]],
    [FILTER_SORT.COUNT, ["Kiwi", "Apple", "Mango", "Zebra"]],
  ])("sorts %s by the mapped label", (filterSort, expected) => {
    const result = buildCategoryViews(
      mappedCategories,
      mappedConfigs,
      [],
      filterSort,
    );

    expect(
      getCategoryValues(
        result.filter(isSelectCategoryView),
        "ancestry",
        "label",
      ),
    ).toEqual(expected);
  });

  it.each([
    [FILTER_SORT.COUNT, FILTER_SORT.ALPHA],
    [FILTER_SORT.ALPHA, FILTER_SORT.COUNT],
  ])(
    "matches the order the sort toggle produces from %s to %s",
    (fromSort, toSort) => {
      const pageLoad = buildCategoryViews(
        mappedCategories,
        mappedConfigs,
        [],
        toSort,
      );
      const toggled = sortCategoryViews(
        {
          categoryViews: buildCategoryViews(
            mappedCategories,
            mappedConfigs,
            [],
            fromSort,
          ),
        } as ExploreState,
        toSort,
      );

      expect(toggled).toEqual(pageLoad);
    },
  );
});

describe("buildCategoryViews with a comparator", () => {
  // Without the comparator, Unspecified and Not applicable are not last in either sort; organ has only one of them.
  const pinnedCategories: Category[] = [
    {
      key: "assay",
      label: "Assay",
      values: [
        { count: 10, key: "apple", label: "Apple", selected: false },
        { count: 30, key: "banana", label: "Banana", selected: false },
        { count: 20, key: "zebra", label: "Zebra", selected: false },
        {
          count: 40,
          key: "unspecified",
          label: "Unspecified",
          selected: false,
        },
        {
          count: 15,
          key: "not_applicable",
          label: "Not applicable",
          selected: false,
        },
      ],
    },
    {
      key: "organ",
      label: "Organ",
      values: [
        { count: 3, key: "cat", label: "Cat", selected: false },
        { count: 9, key: "unspecified", label: "Unspecified", selected: false },
        { count: 5, key: "yak", label: "Yak", selected: false },
      ],
    },
  ];

  const pinnedConfigs: CategoryConfig[] = [
    { key: "assay", label: "Assay" },
    { key: "organ", label: "Organ" },
  ];

  /**
   * Builds the explore state the filter sort action reads, with the given category views.
   * @param categoryViews - Category views.
   * @returns Explore state.
   */
  function buildState(
    categoryViews: ExploreState["categoryViews"],
  ): ExploreState {
    return {
      categoryViews,
      entityPageState: { files: { categoryGroupConfigKey: "files" } },
      entityStateByCategoryGroupConfigKey: new Map(),
      tabValue: "files",
    } as unknown as ExploreState;
  }

  it.each([
    [
      FILTER_SORT.ALPHA,
      ["Apple", "Banana", "Zebra", "Unspecified", "Not applicable"],
      ["Cat", "Yak", "Unspecified"],
    ],
    [
      FILTER_SORT.COUNT,
      ["Banana", "Zebra", "Apple", "Unspecified", "Not applicable"],
      ["Yak", "Cat", "Unspecified"],
    ],
  ])(
    "sorts %s with the comparator",
    (filterSort, expectedAssay, expectedOrgan) => {
      const result = buildCategoryViews(
        pinnedCategories,
        pinnedConfigs,
        [],
        filterSort,
        pinLastCompare,
      ).filter(isSelectCategoryView);

      expect(getCategoryValues(result, "assay", "label")).toEqual(
        expectedAssay,
      );
      expect(getCategoryValues(result, "organ", "label")).toEqual(
        expectedOrgan,
      );
    },
  );

  it.each([
    [FILTER_SORT.COUNT, FILTER_SORT.ALPHA, pinLastCompare],
    [FILTER_SORT.ALPHA, FILTER_SORT.COUNT, pinLastCompare],
    [FILTER_SORT.COUNT, FILTER_SORT.ALPHA, undefined],
    [FILTER_SORT.ALPHA, FILTER_SORT.COUNT, undefined],
  ])(
    "toggling from %s to %s matches the page load order (comparator: %p)",
    (fromSort, toSort, compare) => {
      const pageLoad = buildCategoryViews(
        pinnedCategories,
        pinnedConfigs,
        [],
        toSort,
        compare,
      );
      const state = buildState(
        buildCategoryViews(
          pinnedCategories,
          pinnedConfigs,
          [],
          fromSort,
          compare,
        ),
      );

      const toggled = updateFilterSortAction(state, toSort, compare);

      expect(toggled.categoryViews).toEqual(pageLoad);
      expect(toggled.filterSort).toBe(toSort);
    },
  );
});

/**
 * Find a select category view by key and return specified field values.
 * @param categoryViews - Category views.
 * @param key - Category key.
 * @param fieldName - Field to extract ('label' or 'count').
 * @returns Array of field values.
 */
function getCategoryValues(
  categoryViews: SelectCategoryView[],
  key: string,
  fieldName: "label" | "count",
): string[] | number[] {
  const categoryView = findSelectCategoryView(categoryViews, key);
  return getValuesByField(categoryView, fieldName);
}

/**
 * Get values from a select category view by field name.
 * @param categoryView - Select category view.
 * @param fieldName - Field name ('label' or 'count').
 * @returns Array of field values.
 */
function getValuesByField(
  categoryView: SelectCategoryView | undefined,
  fieldName: "label" | "count",
): string[] | number[] {
  if (!categoryView) return [];
  const values = categoryView.values.map((v) => v[fieldName]);
  if (fieldName === "label") return values as string[];
  return values as number[];
}

/**
 * Find a select category view by key.
 * @param categoryViews - Category views.
 * @param key - Category key.
 * @returns Select category view.
 */
function findSelectCategoryView(
  categoryViews: SelectCategoryView[],
  key: string,
): SelectCategoryView | undefined {
  return categoryViews.find((cv) => cv.key === key);
}
