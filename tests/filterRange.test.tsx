import { composeStories } from "@storybook/react";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import * as stories from "../src/components/Filter/components/FilterRange/stories/filterRange.stories";
import { MUI_CLASSES } from "../src/tests/mui/constants";
import { TEST_IDS } from "../src/tests/testIds";
import { getClassNames } from "../src/utils/tests";

const BETWEEN = "Between";
const GREATER_THAN = "Greater Than";
const LESS_THAN = "Less Than";

const { Default } = composeStories(stories);

describe("FilterRange", () => {
  let filterEl: HTMLFormElement;

  beforeEach(() => {
    render(<Default />);
    filterEl = screen.getByTestId(TEST_IDS.FILTER_RANGE);
  });

  describe("Operator BETWEEN", () => {
    it("renders the toggle buttons with correct text", () => {
      expect(screen.getByRole("button", { name: BETWEEN })).toBeDefined();
      expect(screen.getByRole("button", { name: LESS_THAN })).toBeDefined();
      expect(screen.getByRole("button", { name: GREATER_THAN })).toBeDefined();
    });

    it("renders BETWEEN toggle button as selected", () => {
      expect(
        getClassNames(screen.getByRole("button", { name: BETWEEN }))
      ).toContain(MUI_CLASSES.SELECTED);
    });

    it("renders BETWEEN input fields with correct labels", () => {
      expect(filterEl.querySelectorAll("label")).toHaveLength(2);
      expect(filterEl.querySelectorAll("input")).toHaveLength(2);
      expect(filterEl.querySelector('label[for="between"]')).toBeDefined();
      expect(filterEl.querySelector('label[for="between-to"]')).toBeDefined();
      expect(filterEl.querySelector('input[name="between"]')).toBeDefined();
      expect(filterEl.querySelector('input[name="between-to"]')).toBeDefined();
    });

    it("renders filter button", () => {
      expect(screen.findByText("Filter")).toBeDefined();
    });
  });

  describe("Operator LESS THAN", () => {
    beforeEach(() => {
      fireEvent.click(screen.getByRole("button", { name: LESS_THAN }));
    });

    it("renders LESS THAN toggle button as selected", () => {
      expect(
        getClassNames(screen.getByRole("button", { name: LESS_THAN }))
      ).toContain(MUI_CLASSES.SELECTED);
    });

    it("renders LESS THAN input field with correct label", () => {
      expect(filterEl.querySelectorAll("label")).toHaveLength(1);
      expect(filterEl.querySelectorAll("input")).toHaveLength(1);
      expect(filterEl.querySelector('label[for="lessThan"]')).toBeDefined();
      expect(filterEl.querySelector('input[name="lessThan"]')).toBeDefined();
    });
  });

  describe("Operator GREATER THAN", () => {
    beforeEach(() => {
      fireEvent.click(screen.getByRole("button", { name: GREATER_THAN }));
    });

    it("renders GREATER THAN toggle button as selected", () => {
      expect(
        getClassNames(screen.getByRole("button", { name: GREATER_THAN }))
      ).toContain(MUI_CLASSES.SELECTED);
    });

    it("renders GREATER THAN input field with correct label", () => {
      expect(filterEl.querySelectorAll("label")).toHaveLength(1);
      expect(filterEl.querySelectorAll("input")).toHaveLength(1);
      expect(filterEl.querySelector('label[for="greaterThan"]')).toBeDefined();
      expect(filterEl.querySelector('input[name="greaterThan"]')).toBeDefined();
    });
  });
});
