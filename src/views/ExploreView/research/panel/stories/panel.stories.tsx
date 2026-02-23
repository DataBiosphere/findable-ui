import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import { Panel } from "../panel";
import { Box } from "@mui/material";
import { PALETTE } from "../../../../../styles/common/constants/palette";
import { JSX } from "react";

const meta: Meta<typeof Panel> = {
  component: Panel,
  decorators: [
    (Story): JSX.Element => (
      <Box
        sx={{
          backgroundColor: PALETTE.BACKGROUND_DEFAULT,
          height: "100vh",
          minHeight: 0,
          width: "412px",
        }}
      >
        <Story />
      </Box>
    ),
  ],
  parameters: { layout: "none" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
