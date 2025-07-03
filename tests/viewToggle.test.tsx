import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import * as stories from "../src/components/Index/components/EntityView/components/common/ViewToggle/stories/viewToggle.stories";
import { TEST_IDS } from "../src/tests/testIds";

const { Default } = composeStories(stories);

describe("ViewToggle", () => {
  it("renders correctly", () => {
    render(<Default testId={TEST_IDS.VIEW_TOGGLE} />);
    const viewEl = screen.getByTestId(TEST_IDS.VIEW_TOGGLE);
    expect(viewEl).not.toBeNull();
  });

  it("does not render toggle buttons when disabled", () => {
    render(
      <Default testId={TEST_IDS.VIEW_TOGGLE} viewStatus={{ disabled: true }} />
    );
    const viewEl = screen.queryByTestId(TEST_IDS.VIEW_TOGGLE);
    expect(viewEl).toBeNull();
  });

  it("renders toggle buttons when enabled", () => {
    render(<Default testId={TEST_IDS.VIEW_TOGGLE} />);
    const viewEl = screen.getByTestId(TEST_IDS.VIEW_TOGGLE);
    const buttonsEl = viewEl.getElementsByClassName("MuiToggleButton-root");
    expect(buttonsEl.length).toEqual(2);
  });
});
