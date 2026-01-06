import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { JSX } from "react";
import { PALETTE } from "../../../../../../../styles/common/constants/palette";
import { MarkdownCell } from "../markdownCell";
import { DEFAULT_ARGS, WITH_HTML_ARGS } from "./args";

const meta: Meta<typeof MarkdownCell> = {
  component: MarkdownCell,
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

export const WithHtml: Story = {
  args: WITH_HTML_ARGS,
};
