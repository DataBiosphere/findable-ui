import { Meta, StoryObj } from "@storybook/react";
import { ANCHOR_TARGET } from "../../../../Links/common/entities";
import { HelpIconButton } from "./helpIconButton";

const meta: Meta<typeof HelpIconButton> = {
  argTypes: {
    size: { control: "select" },
    target: { control: "select" },
    url: { control: "text" },
  },
  component: HelpIconButton,
  title: "Components/Common/HelpIconButton",
};

export default meta;

type Story = StoryObj<typeof HelpIconButton>;

export const HelpIconButtonStory: Story = {
  args: {
    size: "small",
    target: ANCHOR_TARGET.BLANK,
    url: "https://www.google.com/",
  },
};
