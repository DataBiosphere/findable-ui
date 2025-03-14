import { Meta, StoryObj } from "@storybook/react";
import { NTagCell } from "./nTagCell";

const meta = {
  argTypes: {
    label: { control: "text" },
    values: { control: "object" },
  },
  component: NTagCell,
  title: "Components/Table/Cell/NTagCell",
} satisfies Meta<typeof NTagCell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NTagCellStory: Story = {
  args: {
    label: "species",
    values: ["Homo sapiens", "Mus musculus"],
  },
};
