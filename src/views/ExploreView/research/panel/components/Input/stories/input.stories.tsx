import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import { Input } from "../input";
import { Box } from "@mui/material";
import { JSX } from "react";

const meta: Meta<typeof Input> = {
  component: Input,
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

export const Default: Story = {};
