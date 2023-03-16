import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { SectionTitle } from "./sectionTitle";

export default {
  argTypes: {
    title: { control: "text" },
  },
  component: SectionTitle,
  title: "Components/SectionContent/Title",
} as ComponentMeta<typeof SectionTitle>;

const SectionTitleTemplate: ComponentStory<typeof SectionTitle> = (args) => (
  <SectionTitle {...args} />
);

export const SectionTitleStory = SectionTitleTemplate.bind({});
SectionTitleStory.args = {
  title: "Analysis Portals",
};
