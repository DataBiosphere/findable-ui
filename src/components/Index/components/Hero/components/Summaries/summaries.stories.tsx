import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Summaries } from "./summaries";

export default {
  argTypes: {
    summaries: { control: "array" },
  },
  component: Summaries,
  title: "Components/Summary",
} as ComponentMeta<typeof Summaries>;

const SummariesTemplate: ComponentStory<typeof Summaries> = (args) => (
  <Summaries {...args} />
);

export const SummariesStory = SummariesTemplate.bind({});
SummariesStory.args = {
  summaries: [
    { count: "1", label: "Species" },
    { count: "1.1k", label: "Donors" },
    { count: "508.5k", label: "Files" },
  ],
};
