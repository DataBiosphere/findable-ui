import { Box } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { PALETTE } from "../../../../../styles/common/constants/palette";
import { SearchAllFilters } from "../searchAllFilters";
import { DEFAULT_ARGS } from "./args";

const meta: Meta<typeof SearchAllFilters> = {
  component: SearchAllFilters,
  decorators: [
    (Story): JSX.Element => (
      <Box sx={{ backgroundColor: PALETTE.COMMON_WHITE, minWidth: 264 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

const DefaultStory = (): JSX.Element => {
  return <SearchAllFilters {...DEFAULT_ARGS} />;
};

export const Default: Story = {
  render: () => <DefaultStory />,
};
