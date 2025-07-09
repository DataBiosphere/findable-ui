import { ToggleButtonProps } from "@mui/material";

type ToggleButtonPropsOptions = {
  COLOR: typeof COLOR;
  SIZE: typeof SIZE;
};

const COLOR: Record<string, ToggleButtonProps["color"]> = {
  ERROR: "error",
  INFO: "info",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  STANDARD: "standard",
  SUCCESS: "success",
  WARNING: "warning",
};

const SIZE: Record<string, ToggleButtonProps["size"]> = {
  LARGE: "large",
  MEDIUM: "medium",
  SMALL: "small",
};

export const TOGGLE_BUTTON_PROPS: ToggleButtonPropsOptions = {
  COLOR,
  SIZE,
};
