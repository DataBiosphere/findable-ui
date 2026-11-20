import type { ButtonProps } from "@mui/material";

const COLOR = {
  ERROR: "error",
  INFO: "info",
  INHERIT: "inherit",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  WARNING: "warning",
} as const satisfies Record<string, ButtonProps["color"]>;

const SIZE = {
  LARGE: "large",
  MEDIUM: "medium",
  SMALL: "small",
} as const satisfies Record<string, ButtonProps["size"]>;

const VARIANT = {
  CONTAINED: "contained",
  OUTLINED: "outlined",
  TEXT: "text",
} as const satisfies Record<string, ButtonProps["variant"]>;

/**
 * MUI `Button`'s prop values, so components don't write bare strings:
 * `variant={BUTTON_PROPS.VARIANT.CONTAINED}`.
 */
export const BUTTON_PROPS = {
  COLOR,
  SIZE,
  VARIANT,
} as const;
