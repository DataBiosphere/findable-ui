import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { BatchNormalizationWarning } from "./batchNormalizationWarning";

export default {
  component: BatchNormalizationWarning,
  title: "Components/Section/Export/ExportWarning",
} as ComponentMeta<typeof BatchNormalizationWarning>;

const BatchNormalizationWarningTemplate: ComponentStory<
  typeof BatchNormalizationWarning
> = (args) => (
  <BatchNormalizationWarning {...args}>
    {args.children}
  </BatchNormalizationWarning>
);

export const BatchNormalizationWarningStory =
  BatchNormalizationWarningTemplate.bind({});
BatchNormalizationWarningStory.args = {};
