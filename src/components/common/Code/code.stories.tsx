import { Meta, StoryObj } from "@storybook/react";
import { Code } from "./code";

const meta = {
  component: Code,
  title: "Components/Common/Code",
} satisfies Meta<typeof Code>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CodeStory: Story = {
  args: {
    code: "curl --location --fail 'https://service.azul.data.humancellatlas.org/manifest/files?catalog=dcp16&format=curl&filters=%7B%22projectId%22%3A+%7B%22is%22%3A+%5B%22f86f1ab4-1fbb-4510-ae35-3ffd752d4dfc%22%5D%7D%2C+%22fileFormat%22%3A+%7B%22is%22%3A+%5B%22fastq.gz%22%5D%7D%2C+%22genusSpecies%22%3A%7B%22is%22%3A%5B%22Homo+sapiens%22%5D%7D%7D&objectKey=manifests%2Fee705e99-35d3-5ae1-9e31-89d206e4240b.e735a6e0-9914-5b40-8fa2-c4d581644f50.curlrc' | curl --config -",
  },
};
