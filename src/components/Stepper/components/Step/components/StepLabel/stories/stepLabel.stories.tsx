import {
  composeStories,
  type Meta,
  type StoryObj,
} from "@storybook/nextjs-vite";
import { ComponentProps } from "react";
import { CONTROL_TYPE } from "../../../../../../../storybook/controls/types";
import { configureControls } from "../../../../../../../storybook/controls/utils";
import * as stories from "../components/Label/stories/label.stories";
import { Optional } from "../components/Optional/optional";
import { StepLabel } from "../stepLabel";
import { DISABLED_CONTROLS, EXCLUDED_CONTROLS } from "./contants";

const { Default: Label, WithIcon: LabelWithIcon } = composeStories(stories);

const meta: Meta<typeof StepLabel> = {
  argTypes: configureControls<ComponentProps<typeof StepLabel>>(
    DISABLED_CONTROLS,
    CONTROL_TYPE.DISABLED,
  ),
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
