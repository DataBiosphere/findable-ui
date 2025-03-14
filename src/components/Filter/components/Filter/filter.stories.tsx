import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Filter } from "./filter";

const meta = {
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
} satisfies Meta<typeof Filter>;

export default meta;

type Story = StoryObj<typeof meta>;

const onFilter = (): void => {
  // onFilter function
};

export const FilterStory: Story = {
  args: {
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
  },
};
