import { Meta, StoryObj } from "@storybook/react";
import { ExportMethod } from "./exportMethod";

const meta = {
  argTypes: {
    buttonLabel: { control: "text" },
    description: { control: "text" },
    route: { control: "text" },
    title: { control: "text" },
  },
  component: ExportMethod,
  title: "Components/Section/Export/ExportMethod",
} satisfies Meta<typeof ExportMethod>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ExportMethodStory: Story = {
  args: {
    buttonLabel: "Request curl Command",
    description: "Obtain a curl command for downloading the selected data.",
    route: "/request-curl-command",
    title: "Download Study Data and Metadata (Curl Command)",
  },
};
