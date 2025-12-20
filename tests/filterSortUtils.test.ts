import { SelectCategoryValueView } from "../src/common/entities";
import { FILTER_SORT } from "../src/common/filters/sort/config/types";
import {
  sortCategoryValueViews,
  sortCategoryValueViewsAlpha,
  sortCategoryValueViewsCount,
} from "../src/common/filters/sort/models/utils";

// Mock data for testing
const createMockCategoryValueView = (
  key: unknown,
  count: number,
): SelectCategoryValueView => ({
  count,
  key,
  label: key ? String(key) : "",
  selected: false,
});

describe("Filter Sort Utils", () => {
  describe("sortCategoryValueViewsAlpha", () => {
    it("sorts category value views alphabetically", () => {
      const cvv1 = createMockCategoryValueView("Zebra", 5);
      const cvv2 = createMockCategoryValueView("Apple", 10);
      const cvv3 = createMockCategoryValueView("Banana", 3);

      const result = [cvv1, cvv2, cvv3].sort(sortCategoryValueViewsAlpha);

      expect(result.map((cv) => cv.label)).toEqual([
        "Apple",
        "Banana",
        "Zebra",
      ]);
    });

    it("handles empty labels by placing them at the end", () => {
      const cvv1 = createMockCategoryValueView("Apple", 10);
      const cvv2 = createMockCategoryValueView("", 5);
      const cvv3 = createMockCategoryValueView("Banana", 3);

      const result = [cvv1, cvv2, cvv3].sort(sortCategoryValueViewsAlpha);

      expect(result.map((cv) => cv.label)).toEqual(["Apple", "Banana", ""]);
    });

    it("handles null labels by placing them at the end", () => {
      const cvv1 = createMockCategoryValueView("Apple", 10);
      const cvv2 = createMockCategoryValueView(null, 5);
      const cvv3 = createMockCategoryValueView("Banana", 3);

      const result = [cvv1, cvv2, cvv3].sort(sortCategoryValueViewsAlpha);

      expect(result[0].label).toBe("Apple");
      expect(result[1].label).toBe("Banana");
      expect(result[2].label).toBe("");
    });

    it("performs case-insensitive sorting", () => {
      const cvv1 = createMockCategoryValueView("zebra", 5);
      const cvv2 = createMockCategoryValueView("Apple", 10);
      const cvv3 = createMockCategoryValueView("BANANA", 3);

      const result = [cvv1, cvv2, cvv3].sort(sortCategoryValueViewsAlpha);

      expect(result.map((cv) => cv.label)).toEqual([
        "Apple",
        "BANANA",
        "zebra",
      ]);
    });
  });

  describe("sortCategoryValueViewsCount", () => {
    it("sorts category value views by count descending", () => {
      const cvv1 = createMockCategoryValueView("Low", 3);
      const cvv2 = createMockCategoryValueView("High", 10);
      const cvv3 = createMockCategoryValueView("Medium", 7);

      const result = [cvv1, cvv2, cvv3].sort(sortCategoryValueViewsCount);

      expect(result.map((cv) => cv.count)).toEqual([10, 7, 3]);
      expect(result.map((cv) => cv.label)).toEqual(["High", "Medium", "Low"]);
    });

    it("sorts alphabetically when counts are equal", () => {
      const cvv1 = createMockCategoryValueView("Zebra", 5);
      const cvv2 = createMockCategoryValueView("Apple", 5);
      const cvv3 = createMockCategoryValueView("Banana", 5);

      const result = [cvv1, cvv2, cvv3].sort(sortCategoryValueViewsCount);

      expect(result.map((cv) => cv.label)).toEqual([
        "Apple",
        "Banana",
        "Zebra",
      ]);
      expect(result.every((cv) => cv.count === 5)).toBe(true);
    });

    it("handles mixed counts and alphabetical sorting", () => {
      const cvv1 = createMockCategoryValueView("Zebra", 10);
      const cvv2 = createMockCategoryValueView("Apple", 5);
      const cvv3 = createMockCategoryValueView("Banana", 5);
      const cvv4 = createMockCategoryValueView("Cherry", 15);

      const result = [cvv1, cvv2, cvv3, cvv4].sort(sortCategoryValueViewsCount);

      expect(result.map((cv) => cv.label)).toEqual([
        "Cherry",
        "Zebra",
        "Apple",
        "Banana",
      ]);
      expect(result.map((cv) => cv.count)).toEqual([15, 10, 5, 5]);
    });

    it("handles empty labels in count sorting", () => {
      const cvv1 = createMockCategoryValueView("Apple", 10);
      const cvv2 = createMockCategoryValueView("", 15);
      const cvv3 = createMockCategoryValueView("Banana", 5);

      const result = [cvv1, cvv2, cvv3].sort(sortCategoryValueViewsCount);

      expect(result.map((cv) => cv.label)).toEqual(["", "Apple", "Banana"]);
      expect(result.map((cv) => cv.count)).toEqual([15, 10, 5]);
    });
  });

  describe("sortCategoryValueViews", () => {
    const testData = [
      createMockCategoryValueView("Zebra", 5),
      createMockCategoryValueView("Apple", 10),
      createMockCategoryValueView("Banana", 3),
    ];

    it("sorts alphabetically when FILTER_SORT.ALPHA is specified", () => {
      const data = [...testData];
      sortCategoryValueViews(data, FILTER_SORT.ALPHA);

      expect(data.map((cv) => cv.label)).toEqual(["Apple", "Banana", "Zebra"]);
    });

    it("sorts by count when FILTER_SORT.COUNT is specified", () => {
      const data = [...testData];
      sortCategoryValueViews(data, FILTER_SORT.COUNT);

      expect(data.map((cv) => cv.label)).toEqual(["Apple", "Zebra", "Banana"]);
      expect(data.map((cv) => cv.count)).toEqual([10, 5, 3]);
    });

    it("modifies the original array in place", () => {
      const data = [...testData];
      const originalData = [...data];

      sortCategoryValueViews(data, FILTER_SORT.ALPHA);

      expect(data).not.toEqual(originalData);
      expect(data.length).toBe(originalData.length);
    });

    it("handles empty arrays", () => {
      const data: SelectCategoryValueView[] = [];

      expect(() => {
        sortCategoryValueViews(data, FILTER_SORT.ALPHA);
      }).not.toThrow();

      expect(data).toEqual([]);
    });

    it("handles single item arrays", () => {
      const data = [createMockCategoryValueView("Single", 1)];
      const original = [...data];

      sortCategoryValueViews(data, FILTER_SORT.COUNT);

      expect(data).toEqual(original);
    });
  });
});
