import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import { CHART_VIEW_TEST_ID } from "../src/components/Index/components/EntityView/components/views/ChartView/constants";
import * as stories from "../src/components/Index/components/EntityView/components/views/ChartView/stories/chartView.stories";

const { Default } = composeStories(stories);

describe("ChartView", () => {
  it("renders correctly", () => {
    render(<Default testId={CHART_VIEW_TEST_ID} />);
    const chartEl = screen.getByTestId(CHART_VIEW_TEST_ID);
    expect(chartEl).toBeDefined();
  });

  it("renders nothing when no categories are available", () => {
    render(<Default categoryFilters={[]} testId={CHART_VIEW_TEST_ID} />);
    expect(screen.queryByTestId(CHART_VIEW_TEST_ID)).toBeNull();
  });

  it("renders correct number of chart sections", () => {
    render(<Default />);
    // Mocks include the facets `Biological Sex`, `Genus Species` and `Paired End`.
    const categoryLabels = screen.getAllByText(
      /Biological Sex|Genus Species|Paired End}/
    );
    // `Paired End` is not included in the chart view, `enableChartView` is false.
    expect(categoryLabels.length).toBe(2);
  });

  it("renders chart titles correctly", () => {
    render(<Default />);
    const {
      args: { entityName },
    } = Default;
    ["Biological Sex", "Genus Species"].forEach((category) => {
      expect(
        screen.getByText(new RegExp(`${entityName} by ${category}`))
      ).toBeDefined();
    });
  });

  it("renders charts for each category", () => {
    render(<Default />);
    const svgEls = document.querySelectorAll("svg");
    expect(svgEls.length).toBe(2);
  });
});
