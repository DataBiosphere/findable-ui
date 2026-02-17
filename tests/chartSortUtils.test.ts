import { CHART_SORT_FN } from "../src/common/chart/sort/constants";
import { CHART_SORT, ChartSortFn } from "../src/common/chart/sort/types";
import { getChartSortFn } from "../src/common/chart/sort/utils";
import { SelectCategoryValueView } from "../src/common/entities";
import {
  sortCategoryValueViewsAlpha,
  sortCategoryValueViewsCount,
} from "../src/common/filters/sort/models/utils";

/**
 * Creates a mock category value view for testing.
 * @param key - The key for the category value.
 * @param count - The count for the category value.
 * @returns A mock SelectCategoryValueView.
 */
const createMockCategoryValueView = (
  key: unknown,
  count: number,
): SelectCategoryValueView => ({
  count,
  key,
  label: key ? String(key) : "",
  selected: false,
});

describe("Chart Sort Utils", () => {
  describe("CHART_SORT_FN", () => {
    it("maps CHART_SORT.ALPHA to sortCategoryValueViewsAlpha", () => {
      expect(CHART_SORT_FN[CHART_SORT.ALPHA]).toBe(sortCategoryValueViewsAlpha);
    });

    it("maps CHART_SORT.COUNT to sortCategoryValueViewsCount", () => {
      expect(CHART_SORT_FN[CHART_SORT.COUNT]).toBe(sortCategoryValueViewsCount);
    });
  });

  describe("getChartSortFn", () => {
    it("returns COUNT sort function when undefined", () => {
      const sortFn = getChartSortFn(undefined);
      expect(sortFn).toBe(sortCategoryValueViewsCount);
    });

    it("returns ALPHA sort function for CHART_SORT.ALPHA", () => {
      const sortFn = getChartSortFn(CHART_SORT.ALPHA);
      expect(sortFn).toBe(sortCategoryValueViewsAlpha);
    });

    it("returns COUNT sort function for CHART_SORT.COUNT", () => {
      const sortFn = getChartSortFn(CHART_SORT.COUNT);
      expect(sortFn).toBe(sortCategoryValueViewsCount);
    });

    it("returns custom function when provided", () => {
      const customSortFn: ChartSortFn = (a, b) =>
        a.label.localeCompare(b.label);
      const sortFn = getChartSortFn(customSortFn);
      expect(sortFn).toBe(customSortFn);
    });

    it("custom sort function works correctly", () => {
      // Custom sort: by label length descending
      const customSortFn: ChartSortFn = (a, b) =>
        b.label.length - a.label.length;
      const sortFn = getChartSortFn(customSortFn);

      const data = [
        createMockCategoryValueView("a", 10),
        createMockCategoryValueView("abc", 5),
        createMockCategoryValueView("ab", 3),
      ];

      const sorted = [...data].sort(sortFn);

      expect(sorted.map((cv) => cv.label)).toEqual(["abc", "ab", "a"]);
    });
  });

  describe("sorting integration", () => {
    const testData = [
      createMockCategoryValueView("Zebra", 5),
      createMockCategoryValueView("Apple", 10),
      createMockCategoryValueView("Banana", 3),
    ];

    it("sorts alphabetically with CHART_SORT.ALPHA", () => {
      const sortFn = getChartSortFn(CHART_SORT.ALPHA);
      const sorted = [...testData].sort(sortFn);

      expect(sorted.map((cv) => cv.label)).toEqual([
        "Apple",
        "Banana",
        "Zebra",
      ]);
    });

    it("sorts by count descending with CHART_SORT.COUNT", () => {
      const sortFn = getChartSortFn(CHART_SORT.COUNT);
      const sorted = [...testData].sort(sortFn);

      expect(sorted.map((cv) => cv.label)).toEqual([
        "Apple",
        "Zebra",
        "Banana",
      ]);
      expect(sorted.map((cv) => cv.count)).toEqual([10, 5, 3]);
    });

    it("defaults to count sort when no option provided", () => {
      const sortFn = getChartSortFn();
      const sorted = [...testData].sort(sortFn);

      expect(sorted.map((cv) => cv.label)).toEqual([
        "Apple",
        "Zebra",
        "Banana",
      ]);
    });
  });
});
