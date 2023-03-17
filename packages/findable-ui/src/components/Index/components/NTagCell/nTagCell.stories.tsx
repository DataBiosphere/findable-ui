import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { NTagCell } from "./nTagCell";

export default {
  argTypes: {
    label: { control: "text" },
    values: { control: "array" },
  },
  component: NTagCell,
  title: "Components/Table/Cell/NTagCell",
} as ComponentMeta<typeof NTagCell>;

const NTagCellTemplate: ComponentStory<typeof NTagCell> = (args) => (
  <NTagCell {...args} />
);

export const NTagCellStory = NTagCellTemplate.bind({});
NTagCellStory.args = {
  label: "species",
  values: ["Homo sapiens", "Mus musculus"],
};
