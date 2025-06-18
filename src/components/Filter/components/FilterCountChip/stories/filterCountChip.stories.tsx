import { Meta, StoryObj } from "@storybook/react";
import { FilterCountChip } from "../filterCountChip";

const meta: Meta<typeof FilterCountChip> = {
  component: FilterCountChip,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DEFAULT: Story = { args: { count: 1, onDelete: undefined } };
