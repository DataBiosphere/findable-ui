import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { PAPER_PANEL_STYLE } from "../common/Paper/paper";
import { Loading } from "./loading";

const meta: Meta<typeof Loading> = {
  argTypes: {
    appear: { control: "boolean" },
    iconSize: { control: "select", options: ["small", "medium", "large"] },
    loading: { control: "boolean" },
    panelStyle: {
      control: "select",
      options: Array.from(Object.keys(PAPER_PANEL_STYLE)),
    },
    text: { control: "text" },
  },
  component: Loading,
  decorators: [
    (Story): JSX.Element => (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 8,
          height: 600,
          width: 600,
        }}
      >
        <Story />
      </div>
    ),
  ],
  title: "Components/Communication/Loading",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const LoadingStory: Story = {
  args: {
    loading: true,
  },
};
