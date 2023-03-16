import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ExportToTerraNotStarted } from "./exportToTerraNotStarted";

export default {
  argTypes: {
    run: { control: { disabled: true } },
  },
  component: ExportToTerraNotStarted,
  title: "Components/Section/Export/ExportToTerra",
} as ComponentMeta<typeof ExportToTerraNotStarted>;

const ExportToTerraNotStartedTemplate: ComponentStory<
  typeof ExportToTerraNotStarted
> = (args) => <ExportToTerraNotStarted {...args} />;

export const ExportToTerraNotStartedStory =
  ExportToTerraNotStartedTemplate.bind({});
ExportToTerraNotStartedStory.args = {
  run: (): void => {
    console.log("Start Export");
  },
};
