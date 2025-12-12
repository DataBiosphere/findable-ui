import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { Tag } from "./tag";
import { TagWarning } from "./tag.styles";

const meta = {
  argTypes: {
    children: { control: { disabled: true } },
  },
  component: Tag,
  title: "Components/Common/Alert/Tag",
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WarningTagStory: Story = {
  args: {
    children: "Please note",
  },
  render: (args) => <TagWarning {...args}>{args.children}</TagWarning>,
};
