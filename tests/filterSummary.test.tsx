import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import { FILTER_SUMMARY_TEST_ID } from "../src/components/Index/components/EntitiesView/components/FilterSummary/constants";
import { FilterSummary } from "../src/components/Index/components/EntitiesView/components/FilterSummary/filterSummary";
import * as stories from "../src/components/Index/components/EntitiesView/components/FilterSummary/stories/filterSummary.stories";

const { Default } = composeStories(stories);

describe("FilterSummary", () => {
  it("renders correctly", () => {
    render(<Default testId={FILTER_SUMMARY_TEST_ID} />);
    const summariesEl = screen.getByTestId(FILTER_SUMMARY_TEST_ID);
    expect(summariesEl).toBeDefined();
  });

  it("renders nothing when no summaries are available", () => {
    const { container } = render(
      <FilterSummary categoryFilters={[]} loading={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders correct number of summary sections", () => {
    render(<Default />);
    // Mocks include the facets `Biological Sex`, `Genus Species` and `Paired End`.
    const categoryLabels = screen.getAllByText(
      /Biological Sex|Genus Species|Paired End}/
    );
    // `Paired End` is not included in the summary, `enableSummaryView` is false.
    expect(categoryLabels.length).toBe(2);
  });

  it("renders summaries for each category", () => {
    render(<Default />);
    const svgEls = document.querySelectorAll("svg");
    expect(svgEls.length).toBe(2);
  });
});
