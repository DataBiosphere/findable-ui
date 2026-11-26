import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NTagChip } from "../nTagChip";

const meta = {
  args: {
    label: "3 species",
  },
  component: NTagChip,
} satisfies Meta<typeof NTagChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DEFAULT: Story = {};
