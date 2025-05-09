import { jest } from "@jest/globals";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import { CategoryView } from "../src/common/categories/views/types";
import { CategoryFilter } from "../src/components/Filter/components/Filters/filters";
import * as stories from "../src/components/Filter/components/Filters/stories/filters.stories";
import { TEST_IDS } from "../src/tests/testIds";
import { getButton, getStartsWithRegex, getText } from "../src/tests/utils";

const { Default } = composeStories(stories);

const CATEGORY_FILTERS = Default.args.categoryFilters;

/**
 * Tests for the Filters component.
 */

describe("Filters", () => {
  let filtersEl: HTMLElement;

  describe("UI rendering", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      render(<Default />);
      filtersEl = screen.getByTestId(TEST_IDS.FILTERS);
      expect(filtersEl).toBeDefined();
    });

    it("renders all category filter labels", () => {
      for (const { label } of CATEGORY_FILTERS || []) {
        if (!label) continue;
        expect(getText(label)).toBeDefined();
      }
    });

    it("renders all category view filters", () => {
      const CATEGORY_VIEWS = getCategoryViews(CATEGORY_FILTERS);
      expect(screen.getAllByRole("button")).toHaveLength(CATEGORY_VIEWS.length);
      for (const { label } of CATEGORY_VIEWS) {
        expect(getButton(getStartsWithRegex(label))).toBeDefined();
      }
    });
  });

  it("renders nothing if categoryFilters is empty", () => {
    render(<Default categoryFilters={[]} />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });
});

/**
 * Returns all category views from the given category filters.
 * @param categoryFilters - Array of category filters.
 * @returns Array of category views.
 */
function getCategoryViews(
  categoryFilters: CategoryFilter[] = []
): CategoryView[] {
  return categoryFilters.flatMap(({ categoryViews }) => categoryViews);
}
