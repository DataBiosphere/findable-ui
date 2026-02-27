import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Beta } from "../beta";

const meta: Meta<typeof Beta> = {
  component: Beta,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DEFAULT: Story = {};
