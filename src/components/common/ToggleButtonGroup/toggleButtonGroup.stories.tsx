import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ToggleButtonGroup } from "./toggleButtonGroup";

const meta = {
  argTypes: {
    toggleButtons: { table: { disable: true } },
  },
  component: ToggleButtonGroup,
  parameters: {
    layout: "centered",
  },
  title: "Components/Common/ButtonGroup",
} satisfies Meta<typeof ToggleButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ToggleButtonGroupStory: Story = {
  args: {
    toggleButtons: [
      {
        label: "Exact Match (243)",
        onToggle: (): void => {
          // onToggle function
        },
        value: "exact-match",
      },
      {
        label: "Related (33)",
        onToggle: (): void => {
          // onToggle function
        },
        value: "related-match",
      },
    ],
  },
};
