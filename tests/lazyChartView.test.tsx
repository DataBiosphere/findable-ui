import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { CHART_VIEW_TEST_ID } from "../src/components/Index/components/EntityView/components/views/ChartView/constants";
import * as stories from "../src/components/Index/components/EntityView/components/views/ChartView/stories/lazyChartView.stories";

const { Default } = composeStories(stories);

// Loading the code-split chart chunk and rendering the (CPU-heavy) plot can
// exceed the default 1s findBy / 5s test timeout on a loaded CI machine, so
// give the lazy/Suspense assertions generous, explicit budgets.
const FIND_TIMEOUT = 10000;
const TEST_TIMEOUT = 15000;

// getCTM and getBBox are declared on SVGGraphicsElement, but the stubs go on
// SVGElement.prototype so every SVG node the chart renders inherits them.
const svgPrototype = SVGElement.prototype as SVGGraphicsElement;

const originalGetCTM = svgPrototype.getCTM;
const originalGetBBox = svgPrototype.getBBox;

beforeAll(() => {
  // jsdom does not implement these SVG layout APIs, which the chart's label
  // repositioning uses inside a requestAnimationFrame callback. Because these
  // tests await the lazily-loaded chart (giving that callback time to run),
  // stub them so it short-circuits on the falsy transform matrix instead of
  // throwing.
  svgPrototype.getCTM = (): DOMMatrix | null => null;
  svgPrototype.getBBox = (): DOMRect => ({ width: 0 }) as DOMRect;
});

afterAll(() => {
  // Restore the originals so the stubs do not leak into other test files.
  svgPrototype.getCTM = originalGetCTM;
  svgPrototype.getBBox = originalGetBBox;
});

describe("LazyChartView", () => {
  it(
    "renders the lazily-loaded chart view once the Suspense boundary resolves",
    async () => {
      render(<Default testId={CHART_VIEW_TEST_ID} />);
      // ChartView is code-split and loaded lazily behind a Suspense boundary;
      // findBy* waits for the async chunk to resolve and the chart to render.
      const chartEl = await screen.findByTestId(CHART_VIEW_TEST_ID, undefined, {
        timeout: FIND_TIMEOUT,
      });
      expect(chartEl).toBeDefined();
    },
    TEST_TIMEOUT,
  );

  it(
    "renders the expected number of chart sections after resolving",
    async () => {
      render(<Default />);
      // Wait for the lazily-loaded chart to resolve, then assert on its content.
      // Mocks include the facets `Biological Sex` and `Genus Species`; `Paired End`
      // is excluded from the chart view (`enable` is false).
      const categoryLabels = await screen.findAllByText(
        /Biological Sex|Genus Species/,
        undefined,
        { timeout: FIND_TIMEOUT },
      );
      expect(categoryLabels.length).toBe(2);
    },
    TEST_TIMEOUT,
  );
});
