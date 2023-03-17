import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { STATUS, StatusBadge } from "./statusBadge";

export default {
  argTypes: {
    status: { control: "select", options: Array.from(Object.keys(STATUS)) },
  },
  component: StatusBadge,
  title: "Components/Common/Alert",
} as ComponentMeta<typeof StatusBadge>;

const StatusBadgeTemplate: ComponentStory<typeof StatusBadge> = (args) => (
  <StatusBadge {...args} />
);

export const StatusBadgeStory = StatusBadgeTemplate.bind({});
StatusBadgeStory.args = {
  status: STATUS.NEW,
};
