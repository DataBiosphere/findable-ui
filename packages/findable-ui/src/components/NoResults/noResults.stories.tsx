import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import {
  PrimaryButtonStory,
  SecondaryButtonStory,
} from "../common/Button/button.stories";
import { NoResults } from "./noResults";

export default {
  argTypes: {
    actions: { control: { disabled: true } },
    description: { control: "text" },
    title: { control: "text" },
  },
  component: NoResults,
  title: "Components/Communication/NoResults",
} as ComponentMeta<typeof NoResults>;

const NoResultsTemplate: ComponentStory<typeof NoResults> = (args) => (
  <NoResults {...args} />
);

export const NoResultsStory = NoResultsTemplate.bind({});
NoResultsStory.args = {
  actions: (
    <>
      <PrimaryButtonStory>Remove last filter</PrimaryButtonStory>
      <SecondaryButtonStory>Clear all filters</SecondaryButtonStory>
    </>
  ),
  description:
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
  title: "No Results found",
};
