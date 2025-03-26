import { Meta, StoryObj, composeStories } from "@storybook/react";
import React, { ComponentProps } from "react";
import { getDisabledControls } from "storybook/controls/utils";
import * as stories from "../components/Label/stories/label.stories";
import { Optional } from "../components/Optional/optional";
import { StepLabel } from "../stepLabel";
import { DISABLED_CONTROLS, EXCLUDED_CONTROLS } from "./contants";

const { Default: Label, WithIcon: LabelWithIcon } = composeStories(stories);

const meta: Meta<typeof StepLabel> = {
  argTypes:
    getDisabledControls<ComponentProps<typeof StepLabel>>(DISABLED_CONTROLS),
  component: StepLabel,
  parameters: { controls: { exclude: EXCLUDED_CONTROLS } },
  title: "Components/Stepper/StepLabel",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    children: <LabelWithIcon />,
    icon: 1,
    slotProps: { stepIcon: { active: true } },
  },
};

export const Completed: Story = {
  args: {
    children: <LabelWithIcon />,
    icon: 1,
    optional: <Optional>3 files selected</Optional>,
    slotProps: { stepIcon: { completed: true } },
  },
};

export const Default: Story = {
  args: {
    children: <Label />,
    icon: 1,
  },
};
