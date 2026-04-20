import { Box } from "@mui/material";
import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import { JSX } from "react";
import { Messages } from "../messages";
import { ARGS } from "./args";

const meta: Meta<typeof Messages> = {
  component: Messages,
  decorators: [
    (Story): JSX.Element => (
      <Box sx={{ width: "412px" }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: ARGS,
};
