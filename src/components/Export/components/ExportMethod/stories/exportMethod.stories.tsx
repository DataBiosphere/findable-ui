import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ExportMethod } from "../exportMethod";

const meta: Meta<typeof ExportMethod> = {
  argTypes: {
    description: { control: "text" },
    route: { control: "text" },
    title: { control: "text" },
  },
  component: ExportMethod,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ExportMethodStory: Story = {
  args: {
    description: "Obtain a curl command for downloading the selected data.",
    route: "/request-curl-command",
    title: "Download Study Data and Metadata (Curl Command)",
  },
};
