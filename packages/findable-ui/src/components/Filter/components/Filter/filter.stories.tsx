import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { FilterLabelStory } from "../FilterLabel/filterLabel.stories";
import { FilterMenuStory } from "../FilterMenu/filterMenu.stories";
import { Filter } from "./filter";

export default {
  argTypes: {
    Target: { control: { disable: true } },
    content: { control: { disable: true } },
    tags: { control: { disable: true } },
  },
  component: Filter,
  decorators: [
    (Story): JSX.Element => (
      <div style={{ padding: "8px 12px 8px 16px", width: 264 }}>
        <Story />
      </div>
    ),
  ],
  title: "Components/Filter/Filter",
} as ComponentMeta<typeof Filter>;

const FilterTemplate: ComponentStory<typeof Filter> = (args) => (
  <Filter {...args} />
);

const onFilter = (): void => {
  // onFilter function
};

export const FilterStory = FilterTemplate.bind({});
FilterStory.args = {
  Target: (props): JSX.Element => {
    return (
      <FilterLabelStory
        count={FilterLabelStory.args?.count}
        disabled={FilterLabelStory.args?.disabled || false}
        label={FilterLabelStory.args?.label || "Label"}
        {...props}
      />
    );
  },
  content: (
    <FilterMenuStory
      categoryKey={FilterMenuStory.args?.categoryKey || "defaultKey"}
      onFilter={FilterMenuStory.args?.onFilter || onFilter}
      values={
        FilterMenuStory.args?.values || [
          {
            count: 1,
            key: "item1",
            label: "Item 1",
            selected: true,
          },
        ]
      }
    />
  ),
};
