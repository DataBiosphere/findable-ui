import { ButtonProps } from "@mui/material";

type ButtonPropsOptions = {
  COLOR: typeof COLOR;
  SIZE: typeof SIZE;
  VARIANT: typeof VARIANT;
};

const COLOR: Record<string, ButtonProps["color"]> = {
  ERROR: "error",
  INFO: "info",
  INHERIT: "inherit",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  WARNING: "warning",
};

const SIZE: Record<string, ButtonProps["size"]> = {
  LARGE: "large",
  MEDIUM: "medium",
  SMALL: "small",
};

const VARIANT: Record<string, ButtonProps["variant"]> = {
  ACTIVE_NAV: "activeNav",
  BACK_NAV: "backNav",
  CONTAINED: "contained",
  NAV: "nav",
  OUTLINED: "outlined",
  TEXT: "text",
};

/**
 * MUI `Button`'s prop values, including findable-ui's `nav`, `activeNav` and `backNav` variants.
 * @deprecated Use `BUTTON_PROPS` from `contracts/mui/Button/constants`. Its `VARIANT` has
 * no `NAV`, `ACTIVE_NAV` or `BACK_NAV`; those variants are to become their own component.
 */
export const BUTTON_PROPS: ButtonPropsOptions = {
  COLOR,
  SIZE,
  VARIANT,
};
