import { type Meta, type StoryObj } from "@storybook/nextjs-vite";
import { Input } from "../input";
import { Box } from "@mui/material";
import { JSX } from "react";
import { InputProvider } from "../../../providers/InputProvider/provider";

const meta: Meta<typeof Input> = {
  component: Input,
  decorators: [
    (Story): JSX.Element => (
      <InputProvider>
        <Box sx={{ width: "412px" }}>
          <Story />
        </Box>
      </InputProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
