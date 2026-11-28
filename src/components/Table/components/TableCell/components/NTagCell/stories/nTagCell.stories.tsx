import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NTagCell } from "../nTagCell";

const meta = {
  args: {
    label: "species",
  },
  component: NTagCell,
} satisfies Meta<typeof NTagCell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MultipleValues: Story = {
  args: {
    values: ["Homo sapiens", "Mus musculus", "Danio rerio"],
  },
};

export const SingleValue: Story = {
  args: {
    values: ["Homo sapiens"],
  },
};
