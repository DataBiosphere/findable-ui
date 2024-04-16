import { Meta, StoryObj } from "@storybook/react";
import { Nav } from "./nav";

export default {
  component: Nav,
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Layout/Nav",
} as Meta<typeof Nav>;

type Story = StoryObj<typeof Nav>;

export const NavStory: Story = {
  args: {
    navigation: [
      { label: "Learning AnVIL", url: "" },
      { active: true, label: "Getting Started", url: "/" },
      { label: "Guides and Tutorials", url: "/" },
      { label: "Introduction to Terra", url: "/" },
      { label: "Introduction to Gen3", url: "/" },
      { label: "Introduction to Dockstore", url: "/" },
      { label: "Understanding Cloud Costs", url: "/" },
      { label: "Account Setup", url: "" },
      { label: "Overview of Account Setup", url: "/" },
      { label: "Obtaining a Google ID", url: "/" },
      { label: "Creating a Terra Account", url: "/" },
      { label: "Billing Setup", url: "" },
      { label: "Overview of Billing Concepts", url: "/" },
      { label: "Creating a Google Cloud Billing Account", url: "/" },
      { label: "Accessing Data", url: "" },
      { label: "Discovering Data", url: "/" },
      { label: "Requesting Data Access", url: "/" },
    ],
  },
};
