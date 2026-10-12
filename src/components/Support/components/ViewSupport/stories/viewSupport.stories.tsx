import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ViewSupport } from "../viewSupport";

const meta: Meta<typeof ViewSupport> = {
  component: ViewSupport,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: "https://example.com/support",
  },
};
