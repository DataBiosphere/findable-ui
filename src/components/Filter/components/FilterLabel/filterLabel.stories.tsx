import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FilterLabel } from "./filterLabel";

const meta = {
  argTypes: {
    count: { control: "number" },
    disabled: { control: "boolean" },
    isOpen: { control: "boolean" },
    label: { control: "text" },
  },
  component: FilterLabel,
  decorators: [
    (Story): JSX.Element => (
      <div style={{ padding: "8px 12px 8px 16px", width: 264 }}>
        <Story />
      </div>
    ),
  ],
  title: "Components/Filter/FilterLabel",
} satisfies Meta<typeof FilterLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FilterLabelStory: Story = {
  args: {
    count: 123,
    disabled: false,
    isOpen: false,
    label: "Label",
    onClick: () => {},
  },
};
