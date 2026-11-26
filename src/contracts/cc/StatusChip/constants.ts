import type { ChipProps } from "@mui/material";

const COLOR = {
  CAUTION: "caution",
  DEFAULT: "default",
  ERROR: "error",
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
} as const satisfies Record<string, ChipProps["color"]>;

/**
 * `StatusChip`'s prop values, matching the Findable-Contract Figma library's `cc/StatusChip`:
 * `color={STATUS_CHIP_PROPS.COLOR.SUCCESS}`.
 */
export const STATUS_CHIP_PROPS = {
  COLOR,
} as const;
