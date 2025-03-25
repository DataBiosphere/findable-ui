import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import { STEP_ICON_TEST_ID } from "../src/components/Stepper/components/Step/components/StepIcon/constants";
import * as stories from "../src/components/Stepper/components/Step/components/StepIcon/stepIcon.stories";
import { withTheme } from "../src/theme/tests/utils/themeProvider";

const { Completed, Default } = composeStories(stories);

describe("StepIcon", () => {
  it("renders correctly", () => {
    render(withTheme(<Default testId={STEP_ICON_TEST_ID} />));
    const stepIconEl = screen.getByTestId(STEP_ICON_TEST_ID);
    expect(stepIconEl).not.toBeNull();
  });

  it("renders completed icon", () => {
    render(withTheme(<Completed icon={1} testId={STEP_ICON_TEST_ID} />));
    const stepIconEl = screen.getByTestId(STEP_ICON_TEST_ID);
    expect(stepIconEl).not.toBeNull();
    expect(stepIconEl.getAttribute("class")).toContain("Mui-completed");
    expect(stepIconEl.textContent).not.toEqual("1");
    expect(stepIconEl.firstElementChild?.tagName).toBe("path");
  });
});
