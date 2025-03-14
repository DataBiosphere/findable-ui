import { Meta, StoryObj } from "@storybook/react";
import { FilterTag } from "./filterTag";

const meta = {
  argTypes: {
    label: { control: "text" },
    superseded: { control: "boolean" },
  },
  component: FilterTag,
  title: "Components/Filter/FilterTag",
} satisfies Meta<typeof FilterTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FilterTagStory: Story = {
  args: {
    label: "Male",
    onRemove: () => {},
    superseded: false,
  },
};
