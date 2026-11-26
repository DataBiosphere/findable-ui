import { Stack } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { STATUS_CHIP_PROPS } from "../constants";
import { StatusChip } from "../statusChip";

const meta = {
  args: {
    color: STATUS_CHIP_PROPS.COLOR.SUCCESS,
    label: "Access Granted",
  },
  component: StatusChip,
} satisfies Meta<typeof StatusChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DEFAULT: Story = {};

/**
 * Every colour, to check against the Figma component's `color` variants.
 */
export const ALL_COLORS: Story = {
  render: () => (
    <Stack direction="row" gap={4} padding={4}>
      {Object.values(STATUS_CHIP_PROPS.COLOR).map((color) => (
        <StatusChip key={color} color={color} label={color} />
      ))}
    </Stack>
  ),
};
