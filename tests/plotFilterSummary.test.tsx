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
  it("renders correctly with default data", () => {
    render(<Default testId={SUMMARY_TEST_ID} />);
    const summaryEl = screen.getByTestId(SUMMARY_TEST_ID);
    expect(summaryEl).toBeDefined();
    const svgEl = summaryEl.querySelector("svg");
    expect(svgEl).toBeDefined();
  });

  it("renders correct number of bars", () => {
    render(<Default testId={SUMMARY_TEST_ID} />);
    const barEls = getEls("x-bar", "path");
    expect(barEls.length).toEqual(DATA.length);
  });

  it("renders category labels", () => {
    render(<Default testId={SUMMARY_TEST_ID} />);
    const textEls = getEls("text-category-label", "text");
    const labelSet = new Set(DATA.map(mapLabel));
    expect(textEls.length).toEqual(labelSet.size);
    textEls.forEach(({ textContent }) => {
      expect(textContent).toBeDefined();
      expect(labelSet.has(textContent || "")).toBeTruthy();
    });
  });

  it("renders category counts", () => {
    render(<Default testId={SUMMARY_TEST_ID} />);
    const textEls = getEls("text-count", "text");
    const countSet = new Set(DATA.map(mapCount));
    expect(textEls.length).toEqual(countSet.size);
    textEls.forEach(({ textContent }) => {
      expect(textContent).toBeDefined();
      expect(countSet.has(textContent || "")).toBeTruthy();
    });
  });

  // add test to test the color of the bars; a category set with no selected values should render all bars in #C5E3FC
  it("renders all bars in #C5E3FC when no values are selected", () => {
    render(<Default testId={SUMMARY_TEST_ID} />);
    const barEls = getEls("x-bar", "path");
    barEls.forEach((barEl) => {
      expect(barEl.getAttribute("fill")).toEqual("#C5E3FC");
    });
  });

  it("renders no bars in #C5E3FC when values are selected", () => {
    render(<Selected testId={SUMMARY_TEST_ID} />);
    const barEls = getEls("x-bar", "path");
    barEls.forEach((barEl) => {
      expect(barEl.getAttribute("fill")).not.toEqual("#C5E3FC");
    });
  });

  it("renders at least one bar in PRIMARY_MAIN when values are selected", () => {
    render(<Selected testId={SUMMARY_TEST_ID} />);
    const barEls = getEls("x-bar", "path");
    const hasPrimaryMain = [...barEls].some(isFillPrimaryMain);
    expect(hasPrimaryMain).toBeTruthy();
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
