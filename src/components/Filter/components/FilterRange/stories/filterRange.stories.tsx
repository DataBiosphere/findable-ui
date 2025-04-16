import { Meta, StoryObj } from "@storybook/react";
import { FilterRange } from "../filterRange";

const meta: Meta<typeof FilterRange> = {
  args: {},
  component: FilterRange,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
