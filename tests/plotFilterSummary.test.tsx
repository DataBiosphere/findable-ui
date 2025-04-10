import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import { SelectCategoryValueView } from "../src/common/entities";
import { SUMMARY_TEST_ID } from "../src/components/Index/components/EntitiesView/components/FilterSummary/components/Summary/constants";
import * as stories from "../src/components/Index/components/EntitiesView/components/FilterSummary/components/Summary/stories/summary.stories";
import { PALETTE } from "../src/styles/common/mui/palette";

const { Default, Selected } = composeStories(stories);

const DATA = Default.args.data || [];

describe("PlotFilterSummary", () => {
  describe("basic rendering", () => {
    let summaryEl: HTMLElement;
    let svgEl: Element | null;

    beforeEach(() => {
      render(<Default testId={SUMMARY_TEST_ID} />);
      summaryEl = screen.getByTestId(SUMMARY_TEST_ID);
      svgEl = summaryEl.querySelector("svg");
    });

    it("renders correctly with default data", () => {
      expect(summaryEl).toBeDefined();
      expect(svgEl).toBeDefined();
    });
  });

  describe("category labels and counts", () => {
    let countSet: Set<string>;
    let countTextEls: NodeListOf<SVGElement>;
    let labelSet: Set<string>;
    let labelTextEls: NodeListOf<SVGElement>;

    beforeEach(() => {
      render(<Default testId={SUMMARY_TEST_ID} />);
      countSet = new Set(DATA.map(mapCount));
      countTextEls = getEls("text-count", "text");
      labelSet = new Set(DATA.map(mapLabel));
      labelTextEls = getEls("text-category-label", "text");
    });

    it("renders category labels", () => {
      expect(labelTextEls.length).toEqual(labelSet.size);
      labelTextEls.forEach(({ textContent }) => {
        expect(textContent).toBeDefined();
        expect(labelSet.has(textContent || "")).toBeTruthy();
      });
    });

    it("renders category counts", () => {
      expect(countTextEls.length).toEqual(countSet.size);
      countTextEls.forEach(({ textContent }) => {
        expect(textContent).toBeDefined();
        expect(countSet.has(textContent || "")).toBeTruthy();
      });
    });
  });

  describe("bars with unselected values", () => {
    let barEls: NodeListOf<SVGElement>;

    beforeEach(() => {
      render(<Default testId={SUMMARY_TEST_ID} />);
      barEls = getEls("x-bar", "path");
    });

    it("renders correct number of bars", () => {
      expect(barEls.length).toEqual(DATA.length);
    });

    it("renders all bars in #C5E3FC", () => {
      barEls.forEach((barEl) => {
        expect(barEl.getAttribute("fill")).toEqual("#C5E3FC");
      });
    });
  });

  describe("bars with selected values", () => {
    let barEls: NodeListOf<SVGElement>;

    beforeEach(() => {
      render(<Selected testId={SUMMARY_TEST_ID} />);
      barEls = getEls("x-bar", "path");
    });

    it("renders no bars in #C5E3FC", () => {
      barEls.forEach((barEl) => {
        expect(barEl.getAttribute("fill")).not.toEqual("#C5E3FC");
      });
    });

    it("renders at least one bar in PRIMARY_MAIN", () => {
      const hasPrimaryMain = [...barEls].some(isFillPrimaryMain);
      expect(hasPrimaryMain).toBeTruthy();
    });
  });
});

/**
 * Get the SVG group element for a given class name.
 * @param className - Class name.
 * @returns SVG group element.
 */
function getGroupEls(className: string): HTMLCollectionOf<Element> {
  const summaryEl = screen.getByTestId(SUMMARY_TEST_ID);
  const gEls = summaryEl.getElementsByClassName(className);
  expect(gEls.length).toEqual(1);
  return gEls;
}

/**
 * Get the SVG elements for a given class name and selectors.
 * @param className - Class name.
 * @param selectors - Selectors.
 * @returns SVG elements.
 */
function getEls(className: string, selectors: string): NodeListOf<SVGElement> {
  const gEls = getGroupEls(className);
  return gEls[0].querySelectorAll(selectors);
}

/**
 * Check if the fill attribute of the element is PRIMARY_MAIN.
 * @param element - Element.
 * @returns True if the fill attribute is PRIMARY_MAIN, false otherwise.
 */
function isFillPrimaryMain(element: Element): boolean {
  return element.getAttribute("fill") === PALETTE.PRIMARY_MAIN;
}

/**
 * Maps the count of a category value view to a string.
 * @param categoryValueView - Category value view.
 * @returns Count as a string.
 */
function mapCount(categoryValueView: SelectCategoryValueView): string {
  return categoryValueView.count.toLocaleString();
}

/**
 * Maps the label of a category value view to a string.
 * @param categoryValueView - Category value view.
 * @returns Label as a string.
 */
function mapLabel(categoryValueView: SelectCategoryValueView): string {
  return categoryValueView.label;
}
