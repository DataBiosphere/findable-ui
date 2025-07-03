import { Meta, StoryObj } from "@storybook/react";
import { Index } from "../index";

const meta: Meta<typeof Index> = {
  component: Index,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    Tabs: undefined,
    title: "Explore Data",
  },
};
