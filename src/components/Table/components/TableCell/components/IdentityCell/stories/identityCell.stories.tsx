import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { type JSX } from "react";
import { PALETTE } from "../../../../../../../styles/common/constants/palette";
import { IdentityCell } from "../identityCell";
import {
  COLORED_CHIPS_ARGS,
  LABEL_CHIPS_ARGS,
  LABEL_CHIPS_LINKED_SUBTITLE_ARGS,
  LABEL_ONLY_ARGS,
  LINKED_TITLE_ARGS,
  SUMMARY_SUBTITLE_ARGS,
  WITH_CHIP_SLOT_PROPS_ARGS,
} from "./args";

const meta: Meta<typeof IdentityCell> = {
  component: IdentityCell,
  decorators: [
    (Story): JSX.Element => (
      <Box
        sx={{
          backgroundColor: PALETTE.COMMON_WHITE,
          fontSize: "14px",
          lineHeight: "20px",
          padding: 3,
          width: 340,
        }}
      >
        <Story />
      </Box>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ColoredChips: Story = {
  args: COLORED_CHIPS_ARGS,
};

export const LabelChips: Story = {
  args: LABEL_CHIPS_ARGS,
};

export const LabelChipsLinkedSubtitle: Story = {
  args: LABEL_CHIPS_LINKED_SUBTITLE_ARGS,
};

export const LabelOnly: Story = {
  args: LABEL_ONLY_ARGS,
};

export const LinkedTitle: Story = {
  args: LINKED_TITLE_ARGS,
};

export const SummarySubtitle: Story = {
  args: SUMMARY_SUBTITLE_ARGS,
};

export const WithChipSlotProps: Story = {
  args: WITH_CHIP_SLOT_PROPS_ARGS,
};
