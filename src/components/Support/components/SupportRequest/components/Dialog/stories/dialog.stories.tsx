import { Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FormDialog } from "../dialog";

const meta: Meta<typeof FormDialog> = {
  argTypes: {
    setFormSubmitted: { action: "setFormSubmitted" },
  },
  component: FormDialog,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <Typography>Contact form</Typography>,
  },
};
