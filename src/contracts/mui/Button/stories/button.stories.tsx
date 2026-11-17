import { ArrowDropDownRounded } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DownloadIcon } from "../../../../components/common/CustomIcon/components/DownloadIcon/downloadIcon";
import { BUTTON_PROPS } from "../constants";
import { COMBINATIONS, SIZES } from "./constants";

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DEFAULT: Story = {
  args: {
    children: "Sign in",
    color: BUTTON_PROPS.COLOR.PRIMARY,
    size: BUTTON_PROPS.SIZE.MEDIUM,
    variant: BUTTON_PROPS.VARIANT.CONTAINED,
  },
};

/**
 * Every allowed combination and size: label only, with a start icon, with an end icon, and disabled.
 * Hover, press and tab through it to check each state against the Figma component.
 */
export const ALL_COMBINATIONS: Story = {
  render: () => (
    <Stack gap={4} padding={4}>
      {COMBINATIONS.map((combination) =>
        SIZES.map((size) => (
          <Stack
            key={`${combination.variant}-${combination.color}-${size}`}
            alignItems="center"
            direction="row"
            gap={6}
          >
            <Button {...combination} size={size}>
              {`${combination.variant} ${combination.color} ${size}`}
            </Button>
            <Button {...combination} size={size} startIcon={<DownloadIcon />}>
              Download
            </Button>
            <Button
              {...combination}
              endIcon={<ArrowDropDownRounded />}
              size={size}
            >
              Dropdown
            </Button>
            <Button {...combination} disabled size={size}>
              Disabled
            </Button>
          </Stack>
        )),
      )}
    </Stack>
  ),
};
