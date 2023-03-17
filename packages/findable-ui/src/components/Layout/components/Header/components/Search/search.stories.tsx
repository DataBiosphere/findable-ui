import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Search } from "./search";

export default {
  component: Search,
  title: "Components/Common/Button",
} as ComponentMeta<typeof Search>;

const SearchTemplate: ComponentStory<typeof Search> = (args) => (
  <Search {...args} />
);

export const SearchStory = SearchTemplate.bind({});
SearchStory.args = {
  openSearchFn: (): void => {
    // openSearchFn function
  },
};
