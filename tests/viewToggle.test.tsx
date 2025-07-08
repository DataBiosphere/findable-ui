import { jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import { VIEW_MODE } from "../src/components/Index/components/EntityView/components/controls/ViewToggle/hooks/UseViewToggle/types";
import { TEST_IDS } from "../src/tests/testIds";

jest.unstable_mockModule(
  "../src/components/Index/components/EntityView/context/hook",
  () => ({
    useEntityView: jest.fn(),
  })
);

const { useEntityView } = await import(
  "../src/components/Index/components/EntityView/context/hook"
);
const { composeStories } = await import("@storybook/react");
const stories = await import(
  "../src/components/Index/components/EntityView/components/controls/ViewToggle/stories/viewToggle.stories"
);

const { Default } = composeStories(stories);

describe("ViewToggle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useEntityView as jest.Mock).mockReturnValue({
      onChange: jest.fn(),
      viewMode: VIEW_MODE.TABLE,
      viewStatus: { disabled: false },
    });
  });
  it("renders correctly", () => {
    render(<Default testId={TEST_IDS.VIEW_TOGGLE} />);
    const viewEl = screen.getByTestId(TEST_IDS.VIEW_TOGGLE);
    expect(viewEl).not.toBeNull();
  });

  it("does not render toggle buttons when disabled", () => {
    (useEntityView as jest.Mock).mockReturnValue({
      onChange: jest.fn(),
      viewMode: VIEW_MODE.TABLE,
      viewStatus: { disabled: true },
    });
    render(<Default testId={TEST_IDS.VIEW_TOGGLE} />);
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
