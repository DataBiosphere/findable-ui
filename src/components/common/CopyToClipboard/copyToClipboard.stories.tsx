import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CopyToClipboard } from "./copyToClipboard";

const meta = {
  argTypes: {
    copyStr: {
      description: "String to be copied",
    },
  },
  component: CopyToClipboard,
  title: "Components/Common/CopyToClipboard",
} satisfies Meta<typeof CopyToClipboard>;

export default meta;

type Story = StoryObj<typeof CopyToClipboard>;

export const CopyToClipboardStory: Story = {
  args: {
    copyStr: "Copy me",
  },
};
