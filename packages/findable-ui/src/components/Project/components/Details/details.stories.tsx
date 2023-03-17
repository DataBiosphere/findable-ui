import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { KeyValues } from "../../../common/KeyValuePairs/keyValuePairs";
import { Details } from "./details";

// Template constants
const details: KeyValues = new Map([
  ["Project Label", "HeterogeneityCD4TCells"],
  ["Species", "Homo sapiens"],
  ["Sample Type", "specimens"],
  ["Anatomical Entity", "eye"],
]);

export default {
  argTypes: {
    keyValuePairs: { control: "object" },
    title: { control: "text" },
  },
  component: Details,
  title: "Components/SectionContent/Content/Project",
} as ComponentMeta<typeof Details>;

const DetailsTemplate: ComponentStory<typeof Details> = (args) => (
  <Details {...args} />
);

export const DetailsStory = DetailsTemplate.bind({});
DetailsStory.args = {
  keyValuePairs: details,
  title: "",
};
