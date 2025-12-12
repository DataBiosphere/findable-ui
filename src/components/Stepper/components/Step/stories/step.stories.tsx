import { Stepper } from "@mui/material";
import {
  type Meta,
  type StoryObj,
  composeStories,
} from "@storybook/nextjs-vite";
import React, { ComponentProps } from "react";
import { CONTROL_TYPE } from "../../../../../storybook/controls/types";
import { configureControls } from "../../../../../storybook/controls/utils";
import { LOREM_IPSUM } from "../../../../../storybook/loremIpsum";
import { STEPPER_PROPS } from "../../../../../styles/common/mui/stepper";
import { StepContent } from "../components/StepContent/stepContent";
import * as stories from "../components/StepLabel/stories/stepLabel.stories";
import { Step } from "../step";
import { BOOLEAN_CONTROLS, DISABLED_CONTROLS } from "./contants";

const {
  Active: ActiveStepLabel,
  Completed: CompletedStepLabel,
  Default: StepLabel,
} = composeStories(stories);

const meta: Meta<typeof Step> = {
  argTypes: {
    ...configureControls<ComponentProps<typeof Step>>(
      DISABLED_CONTROLS,
      CONTROL_TYPE.DISABLED
    ),
    ...configureControls<ComponentProps<typeof Step>>(
      BOOLEAN_CONTROLS,
      CONTROL_TYPE.BOOLEAN
    ),
    index: { control: { type: "number" } },
  },
  component: Step,
  decorators: [
    (Story, context): JSX.Element => (
      <Stepper
        connector={null}
        orientation={STEPPER_PROPS.ORIENTATION.VERTICAL}
        sx={{
          display: "grid",
          gridTemplateColumns: "minmax(auto, 816px)",
          height: "100vh",
          placeContent: "center center",
        }}
      >
        <Story {...context} />
      </Stepper>
    ),
  ],
  parameters: { layout: "fullscreen" },
  title: "Components/Stepper/Step",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    active: true,
    children: [
      <ActiveStepLabel key="label" />,
      <StepContent key="step-content">{LOREM_IPSUM.LONG}</StepContent>,
    ],
    completed: false,
  },
};

export const Completed: Story = {
  args: {
    active: false,
    children: [
      <CompletedStepLabel key="label" />,
      <StepContent key="step-content">{LOREM_IPSUM.LONG}</StepContent>,
    ],
    completed: true,
  },
};

export const Default: Story = {
  args: {
    active: false,
    children: [
      <StepLabel key="label" />,
      <StepContent key="step-content">{LOREM_IPSUM.LONG}</StepContent>,
    ],
    completed: false,
  },
};
