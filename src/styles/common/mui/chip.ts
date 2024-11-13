import { ChipProps } from "@mui/material";

type ChipPropsOptions = {
  COLOR: typeof COLOR;
  SIZE: typeof SIZE;
  VARIANT: typeof VARIANT;
};

const COLOR: Record<string, ChipProps["color"]> = {
  DEFAULT: "default",
  ERROR: "error",
  INFO: "info",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  WARNING: "warning",
};

const SIZE: Record<string, ChipProps["size"]> = {
  MEDIUM: "medium",
  SMALL: "small",
};

const VARIANT: Record<string, ChipProps["variant"]> = {
  FILLED: "filled",
  FILTER_TAG: "filterTag",
  N_TAG: "ntag",
  OUTLINED: "outlined",
  STATUS: "status",
};

export const CHIP_PROPS: ChipPropsOptions = {
  COLOR,
  SIZE,
  VARIANT,
};
