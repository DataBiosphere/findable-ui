import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React from "react";
import { Filter } from "../filter";
import { DISABLED_SELECT_ARGS, RANGE_ARGS, SELECT_ARGS } from "./args";

const meta: Meta<typeof Filter> = {
  component: Filter,
  decorators: [
    (Story): JSX.Element => (
      <Box sx={{ width: 248 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SelectCategory: Story = {
  args: SELECT_ARGS,
};

export const DisabledSelectCategory: Story = {
  args: DISABLED_SELECT_ARGS,
};

export const RangeCategory: Story = {
  args: RANGE_ARGS,
};
