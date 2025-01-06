import { ButtonProps } from "@mui/material";

export const COLOR: Record<string, ButtonProps["color"]> = {
  ERROR: "error",
  INFO: "info",
  INHERIT: "inherit",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  WARNING: "warning",
};

export const VARIANT: Record<string, ButtonProps["variant"]> = {
  ACTIVE_NAV: "activeNav",
  BACK_NAV: "backNav",
  CONTAINED: "contained",
  NAV: "nav",
  OUTLINED: "outlined",
  TEXT: "text",
};
