import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ANCHOR_TARGET } from "../../../../Links/common/entities";
import { HelpIconButton } from "./helpIconButton";

const meta = {
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large"] },
    target: { control: "select", options: Object.values(ANCHOR_TARGET) },
    url: { control: "text" },
  },
  component: HelpIconButton,
  title: "Components/Common/HelpIconButton",
} satisfies Meta<typeof HelpIconButton>;

export default meta;

type Story = StoryObj<typeof HelpIconButton>;

export const HelpIconButtonStory: Story = {
  args: {
    size: "small",
    target: ANCHOR_TARGET.BLANK,
    url: "https://www.google.com/",
  },
};
