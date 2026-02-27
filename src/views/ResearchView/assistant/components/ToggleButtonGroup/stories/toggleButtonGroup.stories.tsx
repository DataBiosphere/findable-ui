import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JSX } from "react";
import { ToggleButtonGroup } from "../toggleButtonGroup";
import { ConfigProvider } from "../../../../../../providers/config";
import { INITIAL_CONFIG } from "../../../stories/args";

const meta: Meta<typeof ToggleButtonGroup> = {
  component: ToggleButtonGroup,
  decorators: [
    (Story): JSX.Element => (
      <ConfigProvider config={INITIAL_CONFIG}>
        <Story />
      </ConfigProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DEFAULT: Story = {};
