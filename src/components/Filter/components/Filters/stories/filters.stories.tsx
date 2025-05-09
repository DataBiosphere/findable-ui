import { Box } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Filters } from "../filters";
import { DEFAULT_ARGS } from "./args";

const meta: Meta<typeof Filters> = {
  component: Filters,
  decorators: [
    (Story): JSX.Element => (
      <Box sx={{ width: 264 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Filters>;

export const Default: Story = {
  args: DEFAULT_ARGS,
};
