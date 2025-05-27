import { matchers } from "@emotion/jest";
import { composeStories } from "@storybook/react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import * as stories from "../src/components/DataDictionary/components/Filters/stories/filters.stories";

expect.extend(matchers);

const { Default } = composeStories(stories);

describe("DataDictionaryColumnFilters", () => {
  it("renders correctly", async () => {
    render(<Default />);
    expect(await screen.findByText("Required")).toBeInTheDocument();
  });
});
