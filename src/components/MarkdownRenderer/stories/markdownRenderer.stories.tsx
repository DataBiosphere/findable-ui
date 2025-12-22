import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JSX } from "react";
import { PALETTE } from "../../../styles/common/constants/palette";
import { MarkdownRenderer } from "../markdownRenderer";
import { DEFAULT_ARGS } from "./args";

const meta: Meta<typeof MarkdownRenderer> = {
  component: MarkdownRenderer,
  decorators: [
    (Story): JSX.Element => (
      <Box
        sx={{
          backgroundColor: PALETTE.COMMON_WHITE,
          fontSize: "14px",
          lineHeight: "20px",
          padding: 3,
          width: 480,
        }}
      >
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
