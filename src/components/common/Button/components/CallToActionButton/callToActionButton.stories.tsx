import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ANCHOR_TARGET } from "../../../../Links/common/entities";
import { CallToAction, CallToActionButton } from "./callToActionButton";

const meta = {
  component: CallToActionButton,
  title: "Components/Common/CallToActionButton",
} satisfies Meta<typeof CallToActionButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const callToAction: CallToAction = {
  label: "Click here",
  target: ANCHOR_TARGET.BLANK,
  url: "https://www.google.com",
};

export const CallToActionButtonStory: Story = {
  args: {
    callToAction,
    className: "call-to-action-button",
    disabled: false,
  },
};

export const CallToActionButtonWithCustomComponentStory: Story = {
  args: {
    ButtonElType: "a",
    callToAction,
  },
};
