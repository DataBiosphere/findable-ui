import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ExportMethod } from "./exportMethod";

export default {
  argTypes: {
    buttonLabel: { control: "text" },
    description: { control: "text" },
    route: { control: "text" },
    title: { control: "text" },
  },
  component: ExportMethod,
  title: "Components/Section/Export/ExportMethod",
} as ComponentMeta<typeof ExportMethod>;

const ExportMethodTemplate: ComponentStory<typeof ExportMethod> = (args) => (
  <ExportMethod {...args} />
);

export const ExportMethodStory = ExportMethodTemplate.bind({});
ExportMethodStory.args = {
  buttonLabel: "Request curl Command",
  description: "Obtain a curl command for downloading the selected data.",
  route: "/request-curl-command",
  title: "Download Study Data and Metadata (Curl Command)",
};
