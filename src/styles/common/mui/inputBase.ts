import { InputBaseProps } from "@mui/material";

type InputBasePropsOptions = {
  COLOR: typeof COLOR;
  MARGIN: typeof MARGIN;
  SIZE: typeof SIZE;
  TYPE: typeof TYPE;
};

const COLOR: Record<string, InputBaseProps["color"]> = {
  ERROR: "error",
  INFO: "info",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  WARNING: "warning",
};

const MARGIN: Record<string, InputBaseProps["margin"]> = {
  DENSE: "dense",
  NONE: "none",
};

const SIZE: Record<string, InputBaseProps["size"]> = {
  MEDIUM: "medium",
  SMALL: "small",
};

const TYPE: Record<string, InputBaseProps["type"]> = {
  TEXT: "text",
};

export const INPUT_BASE_PROPS: InputBasePropsOptions = {
  COLOR,
  MARGIN,
  SIZE,
  TYPE,
};
