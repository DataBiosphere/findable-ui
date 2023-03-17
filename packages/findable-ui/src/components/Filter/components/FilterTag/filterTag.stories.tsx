import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { FilterTag } from "./filterTag";

export default {
  argTypes: {
    label: { control: "text" },
    superseded: { control: "boolean" },
  },
  component: FilterTag,
  title: "Components/Filter/FilterTag",
} as ComponentMeta<typeof FilterTag>;

const FilterTagTemplate: ComponentStory<typeof FilterTag> = (args) => (
  <FilterTag {...args} />
);

export const FilterTagStory = FilterTagTemplate.bind({});
FilterTagStory.args = {
  label: "Male",
  superseded: false,
};
