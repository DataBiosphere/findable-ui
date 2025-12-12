import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { Sidebar } from "./sidebar";

export default {
  argTypes: {
    children: { control: { disable: true } },
    drawerOpen: { control: { disable: true } },
    onDrawerClose: { control: { disable: true } },
  },
  component: Sidebar,
  decorators: [
    (Story): JSX.Element => (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Layout/Sidebar",
} as Meta<typeof Sidebar>;

type Story = StoryObj<typeof Sidebar>;

export const PermanentSidebarStory: Story = {
  args: {
    children: <div />,
  },
};

export const TemporaryClosedSidebarStory: Story = {
  args: {
    children: <div />,
  },
};

export const TemporaryOpenSidebarStory: Story = {
  args: {
    children: <div />,
  },
};
