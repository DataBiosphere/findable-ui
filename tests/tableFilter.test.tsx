import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import React from "react";
import * as filterStories from "../src/components/Detail/components/Table/stories/filter/filter.stories";

const COLUMN_INDEX = {
  ARRAY: 1,
  NUMBER: 3,
  STRING: 0,
};

const {
  FilterByArrayValue,
  FilterByRangeBetweenValue,
  FilterByRangeGreaterThanValue,
  FilterByRangeLessThanValue,
  FilterByStringValue,
  FilterByStringValueWithNoMatch,
} = composeStories(filterStories);

describe("Table - Filtering", () => {
  describe("Table filter stories", () => {
    test("FilterByStringValueWithNoMatch shows no rows", () => {
      const { container } = render(<FilterByStringValueWithNoMatch />);
      const rows = container.querySelectorAll("tbody tr");
      expect(rows).toHaveLength(0);
    });

    test("FilterByStringValue shows rows matching the filters of string values", () => {
      const { container } = render(<FilterByStringValue />);
      const rows = container.querySelectorAll("tbody tr");
      expect(rows).toHaveLength(2);
      rows.forEach((row) => {
        const cell = row.querySelectorAll("td")[COLUMN_INDEX.STRING];
        const text = cell.textContent;
        expect(text).toMatch(
          /Coronary Artery Disease Study|Myocardial Infarction Study/
        );
        expect(text).not.toMatch(/Myocardial Infarction Study X/);
      });
    });

    test("FilterByArrayValue shows rows matching the filters of array values", () => {
      const { container } = render(<FilterByArrayValue />);
      const rows = container.querySelectorAll("tbody tr");
      expect(rows).toHaveLength(4);
      rows.forEach((row) => {
        const cell = row.querySelectorAll("td")[COLUMN_INDEX.ARRAY];
        const text = cell.textContent;
        expect(text).toMatch(/Exome|RNAseq/);
        // Confirm that the text "Whole Genome" is not present in any row cell as a single value.
        expect(text).not.toMatch(/^Whole Genome$/);
      });
    });

    test("FilterByRangeBetweenValue shows rows matching filters between two number values", () => {
      const { container } = render(<FilterByRangeBetweenValue />);
      const rows = container.querySelectorAll("tbody tr");
      expect(rows).toHaveLength(2);
      rows.forEach((row) => {
        const cell = row.querySelectorAll("td")[COLUMN_INDEX.NUMBER];
        const value = Number(cell.textContent);
        expect(value).toBeGreaterThanOrEqual(10);
        expect(value).toBeLessThanOrEqual(100);
      });
    });

    test("FilterByRangeGreaterThanValue shows rows matching filters greater than a number value", () => {
      const { container } = render(<FilterByRangeGreaterThanValue />);
      const rows = container.querySelectorAll("tbody tr");
      expect(rows).toHaveLength(4);
      rows.forEach((row) => {
        const cell = row.querySelectorAll("td")[COLUMN_INDEX.NUMBER];
        const value = Number(cell.textContent);
        expect(value).toBeGreaterThanOrEqual(100);
      });
    });

    test("FilterByRangeLessThanValue shows rows matching filters less than a number value", () => {
      const { container } = render(<FilterByRangeLessThanValue />);
      const rows = container.querySelectorAll("tbody tr");
      expect(rows).toHaveLength(3);
      rows.forEach((row) => {
        const cell = row.querySelectorAll("td")[COLUMN_INDEX.NUMBER];
        const value = Number(cell.textContent);
        expect(value).toBeLessThanOrEqual(100);
      });
    });
  });
});
