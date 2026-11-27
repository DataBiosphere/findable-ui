import type { ChipProps } from "@mui/material";

const COLOR = {
  CAUTION: "caution",
  DEFAULT: "default",
  ERROR: "error",
  INFO: "info",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  WARNING: "warning",
} as const satisfies Record<string, ChipProps["color"]>;

const SIZE = {
  MEDIUM: "medium",
  SMALL: "small",
} as const satisfies Record<string, ChipProps["size"]>;

const VARIANT = {
  FILLED: "filled",
  OUTLINED: "outlined",
} as const satisfies Record<string, ChipProps["variant"]>;

/**
 * MUI `Chip`'s prop values, so components don't write bare strings:
 * `variant={CHIP_PROPS.VARIANT.OUTLINED}`.
 */
export const CHIP_PROPS = {
  COLOR,
  SIZE,
  VARIANT,
} as const;
