import { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./alert";

export default {
  argTypes: {
    children: {
      control: "text",
      description: "Inner text",
    },
    color: {
      description: "Color of alert",
    },
    icon: {
      control: "text",
      description: "Top left icon. If provided will replace severity.",
    },
    severity: {
      description: "Top left predefined icon. Combine with color.",
    },
    title: {
      control: "text",
      description: "Highlighted text",
    },
    variant: {
      description: "Type of the alert",
    },
  },
  component: Alert,
  title: "Components/Common/Alert",
} as Meta<typeof Alert>;

type Story = StoryObj<typeof Alert>;

export const AlertStory: Story = {
  args: {
    children: "Something certainly happened",
    color: "warning",
    severity: "warning",
    title: "Ouch!",
  },
};
