import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Summaries } from "./components/Hero/components/Summaries/summaries";
import { SummariesStory } from "./components/Hero/components/Summaries/summaries.stories";
import { Index } from "./index";

export default {
  argTypes: {
    Summaries: { table: { disable: true } },
    Tabs: { table: { disable: true } },
    list: { table: { disable: true } },
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
    Summaries: <Summaries {...SummariesStory.args} />,
    Tabs: undefined,
    list: undefined,
    title: "Explore Data",
  },
};
