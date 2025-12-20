import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AiSwitch } from "../aiSwitch";

const meta: Meta<typeof AiSwitch> = {
  component: AiSwitch,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DEFAULT: Story = {
  args: { enabled: true },
};
