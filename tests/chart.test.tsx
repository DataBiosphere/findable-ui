import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import { SelectCategoryValueView } from "../src/common/entities";
import {
  getCategoryTotalCount,
  getCountText,
  parseTranslate,
} from "../src/components/Index/components/EntityView/components/views/ChartView/components/Chart/barX/utils";
import { CHART_TEST_ID } from "../src/components/Index/components/EntityView/components/views/ChartView/components/Chart/constants";
import * as stories from "../src/components/Index/components/EntityView/components/views/ChartView/components/Chart/stories/chart.stories";
import { PALETTE } from "../src/styles/common/constants/palette";

const CLASSNAMES = {
  TEXT_CATEGORY_LABEL: "text-category-label",
  TEXT_COUNT: "text-count",
};

const { Default, Selected } = composeStories(stories);

const DATA = Default.args.selectCategoryValueViews || [];
const SELECTED_DATA = Selected.args.selectCategoryValueViews || [];
const TOTAL_COUNT = getCategoryTotalCount(DATA);

describe("Chart", () => {
  describe("basic rendering", () => {
    let chartEl: HTMLElement;
    let svgEl: Element | null;

    beforeEach(() => {
      render(<Default testId={CHART_TEST_ID} />);
      chartEl = screen.getByTestId(CHART_TEST_ID);
      svgEl = chartEl.querySelector("svg");
    });

    it("renders correctly with default data", () => {
      expect(chartEl).toBeDefined();
      expect(svgEl).toBeDefined();
    });
  });

  describe("category labels and counts", () => {
    const counts = DATA.map((d) => mapCount(d, TOTAL_COUNT));
    const labels = DATA.map(mapLabel);
    let countTextEls: NodeListOf<SVGElement>;
    let labelTextEls: NodeListOf<SVGElement>;
    let titleTextEls: NodeListOf<SVGElement>;

    beforeEach(() => {
      render(<Default testId={CHART_TEST_ID} />);
      countTextEls = getEls(CLASSNAMES.TEXT_COUNT, "text");
      labelTextEls = getEls(CLASSNAMES.TEXT_CATEGORY_LABEL, "text");
      titleTextEls = getEls(CLASSNAMES.TEXT_CATEGORY_LABEL, "title");
    });

    it("renders category labels and matching titles", () => {
      expect(labelTextEls.length).toEqual(labels.length);
      expect(titleTextEls.length).toEqual(labels.length);
      labelTextEls.forEach((el, i) => {
        const labelText = getLabelText(el);
        const titleText = titleTextEls[i].textContent || "";
        expect(labels.some((l) => l.includes(labelText))).toBeTruthy();
        expect(labels.includes(titleText)).toBeTruthy();
      });
    });

    it("renders category counts", () => {
      expect(countTextEls.length).toEqual(counts.length);
      countTextEls.forEach(({ textContent }) => {
        expect(textContent).toBeDefined();
        expect(counts.includes(textContent || "")).toBeTruthy();
      });
    });
  });

  describe("category labels with selected values", () => {
    it("renders selected category labels with '(selected)'", () => {
      render(<Selected testId={CHART_TEST_ID} />);
      const textEls = getEls(CLASSNAMES.TEXT_CATEGORY_LABEL, "text");
      const titleEls = getEls(CLASSNAMES.TEXT_CATEGORY_LABEL, "title");
      SELECTED_DATA.forEach((selectedData, i) => {
        const labelText = getLabelText(textEls[i]);
        const titleText = titleEls[i].textContent || "";
        if (selectedData.selected) {
          const expected = `${selectedData.label} (selected)`;
          expect(titleText).toEqual(expected);
          expect(expected.includes(labelText)).toBeTruthy();
          return;
        }
        const expected = selectedData.label;
        expect(titleText).toEqual(expected);
        expect(expected.includes(labelText)).toBeTruthy();
      });
    });
  });

  describe("bars with unselected values", () => {
    let barEls: NodeListOf<SVGElement>;

    beforeEach(() => {
      render(<Default testId={CHART_TEST_ID} />);
      barEls = getEls("x-bar", "path");
    });

    it("renders correct number of bars", () => {
      expect(barEls.length).toEqual(DATA.length);
    });

    it("renders all bars in #C5E3FC", () => {
      expect([...barEls].every(isFillDefault)).toBeTruthy();
    });
  });

  describe("bars with selected values", () => {
    let barEls: NodeListOf<SVGElement>;

    beforeEach(() => {
      render(<Selected testId={CHART_TEST_ID} />);
      barEls = getEls("x-bar", "path");
    });

    it("renders no bars in #C5E3FC", () => {
      expect([...barEls].some(isFillDefault)).toBeFalsy();
    });

    it("renders at least one bar in PRIMARY_MAIN", () => {
      expect([...barEls].some(isFillPrimaryMain)).toBeTruthy();
    });
  });

  describe("bars sorted by count", () => {
    it("renders bars in descending order of count", () => {
      render(<Default testId={CHART_TEST_ID} />);
      // Order data by count in descending order.
      const counts = [...DATA]
        .sort(sortByCount)
        .map((d) => mapCount(d, TOTAL_COUNT));
      // Sort count <text> elements by their transform’s translate‑Y (vertical) value, since they’re rendered in data order.
      const countTextEls = getEls(CLASSNAMES.TEXT_COUNT, "text");
      const textContents = [...countTextEls]
        .sort(sortByTransform)
        .map(mapTextContent);
      expect(textContents).toEqual(counts);
    });
  });
});

