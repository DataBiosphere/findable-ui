import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import React from "react";
import { STEP_ICON_TEST_ID } from "../src/components/Stepper/components/Step/components/StepIcon/constants";
import * as stories from "../src/components/Stepper/components/Step/components/StepIcon/stepIcon.stories";
import { MUI_CLASSES } from "../src/tests/mui/constants";
import { getClassNames, getTagName } from "../src/utils/tests";

const { Active, Completed, Default } = composeStories(stories);

describe("StepIcon", () => {
  it("renders correctly", () => {
    render(<Default testId={STEP_ICON_TEST_ID} />);
    const stepIconEl = screen.getByTestId(STEP_ICON_TEST_ID);
    expect(stepIconEl).not.toBeNull();
  });

  it("renders inactive step icon", () => {
    render(<Default testId={STEP_ICON_TEST_ID} />);
    const stepIconEl = screen.getByTestId(STEP_ICON_TEST_ID);
    expect(stepIconEl.textContent).toEqual("1");
    expect(getClassNames(stepIconEl)).not.toContain(MUI_CLASSES.ACTIVE);
    expect(getClassNames(stepIconEl)).not.toContain(MUI_CLASSES.COMPLETED);
  });

  it("renders active step icon", () => {
    render(<Active testId={STEP_ICON_TEST_ID} />);
    const stepIconEl = screen.getByTestId(STEP_ICON_TEST_ID);
    expect(stepIconEl.textContent).toEqual("1");
    expect(getClassNames(stepIconEl)).toContain(MUI_CLASSES.ACTIVE);
    expect(getClassNames(stepIconEl)).not.toContain(MUI_CLASSES.COMPLETED);
  });

  it("renders completed step icon", () => {
    render(<Completed testId={STEP_ICON_TEST_ID} />);
    const stepIconEl = screen.getByTestId(STEP_ICON_TEST_ID);
    expect(stepIconEl.textContent).not.toEqual("1");
    expect(getClassNames(stepIconEl)).not.toContain(MUI_CLASSES.ACTIVE);
    expect(getClassNames(stepIconEl)).toContain(MUI_CLASSES.COMPLETED);
    expect(getTagName(stepIconEl.firstElementChild)).toBe("path");
  });
});
