import { Meta, StoryObj } from "@storybook/react";
import { Summaries } from "../summaries";

const meta: Meta<typeof Summaries> = {
  component: Summaries,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    summaries: [
      { count: "1", label: "Species" },
      { count: "1.1k", label: "Donors" },
      { count: "508.5k", label: "Files" },
    ],
  },
};