/**
 * Finds the first text node within the given SVGElement.
 * @param el - The SVG element to search for a text node.
 * @returns The first text node found within the element.
 */
function findTextNode(el: SVGElement): Node | undefined {
  return [...el.childNodes].find(({ nodeType }) => nodeType === Node.TEXT_NODE);
}

/**
 * Get the SVG group element for a given class name.
 * @param className - Class name.
 * @returns SVG group element.
 */
function getGroupEls(className: string): HTMLCollectionOf<Element> {
  const chartEl = screen.getByTestId(CHART_TEST_ID);
  const gEls = chartEl.getElementsByClassName(className);
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
 * Retrieves the label text from a given SVGElement by extracting and processing its text content.
 * @param el - The SVGElement from which the label text is to be retrieved.
 * @returns The processed label text derived from the SVGElement.
 */
function getLabelText(el: SVGElement): string {
  const labelText = stripTrailingEllipsis(findTextNode(el)?.textContent);
  expect(labelText).toBeDefined();
  return labelText || "";
}

/**
 * Check if the fill attribute of the element is #C5E3FC.
 * @param element - Element to check.
 * @returns True if the fill attribute is #C5E3FC, false otherwise.
 */
function isFillDefault(element: Element): boolean {
  return element.getAttribute("fill") === "#C5E3FC";
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
 * Maps the count of a category value to a string representation.
 * @param categoryValueView - The category value view to be processed.
 * @param total - The total count associated with the category value.
 * @returns The formatted count text for the category value.
 */
function mapCount(
  categoryValueView: SelectCategoryValueView,
  total: number
): string {
  return getCountText(categoryValueView, total);
}

/**
 * Maps the label of a category value view to a string.
 * @param categoryValueView - Category value view.
 * @returns Label as a string.
 */
function mapLabel(categoryValueView: SelectCategoryValueView): string {
  return categoryValueView.label;
}

/**
 * Maps the text content of an SVG element to a string.
 * @param el - SVG element.
 * @returns Text content as a string.
 */
function mapTextContent(el: SVGElement): string | null {
  return el.textContent;
}

/**
 * Sorts category value views by count in descending order.
 * @param a - First category value view.
 * @param b - Second category value view.
 * @returns Sorted category value views.
 */
function sortByCount(
  a: SelectCategoryValueView,
  b: SelectCategoryValueView
): number {
  return b.count - a.count;
}

/**
 * Sorts SVG elements by their "y" transform attribute.
 * @param a - First SVG element.
 * @param b - Second SVG element.
 * @returns Sorted SVG elements.
 */
function sortByTransform(a: SVGElement, b: SVGElement): number {
  const aTransform = parseTranslate(a.getAttribute("transform"));
  const bTransform = parseTranslate(b.getAttribute("transform"));
  return aTransform[1] - bTransform[1];
}

/**
 * Strips trailing ellipsis from a string.
 * @param text - The input string.
 * @returns The string without trailing ellipsis.
 */
function stripTrailingEllipsis(text?: string | null): string {
  return (text || "").replace(/…{1,3}$/, "");
}
