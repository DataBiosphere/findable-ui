import { Meta, StoryObj } from "@storybook/react";
import { TablePagination } from "../tablePagination";
import { DEFAULT_ARGS } from "./args";

const meta: Meta<typeof TablePagination> = {
  component: TablePagination,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: DEFAULT_ARGS,
};
