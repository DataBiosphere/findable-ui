import { composeStories, Meta, StoryObj } from "@storybook/react";
import React from "react";
import * as summaryStories from "../components/Hero/components/Summaries/stories/summaries.stories";
import { Index } from "../index";

const { Default: Summaries } = composeStories(summaryStories);

const meta: Meta<typeof Index> = {
  component: Index,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    Summaries: <Summaries />,
    Tabs: undefined,
    title: "Explore Data",
  },
};
