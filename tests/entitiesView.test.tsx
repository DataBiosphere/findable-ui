import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import { ENTITIES_VIEW_TEST_ID } from "../src/components/Index/components/EntitiesView/constants";
import { VIEW_MODE } from "../src/components/Index/components/EntitiesView/hooks/UseEntitiesView/types";
import * as stories from "../src/components/Index/components/EntitiesView/stories/entitiesView.stories";

const { Default } = composeStories(stories);

describe("EntitiesView", () => {
  it("renders correctly", () => {
    render(<Default testId={ENTITIES_VIEW_TEST_ID} />);
    const viewEl = screen.getByTestId(ENTITIES_VIEW_TEST_ID);
    expect(viewEl).not.toBeNull();
  });

  it("does not render toggle buttons when disabled", () => {
    render(<Default testId={ENTITIES_VIEW_TEST_ID} />);
    const viewEl = screen.getByTestId(ENTITIES_VIEW_TEST_ID);
    const buttonsEl = viewEl.getElementsByClassName("MuiToggleButton-root");
    expect(buttonsEl.length).toEqual(0);
  });

  it("renders toggle buttons when enabled", () => {
    render(
      <Default
        testId={ENTITIES_VIEW_TEST_ID}
        viewMode={VIEW_MODE.TABLE}
        viewStatus={{ disabled: false }}
      />
    );
    const viewEl = screen.getByTestId(ENTITIES_VIEW_TEST_ID);
    const buttonsEl = viewEl.getElementsByClassName("MuiToggleButton-root");
    expect(buttonsEl.length).toEqual(2);
  });
});
