import { Meta, StoryObj } from "@storybook/react";
import { DataReleasePolicy } from "./dataReleasePolicy";

const meta = {
  component: DataReleasePolicy,
  title: "Components/SectionContent/Content/Project",
} satisfies Meta<typeof DataReleasePolicy>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DataReleasePolicyStory: Story = {};
