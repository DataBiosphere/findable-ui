import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { FilterLabel } from "./filterLabel";

export default {
  argTypes: {
    count: { control: "number" },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
  component: FilterLabel,
  decorators: [
    (Story): JSX.Element => (
      <div style={{ padding: "8px 12px 8px 16px", width: 264 }}>
        <Story />
      </div>
    ),
  ],
  title: "Components/Filter/FilterLabel",
} as ComponentMeta<typeof FilterLabel>;

const FilterLabelTemplate: ComponentStory<typeof FilterLabel> = (args) => (
  <FilterLabel {...args} />
);

export const FilterLabelStory = FilterLabelTemplate.bind({});
FilterLabelStory.args = {
  count: 123,
  disabled: false,
  label: "Label",
};
