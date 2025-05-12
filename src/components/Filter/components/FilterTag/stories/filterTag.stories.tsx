import { Box } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FilterTag } from "../filterTag";
import { DEFAULT_ARGS, WITH_ELLIPSIS_ARGS, WITH_RANGE_ARGS } from "./args";

const meta: Meta<typeof FilterTag> = {
  component: FilterTag,
  decorators: [
    (Story): JSX.Element => (
      <Box sx={{ width: 232 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: DEFAULT_ARGS,
};

export const WithEllipsis: Story = {
  args: WITH_ELLIPSIS_ARGS,
};

export const WithRange: Story = {
  args: WITH_RANGE_ARGS,
};
