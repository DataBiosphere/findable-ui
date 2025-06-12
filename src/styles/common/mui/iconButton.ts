import { IconButtonProps } from "@mui/material";

type IconButtonPropsOptions = {
  COLOR: typeof COLOR;
  EDGE: typeof EDGE;
  SIZE: typeof SIZE;
};

const COLOR: Record<string, IconButtonProps["color"]> = {
  DEFAULT: "default",
  ERROR: "error",
  INFO: "info",
  INHERIT: "inherit",
  INK: "ink",
  INK_LIGHT: "inkLight",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  WARNING: "warning",
};

const EDGE: Record<string, IconButtonProps["edge"]> = {
  END: "end",
  START: "start",
};

const SIZE: Record<string, IconButtonProps["size"]> = {
  LARGE: "large",
  MEDIUM: "medium",
  SMALL: "small",
  XLARGE: "xlarge",
  XSMALL: "xsmall",
  XXSMALL: "xxsmall",
};

export const ICON_BUTTON_PROPS: IconButtonPropsOptions = {
  COLOR,
  EDGE,
  SIZE,
};
