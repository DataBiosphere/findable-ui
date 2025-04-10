import { Box } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { PALETTE } from "../../../../../../../../../styles/common/mui/palette";
import { Summary } from "../summary";
import { SELECT_SUMMARY_ARGS, SUMMARY_ARGS } from "./args";

const meta: Meta<typeof Summary> = {
  args: SUMMARY_ARGS,
  component: Summary,
  decorators: [
    (Story, context): JSX.Element => (
      <Box sx={{ backgroundColor: PALETTE.COMMON_WHITE, padding: 5 }}>
        <Story {...context} />
      </Box>
    ),
  ],
  title: "Components/Entities/EntitiesView/FilterSummary/Summary",
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: SELECT_SUMMARY_ARGS,
};
