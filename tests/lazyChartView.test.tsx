import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { CHART_VIEW_TEST_ID } from "../src/components/Index/components/EntityView/components/views/ChartView/constants";
import * as stories from "../src/components/Index/components/EntityView/components/views/ChartView/stories/lazyChartView.stories";

const { Default } = composeStories(stories);

beforeAll(() => {
  // jsdom does not implement these SVG layout APIs, which the chart's label
  // repositioning uses inside a requestAnimationFrame callback. Because these
  // tests await the lazily-loaded chart (giving that callback time to run),
  // stub them so it short-circuits on the falsy transform matrix instead of
  // throwing.
  SVGElement.prototype.getCTM = (): DOMMatrix | null => null;
  SVGElement.prototype.getBBox = (): DOMRect => ({ width: 0 }) as DOMRect;
});

describe("LazyChartView", () => {
  it("renders the lazily-loaded chart view once the Suspense boundary resolves", async () => {
    render(<Default testId={CHART_VIEW_TEST_ID} />);
    // ChartView is code-split and loaded lazily behind a Suspense boundary;
    // findBy* waits for the async chunk to resolve and the chart to render.
    const chartEl = await screen.findByTestId(CHART_VIEW_TEST_ID);
    expect(chartEl).toBeDefined();
  });

  it("renders the expected number of chart sections after resolving", async () => {
    render(<Default />);
    // Wait for the lazily-loaded chart to resolve, then assert on its content.
    // Mocks include the facets `Biological Sex` and `Genus Species`; `Paired End`
    // is excluded from the chart view (`enable` is false).
    const categoryLabels = await screen.findAllByText(
      /Biological Sex|Genus Species/,
    );
    expect(categoryLabels.length).toBe(2);
  });
});
