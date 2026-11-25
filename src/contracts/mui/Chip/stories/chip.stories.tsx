import { CloseRounded } from "@mui/icons-material";
import { Chip, Stack } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { CHIP_PROPS } from "../constants";
import { COLORS, SIZES, VARIANTS } from "./constants";

const meta = {
  component: Chip,
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DEFAULT: Story = {
  args: {
    color: CHIP_PROPS.COLOR.DEFAULT,
    label: "Chip",
    size: CHIP_PROPS.SIZE.SMALL,
    variant: CHIP_PROPS.VARIANT.FILLED,
  },
};

/**
 * Every colour, size and variant: label only, removable, and removable but disabled.
 * Hover, press and tab through the removable chips to check each state against the Figma component.
 */
export const ALL_COMBINATIONS: Story = {
  render: () => (
    <Stack gap={4} padding={4}>
      {VARIANTS.map((variant) =>
        COLORS.map((color) =>
          SIZES.map((size) => (
            <Stack
              key={`${variant}-${color}-${size}`}
              alignItems="center"
              direction="row"
              gap={6}
            >
              <Chip
                color={color}
                label={`${variant} ${color} ${size}`}
                size={size}
                variant={variant}
              />
              <Chip
                color={color}
                deleteIcon={<CloseRounded />}
                label="Removable"
                onClick={fn()}
                onDelete={fn()}
                size={size}
                variant={variant}
              />
              <Chip
                color={color}
                deleteIcon={<CloseRounded />}
                disabled
                label="Disabled"
                onClick={fn()}
                onDelete={fn()}
                size={size}
                variant={variant}
              />
            </Stack>
          )),
        ),
      )}
    </Stack>
  ),
};
