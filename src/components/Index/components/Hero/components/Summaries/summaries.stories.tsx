import { Meta, StoryObj } from "@storybook/react";
import { Summaries } from "./summaries";

const meta = {
  argTypes: {
    summaries: { control: "object" },
  },
  component: Summaries,
  title: "Components/Summary",
} satisfies Meta<typeof Summaries>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SummariesStory: Story = {
  args: {
    summaries: [
      { count: "1", label: "Species" },
      { count: "1.1k", label: "Donors" },
      { count: "508.5k", label: "Files" },
    ],
  },
};
