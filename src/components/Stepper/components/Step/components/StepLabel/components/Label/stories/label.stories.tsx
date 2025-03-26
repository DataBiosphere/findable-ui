import { composeStories, type Meta, type StoryObj } from "@storybook/react";
import React from "react";
import * as stories from "../components/Icon/stories/icon.stories";
import { Label } from "../label";

const { Default: Icon } = composeStories(stories);

const meta: Meta<typeof Label> = {
  component: Label,
  parameters: { controls: { disable: true } },
  title: "Components/Stepper/StepLabel/Label",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Annotation Files" },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        Annotation Files
        <Icon />
      </>
    ),
  },
};
