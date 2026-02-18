import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JSX } from "react";
import { SURFACE_TYPE } from "../surfaces/types";
import { FilterLabel } from "./filterLabel";

const meta = {
  argTypes: {
    annotation: { control: "object" },
    count: { control: "number" },
    disabled: { control: "boolean" },
    isOpen: { control: "boolean" },
    label: { control: "text" },
  },
  component: FilterLabel,
  decorators: [
    (Story): JSX.Element => (
      <div style={{ padding: "8px 12px 8px 16px", width: 264 }}>
        <Story />
      </div>
    ),
  ],
  title: "Components/Filter/FilterLabel",
} satisfies Meta<typeof FilterLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FilterLabelStory: Story = {
  args: {
    annotation: {
      description:
        "This is a description of the filter label that provides additional context to the user.",
      label: "Label",
    },
    count: 123,
    disabled: false,
    isOpen: false,
    label: "Label",
    onClick: () => {},
    surfaceType: SURFACE_TYPE.MENU,
  },
};
