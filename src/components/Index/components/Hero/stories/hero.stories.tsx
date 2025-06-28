import { composeStories, Meta, StoryObj } from "@storybook/react";
import React from "react";
import * as summaryStories from "../components/Summaries/stories/summaries.stories";
import { Hero } from "../hero";

const { Default: Summaries } = composeStories(summaryStories);

const meta: Meta<typeof Hero> = {
  component: Hero,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    Summaries: <Summaries />,
  },
};
