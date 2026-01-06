import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JSX } from "react";
import { PALETTE } from "../../../../../../../../../../styles/common/constants/palette";
import { Chart } from "../chart";
import { CHART_ARGS, SELECT_CHART_ARGS } from "./args";

const meta: Meta<typeof Chart> = {
  args: CHART_ARGS,
  component: Chart,
  decorators: [
    (Story, context): JSX.Element => (
      <Box sx={{ backgroundColor: PALETTE.COMMON_WHITE, padding: 5 }}>
        <Story {...context} />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: SELECT_CHART_ARGS,
};
