import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Summaries } from "./components/Summaries/summaries";
import { SummariesStory } from "./components/Summaries/summaries.stories";
import { Hero } from "./hero";

const meta = {
  argTypes: {
    Summaries: { table: { disable: true } },
    title: { table: { disable: true } },
  },
  component: Hero,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Hero/ExploreView",
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HeroStory: Story = {
  args: {
    Summaries: <Summaries {...SummariesStory.args} />,
    title: "Data Explorer",
  },
};
