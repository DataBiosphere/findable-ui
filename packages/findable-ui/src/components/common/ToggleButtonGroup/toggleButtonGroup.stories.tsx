import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ToggleButtonGroup } from "./toggleButtonGroup";

export default {
  argTypes: {
    toggleButtons: { table: { disable: true } },
  },
  component: ToggleButtonGroup,
  parameters: {
    layout: "centered",
  },
  title: "Components/Common/ButtonGroup",
} as ComponentMeta<typeof ToggleButtonGroup>;

const ToggleButtonGroupTemplate: ComponentStory<typeof ToggleButtonGroup> = (
  args
) => <ToggleButtonGroup {...args} />;

export const ToggleButtonGroupStory = ToggleButtonGroupTemplate.bind({});
ToggleButtonGroupStory.args = {
  toggleButtons: [
    {
      label: "Exact Match (243)",
      onToggle: (): void => {
        // onToggle function
      },
      value: "exact-match",
    },
    {
      label: "Related (33)",
      onToggle: (): void => {
        // onToggle function
      },
      value: "related-match",
    },
  ],
};
