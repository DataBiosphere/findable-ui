import { Stack } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ICON_STATUS_CHIP_PROPS } from "../constants";
import { IconStatusChip } from "../iconStatusChip";

const meta = {
  args: {
    label: "Done",
    status: ICON_STATUS_CHIP_PROPS.STATUS.DONE,
  },
  component: IconStatusChip,
} satisfies Meta<typeof IconStatusChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DEFAULT: Story = {};

/**
 * Every status, to check against the Figma component's `status` variants.
 */
export const ALL_STATUSES: Story = {
  render: () => (
    <Stack direction="row" gap={4} padding={4}>
      {Object.values(ICON_STATUS_CHIP_PROPS.STATUS).map((status) => (
        <IconStatusChip key={status} label={status} status={status} />
      ))}
    </Stack>
  ),
};
