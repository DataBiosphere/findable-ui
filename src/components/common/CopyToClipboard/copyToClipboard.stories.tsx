import { Meta, StoryObj } from "@storybook/react";
import { CopyToClipboard } from "./copyToClipboard";

export default {
  argTypes: {
    copyStr: {
      description: "String to be copied",
    },
  },
  component: CopyToClipboard,
  title: "Components/Common/CopyToClipboard",
} as Meta<typeof CopyToClipboard>;

type Story = StoryObj<typeof CopyToClipboard>;

export const CopyToClipboardStory: Story = {
  args: {
    copyStr: "Copy me",
  },
};
