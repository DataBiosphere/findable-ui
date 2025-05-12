import { Meta, StoryObj } from "@storybook/react";
import { FilterRange } from "../filterRange";
import { DEFAULT_ARGS } from "./args";

const meta: Meta<typeof FilterRange> = {
  component: FilterRange,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: DEFAULT_ARGS,
};
