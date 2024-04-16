import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ANCHOR_TARGET } from "../../../../Links/common/entities";
import { CallToAction, CallToActionButton } from "./callToActionButton";

export default {
  argTypes: {
    children: { control: { disabled: true } },
  },
  component: CallToActionButton,
  title: "Components/Common/CallToActionButton",
} as ComponentMeta<typeof CallToActionButton>;

const CallToActionButtonTemplate: ComponentStory<typeof CallToActionButton> = (
  args
) => <CallToActionButton {...args} />;

const callToAction: CallToAction = {
  label: "Click here",
  target: ANCHOR_TARGET.BLANK,
  url: "https://www.google.com",
};

export const CallToActionButtonStory = CallToActionButtonTemplate.bind({});
CallToActionButtonStory.args = {
  callToAction,
  className: "call-to-action-button",
  disabled: false,
};

export const CallToActionButtonWithCustomComponentStory =
  CallToActionButtonTemplate.bind({});
CallToActionButtonWithCustomComponentStory.args = {
  ButtonElType: "a",
  callToAction,
};
