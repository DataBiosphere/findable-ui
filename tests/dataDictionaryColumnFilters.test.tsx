import { matchers } from "@emotion/jest";
import { jest } from "@jest/globals";
import { composeStories } from "@storybook/react";
import { waitFor } from "@storybook/test";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import * as stories from "../src/components/DataDictionary/components/Filters/stories/filters.stories";
import { MUI_CLASSES } from "../src/tests/mui/constants";
import {
  getButton,
  getRole,
  getStartsWithRegex,
  getText,
} from "../src/tests/utils";

expect.extend(matchers);

const { Default } = composeStories(stories);

describe("DataDictionaryColumnFilters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<Default />);
  });

  it("renders correctly", async () => {
    expect(await screen.findByText("Required")).toBeInTheDocument();
  });

  it("renders all filterable column headers", async () => {
    expect(await screen.findByText("Required")).toBeInTheDocument();
    expect(await screen.findByText("BioNetwork")).toBeInTheDocument();
    expect(screen.queryByText("Example")).not.toBeInTheDocument();
  });

  it("renders BioNetwork filter options", async () => {
    const buttonEl = getButton("BioNetwork");
    fireEvent.click(buttonEl);
    // Wait for menu to open.
    await waitFor(() => expect(getRole("menu")).toBeInTheDocument());
    expect(getText("Brain")).toBeInTheDocument();
    expect(getText("Lung")).toBeInTheDocument();
    expect(getText("Nervous System")).toBeInTheDocument();
  });

  it("renders BioNetwork filter options in alphabetical order", async () => {
    const buttonEl = getButton("BioNetwork");
    fireEvent.click(buttonEl);
    // Wait for menu to open.
    await waitFor(() => expect(getRole("menu")).toBeInTheDocument());
    const optionEls = within(getRole("menu")).getAllByRole("button");
    ["Brain", "Lung", "Nervous System", "Clear All"].forEach((expected, i) => {
      expect(optionEls[i].textContent).toMatch(getStartsWithRegex(expected));
    });
  });

  it("can select and deselect a filter option", async () => {
    const buttonEl = getButton("BioNetwork");
    fireEvent.click(buttonEl);
    // Wait for menu to open.
    await waitFor(() => expect(getRole("menu")).toBeInTheDocument());
    // Select first option.
    const optionEls = within(getRole("menu")).getAllByRole("button");
    const optionEl = optionEls[0];
    fireEvent.click(optionEl);
    await waitFor(() => expect(optionEl).toHaveClass(MUI_CLASSES.SELECTED));
    // Deselect first option.
    fireEvent.click(optionEl);
    await waitFor(() => expect(optionEl).not.toHaveClass(MUI_CLASSES.SELECTED));
  });

  it("clears all filters", async () => {
    const buttonEl = getButton("BioNetwork");
    fireEvent.click(buttonEl);
    // Wait for menu to open.
    await waitFor(() => expect(getRole("menu")).toBeInTheDocument());
    // Select all options.
    const optionEls = within(getRole("menu")).getAllByRole("button");
    optionEls.forEach(async (el) => {
      fireEvent.click(el);
      await waitFor(() => expect(el).toHaveClass(MUI_CLASSES.SELECTED));
    });
    // Select "Clear All" button.
    const clearEl = getButton("Clear All");
    fireEvent.click(clearEl);
    // Wait for options to be deselected.
    await waitFor(() =>
      optionEls.forEach((el) =>
        expect(el).not.toHaveClass(MUI_CLASSES.SELECTED)
      )
    );
  });
});
