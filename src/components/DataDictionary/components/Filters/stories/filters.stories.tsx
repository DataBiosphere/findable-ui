import { Meta, StoryObj } from "@storybook/react";
import { Filters } from "../filters";
import { DEFAULT_ARGS } from "./args";

const meta: Meta<typeof Filters> = {
  component: Filters,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: DEFAULT_ARGS,
};
