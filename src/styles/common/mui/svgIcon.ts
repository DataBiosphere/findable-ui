import { SvgIconProps } from "@mui/material";

type SvgIconPropsOptions = {
  COLOR: typeof COLOR;
  FONT_SIZE: typeof FONT_SIZE;
};

const COLOR: Record<string, SvgIconProps["color"]> = {
  ACTION: "action",
  DISABLED: "disabled",
  ERROR: "error",
  INFO: "info",
  INHERIT: "inherit",
  INK_LIGHT: "inkLight",
  INK_MAIN: "inkMain",
  PRIMARY: "primary",
  SECONDARY: "secondary",
  SUCCESS: "success",
  WARNING: "warning",
};

const FONT_SIZE: Record<string, SvgIconProps["fontSize"]> = {
  INHERIT: "inherit",
  LARGE: "large",
  MEDIUM: "medium",
  SMALL: "small",
  XSMALL: "xsmall",
  XXLARGE: "xxlarge",
  XXSMALL: "xxsmall",
};

export const SVG_ICON_PROPS: SvgIconPropsOptions = {
  COLOR,
  FONT_SIZE,
};
