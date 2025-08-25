import { CategoryConfig } from "../src/common/categories/config/types";
import { Category } from "../src/common/categories/models/types";
import { isSelectCategoryView } from "../src/common/categories/views/select/typeGuards";
import { SelectCategoryView } from "../src/common/entities";
import { FILTER_SORT } from "../src/common/filters/sort/config/types";
import {
  buildCategoryViews,
  FilterState,
} from "../src/hooks/useCategoryFilter";

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
      FILTER_SORT.ALPHA
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
      FILTER_SORT.COUNT
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
      FILTER_SORT.ALPHA
    );

    expect(result).toEqual([]);
  });

  it("returns empty array when categoryConfigs is undefined", () => {
    const result = buildCategoryViews(
      mockCategories,
      undefined,
      mockFilterState,
      FILTER_SORT.ALPHA
    );

    expect(result).toEqual([]);
  });

  it("returns empty array when categories is empty", () => {
    const result = buildCategoryViews(
      [],
      mockCategoryConfigs,
      mockFilterState,
      FILTER_SORT.ALPHA
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
      FILTER_SORT.ALPHA
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
      FILTER_SORT.ALPHA
    );
    expect(alphaResult).toHaveLength(2);

    // Test with COUNT
    const countResult = buildCategoryViews(
      mockCategories,
      mockCategoryConfigs,
      mockFilterState,
      FILTER_SORT.COUNT
    );
    expect(countResult).toHaveLength(2);
  });

  it("applies ALPHA sorting correctly to category values", () => {
    const result = buildCategoryViews(
      mockCategories,
      mockCategoryConfigs,
      mockFilterState,
      FILTER_SORT.ALPHA
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
      FILTER_SORT.COUNT
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
      FILTER_SORT.COUNT
    );

    const selectCategoryViews = result.filter(isSelectCategoryView);

    // Should be sorted alphabetically when counts are equal: Apple, Banana, Zebra
    expect(
      getCategoryValues(selectCategoryViews, "equal_counts", "label")
    ).toEqual(["Apple", "Banana", "Zebra"]);
  });
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
  fieldName: "label" | "count"
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
  fieldName: "label" | "count"
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
  key: string
): SelectCategoryView | undefined {
  return categoryViews.find((cv) => cv.key === key);
}
