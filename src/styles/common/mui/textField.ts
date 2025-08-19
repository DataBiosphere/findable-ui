import { TextFieldProps } from "@mui/material";

type TextFieldPropsOptions = {
  COLOR: typeof COLOR;
  SIZE: typeof SIZE;
  VARIANT: typeof VARIANT;
};

const COLOR: Record<string, TextFieldProps["color"]> = {
  ERROR: "error",
  INFO: "info",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  WARNING: "warning",
} as const;

const SIZE: Record<string, TextFieldProps["size"]> = {
  MEDIUM: "medium",
  SMALL: "small",
} as const;

const VARIANT: Record<string, TextFieldProps["variant"]> = {
  FILLED: "filled",
  OUTLINED: "outlined",
  STANDARD: "standard",
} as const;

export const TEXT_FIELD_PROPS: TextFieldPropsOptions = {
  COLOR,
  SIZE,
  VARIANT,
};
