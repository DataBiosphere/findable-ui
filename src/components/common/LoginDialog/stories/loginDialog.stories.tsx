import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JSX } from "react";
import { ConfigProvider } from "../../../../providers/config";
import { LoginDialog } from "../loginDialog";
import { CONFIG, DEFAULT_ARGS } from "./args";

const meta: Meta<typeof LoginDialog> = {
  component: LoginDialog,
  decorators: [
    (Story): JSX.Element => (
      <ConfigProvider config={CONFIG}>
        <Story />
      </ConfigProvider>
    ),
  ],
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: DEFAULT_ARGS,
};
