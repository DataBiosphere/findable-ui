import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { SidebarLabel } from "./sidebarLabel";

export default {
  argTypes: {
    label: { control: "text" },
  },
  component: SidebarLabel,
  title: "Components/Label",
} as ComponentMeta<typeof SidebarLabel>;

const SidebarLabelTemplate: ComponentStory<typeof SidebarLabel> = (args) => (
  <SidebarLabel {...args} />
);

export const SidebarLabelStory = SidebarLabelTemplate.bind({});
SidebarLabelStory.args = {
  label: "Filter",
};
