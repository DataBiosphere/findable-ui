import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import { VIEW_MODE } from "../src/components/Index/components/EntitiesView/hooks/UseEntitiesView/types";
import * as stories from "../src/components/Index/components/EntitiesView/stories/entitiesView.stories";
import { TEST_IDS } from "../src/tests/testIds";

const { Default } = composeStories(stories);

describe("EntitiesView", () => {
  it("renders correctly", () => {
    render(<Default />);
    const viewEl = screen.getByTestId(TEST_IDS.ENTITIES_VIEW);
    expect(viewEl).not.toBeNull();
  });

  it("does not render toggle buttons when disabled", () => {
    render(<Default />);
    const viewEl = screen.getByTestId(TEST_IDS.ENTITIES_VIEW);
    const buttonsEl = viewEl.getElementsByClassName("MuiToggleButton-root");
    expect(buttonsEl.length).toEqual(0);
  });

  it("renders toggle buttons when enabled", () => {
    render(
      <Default viewMode={VIEW_MODE.TABLE} viewStatus={{ disabled: false }} />
    );
    const viewEl = screen.getByTestId(TEST_IDS.ENTITIES_VIEW);
    const buttonsEl = viewEl.getElementsByClassName("MuiToggleButton-root");
    expect(buttonsEl.length).toEqual(2);
  });
});
