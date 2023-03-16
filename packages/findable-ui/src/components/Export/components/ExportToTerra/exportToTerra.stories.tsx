import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ExportToTerra } from "./exportToTerra";

export default {
  argTypes: {
    params: { control: { disable: true } },
    url: { control: "text" },
  },
  component: ExportToTerra,
  title: "Components/Section/Export/ExportToTerra",
} as ComponentMeta<typeof ExportToTerra>;

const ExportToTerraTemplate: ComponentStory<typeof ExportToTerra> = (args) => (
  <ExportToTerra {...args} />
);

export const ExportToTerraStory = ExportToTerraTemplate.bind({});
ExportToTerraStory.args = {
  params: new URLSearchParams({
    format: "terra.pfb",
  }),
  url: "https://service.dev.singlecell.gi.ucsc.edu/fetch/manifest/files",
};
