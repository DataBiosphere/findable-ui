import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { AzulFileDownload } from "./azulFileDownload";

export default {
  component: AzulFileDownload,
  title: "Components/Common/IconButton/Download",
} as ComponentMeta<typeof AzulFileDownload>;

const AzulFileDownloadTemplate: ComponentStory<typeof AzulFileDownload> = (
  args
) => <AzulFileDownload {...args} />;

export const AzulFileDownloadStory = AzulFileDownloadTemplate.bind({});
AzulFileDownloadStory.args = {
  url: "https://service.dev.singlecell.gi.ucsc.edu/repository/files/d496b624-eb67-5e47-999a-848e856c5bcc?catalog=dcp2&version=2021-09-10T16%3A09%3A44.000000Z",
};
