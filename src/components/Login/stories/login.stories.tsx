import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Login } from "../login";
import { DEFAULT_ARGS } from "./args";

export default {
  argTypes: { title: { control: "text" } },
  component: Login,
  parameters: { layout: "fullscreen" },
} as Meta<typeof Login>;

type Story = StoryObj<typeof Login>;

export const Default: Story = {
  args: DEFAULT_ARGS,
};
