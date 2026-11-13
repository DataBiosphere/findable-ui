import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { KeyValueElType } from "./keyValueElType";

const meta = {
  args: {
    boxSx: { display: "grid", gap: 2, gridTemplateColumns: "auto 1fr" },
    children: [
      <span key="key">Portal</span>,
      <span key="value">CELLxGENE</span>,
    ],
    keyValue: ["Portal", "CELLxGENE"],
  },
  component: KeyValueElType,
} satisfies Meta<typeof KeyValueElType>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithKeyValueFn: Story = {
  args: {
    keyValueFn: fn(),
  },
};

export const WithoutKeyValueFn: Story = {};
