import type { Meta, StoryObj } from "@storybook/react";
import React, { Fragment } from "react";
import { StepIcon } from "./stepIcon";

const meta: Meta<typeof StepIcon> = {
  component: StepIcon,
  decorators: [
    (Story, context): JSX.Element => (
      <div style={{ display: "grid", gap: 24 }}>
        <Story {...context} />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  title: "Components/Stepper/StepIcon",
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  args: {
    icon: 1,
  },
};

export const Active: Story = {
  ...Template,
  args: {
    active: true,
    completed: false,
    icon: 2,
  },
};

export const Completed: Story = {
  ...Template,
  args: {
    active: false,
    completed: true,
    icon: 3,
  },
};

export const Default: Story = {
  ...Template,
  args: {
    active: false,
    completed: false,
    icon: 1,
  },
};

export const AllStates: Story = {
  ...Template,
  render: () => (
    <Fragment>
      <StepIcon active={false} completed={false} icon={1} />
      <StepIcon active={true} completed={false} icon={2} />
      <StepIcon active={false} completed={true} icon={3} />
    </Fragment>
  ),
};
