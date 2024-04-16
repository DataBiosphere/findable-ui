import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SummariesStory } from "./components/Hero/components/Summaries/summaries.stories";
import { Index } from "./index";

export default {
  argTypes: {
    List: { table: { disable: true } },
    Summaries: { table: { disable: true } },
    Tabs: { table: { disable: true } },
    title: { table: { disable: true } },
  },
  component: Index,
  parameters: {
    layout: "fullscreen",
  },
  title: "Views/ExploreView",
} as Meta<typeof Index>;

type Story = StoryObj<typeof Index>;

export const IndexStory: Story = {
  args: {
    List: undefined,
    Summaries: <SummariesStory {...SummariesStory.args} />,
    Tabs: undefined,
    title: "Explore Data",
  },
};
