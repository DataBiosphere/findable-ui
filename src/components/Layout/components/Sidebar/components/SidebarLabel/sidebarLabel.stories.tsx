import { Meta, StoryObj } from "@storybook/react";
import { SidebarLabel } from "./sidebarLabel";

const meta = {
  argTypes: {
    label: { control: "text" },
  },
  component: SidebarLabel,
  title: "Components/Label",
} satisfies Meta<typeof SidebarLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SidebarLabelStory: Story = {
  args: {
    label: "Filter",
  },
};
