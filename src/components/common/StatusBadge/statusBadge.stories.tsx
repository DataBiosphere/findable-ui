import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatusBadge } from "./statusBadge";

export default {
  component: StatusBadge,
  title: "Components/Common/StatusBadge",
} as Meta<typeof StatusBadge>;

type Story = StoryObj<typeof StatusBadge>;

export const StatusStory: Story = {
  args: {
    clickable: false,
    color: "success",
    label: "Access Granted",
    onDelete: undefined,
  },
};
