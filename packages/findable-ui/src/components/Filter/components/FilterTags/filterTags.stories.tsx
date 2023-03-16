import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { FilterTags } from "./filterTags";

export default {
  argTypes: {
    tags: { control: { disable: true } },
  },
  component: FilterTags,
  decorators: [
    (Story): JSX.Element => (
      <div style={{ padding: "8px 12px 8px 16px", width: 264 }}>
        <Story />
      </div>
    ),
  ],
  title: "Components/Filter/FilterTags",
} as ComponentMeta<typeof FilterTags>;

const FilterTagsTemplate: ComponentStory<typeof FilterTags> = (args) => (
  <FilterTags {...args} />
);

const onRemove = (): void => {
  // onRemove function
};

export const FilterTagsStory = FilterTagsTemplate.bind({});
FilterTagsStory.args = {
  tags: [
    {
      label: "Normal",
      onRemove: onRemove,
      superseded: false,
    },
    {
      label: "abscess",
      onRemove: onRemove,
      superseded: true,
    },
    {
      label: "acoustic neuroma",
      onRemove: onRemove,
      superseded: false,
    },
    {
      label: "acute kidney failure",
      onRemove: onRemove,
      superseded: false,
    },
    {
      label: "acute kidney tubular necrosis",
      onRemove: onRemove,
      superseded: false,
    },
    {
      label: "alcohol abuse",
      onRemove: onRemove,
      superseded: false,
    },
  ],
};
