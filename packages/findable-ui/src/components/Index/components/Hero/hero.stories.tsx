import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { SummariesStory } from "./components/Summaries/summaries.stories";
import { Hero } from "./hero";

export default {
  argTypes: {
    Summaries: { table: { disable: true } },
    title: { table: { disable: true } },
  },
  component: Hero,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Hero/ExploreView",
} as ComponentMeta<typeof Hero>;

const HeroTemplate: ComponentStory<typeof Hero> = (args) => <Hero {...args} />;

export const HeroStory = HeroTemplate.bind({});
HeroStory.args = {
  Summaries: <SummariesStory {...SummariesStory.args} />,
  title: "Data Explorer",
};
