import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LinkCell } from "../linkCell";
import {
  CLIENT_SIDE_ARGS,
  EXTERNAL_ARGS,
  INVALID_ARGS,
  WITH_CUSTOM_STYLE_ARGS,
} from "./args";

const meta: Meta<typeof LinkCell> = {
  component: LinkCell,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ClientSide: Story = {
  args: CLIENT_SIDE_ARGS,
};

export const External: Story = {
  args: EXTERNAL_ARGS,
};

export const Invalid: Story = {
  args: INVALID_ARGS,
};

export const WithCustomStyle: Story = {
  args: WITH_CUSTOM_STYLE_ARGS,
};
