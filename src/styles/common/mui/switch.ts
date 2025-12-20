import { SwitchProps } from "@mui/material";

type SwitchPropsOptions = {
  COLOR: typeof COLOR;
};

const COLOR: Record<string, SwitchProps["color"]> = {
  DEFAULT: "default",
  ERROR: "error",
  INFO: "info",
  PRIMARY: "primary",
  PURPLE: "purple",
  SECONDARY: "secondary",
  SUCCESS: "success",
  WARNING: "warning",
};

export const SWITCH_PROPS: SwitchPropsOptions = {
  COLOR,
};
