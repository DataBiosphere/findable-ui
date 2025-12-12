import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { Fragment } from "react";
import { StepIcon } from "../stepIcon";

const meta: Meta<typeof StepIcon> = {
  component: StepIcon,
  decorators: [
    (Story, context): JSX.Element => (
      <div style={{ display: "grid", gap: 24 }}>
        <Story {...context} />
      </div>
    ),
  ],
  title: "Components/Stepper/StepIcon",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    active: true,
    completed: false,
    icon: 1,
  },
};

export const Completed: Story = {
  args: {
    active: false,
    completed: true,
    icon: 1,
  },
};

export const Default: Story = {
  args: {
    active: false,
    completed: false,
    icon: 1,
  },
};

export const AllStates: Story = {
  render: () => (
    <Fragment>
      <StepIcon active={false} completed={false} icon={1} />
      <StepIcon active={true} completed={false} icon={2} />
      <StepIcon active={false} completed={true} icon={3} />
    </Fragment>
  ),
};
