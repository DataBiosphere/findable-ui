import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { JSX } from "react";
import { AnchorLink } from "./anchorLink";

const meta = {
  component: AnchorLink,
  decorators: [
    (Story): JSX.Element => (
      // The anchor link is positioned against its parent.
      <div style={{ position: "relative" }}>
        Data Access Policy
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AnchorLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {
  args: {
    anchorLink: "data-access-policy",
    label: "Data Access Policy",
  },
};

export const WithoutLabel: Story = {
  args: {
    anchorLink: "data-access-policy",
  },
};
