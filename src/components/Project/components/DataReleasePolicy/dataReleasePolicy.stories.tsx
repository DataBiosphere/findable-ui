import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { DataReleasePolicy } from "./dataReleasePolicy";

export default {
  component: DataReleasePolicy,
  title: "Components/SectionContent/Content/Project",
} as ComponentMeta<typeof DataReleasePolicy>;

const DataReleasePolicyTemplate: ComponentStory<
  typeof DataReleasePolicy
> = () => <DataReleasePolicy />;

export const DataReleasePolicyStory = DataReleasePolicyTemplate.bind({});
