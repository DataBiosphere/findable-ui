import { Meta, StoryObj } from "@storybook/react";
import { Error } from "./error";

export default {
  argTypes: {
    errorMessage: { control: "text" },
    requestUrlMessage: { control: "text" },
    rootPath: { control: "text" },
  },
  component: Error,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Communication",
} as Meta<typeof Error>;

type Story = StoryObj<typeof Error>;

export const ClientSideErrorStory: Story = {
  args: {
    rootPath: "#",
  },
};

export const ClientSideErrorWithErrorCodeStory: Story = {
  args: {
    errorMessage:
      "curl --location --fail 'https://service.azul.data.humancellatlas.org/manifest/files?catalog=dcp16&format=curl&filters=%7B%22projectId%22%3A+%7B%22is%22%3A+%5B%22f86f1ab4-1fbb-4510-ae35-3ffd752d4dfc%22%5D%7D%2C+%22fileFormat%22%3A+%7B%22is%22%3A+%5B%22fastq.gz%22%5D%7D%2C+%22genusSpecies%22%3A%7B%22is%22%3A%5B%22Homo+sapiens%22%5D%7D%7D&objectKey=manifests%2Fee705e99-35d3-5ae1-9e31-89d206e4240b.e735a6e0-9914-5b40-8fa2-c4d581644f50.curlrc' | curl --config -",
    requestUrlMessage:
      "https://service.azul.data.humancellatlas.org/manifest/files?catalog=dcp16&format=compact&filters=%7B%22projectId%22%3A+%7B%22is%22%3A+%5B%2274b6d569-3b11-42ef-b6b1-a0454522b4a0%22%5D%7D%2C+%22genusSpecies%22%3A+%7B%22is%22%",
    rootPath: "#",
  },
};
