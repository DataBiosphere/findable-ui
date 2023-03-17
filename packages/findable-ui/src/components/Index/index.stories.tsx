import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { SummariesStory } from "./components/Hero/components/Summaries/summaries.stories";
import { Index } from "./index";

export default {
  argTypes: {
    Summaries: { table: { disable: true } },
    Tabs: { table: { disable: true } },
    entities: { table: { disable: true } },
    title: { table: { disable: true } },
  },
  component: Index,
  parameters: {
    layout: "fullscreen",
  },
  title: "Views/ExploreView",
} as ComponentMeta<typeof Index>;

const IndexTemplate: ComponentStory<typeof Index> = (args) => (
  <Index {...args} />
);

export const IndexStory = IndexTemplate.bind({});
IndexStory.args = {
  Summaries: <SummariesStory {...SummariesStory.args} />,
  Tabs: undefined,
  entities: undefined,
  title: "Explore Data",
};
