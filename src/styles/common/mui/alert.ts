import { AlertProps } from "@mui/material";

export const COLOR: Record<string, AlertProps["color"]> = {
  ERROR: "error",
  INFO: "info",
  INK: "ink",
  PRIMARY: "primary",
  SMOKE: "smoke",
  SUCCESS: "success",
  WARNING: "warning",
};

export const SEVERITY: Record<string, AlertProps["severity"]> = {
  ERROR: "error",
  INFO: "info",
  SUCCESS: "success",
  WARNING: "warning",
};

export const VARIANT: Record<string, AlertProps["variant"]> = {
  FILLED: "filled",
  OUTLINED: "outlined",
  STANDARD: "standard",
};
