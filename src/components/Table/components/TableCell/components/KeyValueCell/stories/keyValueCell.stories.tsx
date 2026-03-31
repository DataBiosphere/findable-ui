import { Meta, StoryObj } from "@storybook/react";
import { KeyValueCell } from "../keyValueCell";
import { DEFAULT_ARGS } from "./args";

const meta: Meta<typeof KeyValueCell> = {
  component: KeyValueCell,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: DEFAULT_ARGS,
};
