import { Box } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { BIONETWORK } from "../../../../../../../DataDictionary/components/Filters/stories/constants";
import { ColumnFilterTag } from "../columnFilterTag";

const meta: Meta<typeof ColumnFilterTag> = {
  component: ColumnFilterTag,
  decorators: [
    (Story): JSX.Element => (
      <Box sx={{ display: "grid", gap: 2, gridAutoFlow: "column" }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    column: BIONETWORK,
  },
};
