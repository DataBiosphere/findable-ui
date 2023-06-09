import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { FilterMenuStory } from "../FilterMenu/filterMenu.stories";
import { Filters } from "./filters";

export default {
  argTypes: {
    categories: { control: { disable: true } },
    onFilter: { control: { disable: true } },
  },
  component: Filters,
  decorators: [
    (Story): JSX.Element => (
      <div style={{ width: 264 }}>
        <Story />
      </div>
    ),
  ],
  title: "Components/Filter/Filters",
} as ComponentMeta<typeof Filters>;

const FiltersTemplate: ComponentStory<typeof Filters> = (args) => (
  <Filters {...args} />
);

const onFilter = (): void => {
  // onFilter function
};

const defaultValues = [
  {
    count: 1,
    key: "item1",
    label: "Item 1",
    selected: false,
  },
  {
    count: 10,
    key: "item2",
    label: "Item 2",
    selected: false,
  },
];

export const FiltersStory = FiltersTemplate.bind({});
FiltersStory.args = {
  categoryViews: [
    {
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
    {
      isDisabled: false,
      key: "donorDisease",
      label: "Donor Disease",
      values: FilterMenuStory.args?.values || defaultValues,
    },
    {
      isDisabled: true,
      key: "anatomicalEntity",
      label: "Anatomical Entity",
      values: [
        {
          count: 12,
          key: "oralCavity",
          label: "oral cavity",
          selected: true,
        },
        {
          count: 6,
          key: "pancreas",
          label: "pancreas",
          selected: false,
        },
      ],
    },
  ],
  onFilter: onFilter,
};
