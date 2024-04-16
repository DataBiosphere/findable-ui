import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Filter } from "./filter";

export default {
  argTypes: {
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
  categoryView: {
    isDisabled: false,
    key: "genusSpecies",
    label: "Genus Species",
    values: [
      {
        count: 12,
        key: "homoSapiens",
        label: "Homo sapiens",
        selected: false,
      },
      {
        count: 6,
        key: "musMusculus",
        label: "Mus musculus",
        selected: false,
      },
    ],
  },
  isFilterDrawer: false,
  onFilter,
};
