import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ToggleButtonGroup } from "../toggleButtonGroup";
import { MODE } from "../../../types";
import { fn } from "storybook/test";

const meta: Meta<typeof ToggleButtonGroup> = {
  component: ToggleButtonGroup,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DEFAULT: Story = {
  args: {
    onChange: fn(),
    value: MODE.SEARCH,
  },
};
