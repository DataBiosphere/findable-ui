import { TypographyOwnProps } from "@mui/material";

type TypographyPropsOptions = {
  COLOR: typeof COLOR;
  VARIANT: typeof VARIANT;
};

const COLOR: Record<string, TypographyOwnProps["color"]> = {
  ERROR: "error",
  INHERIT: "inherit",
  INK_LIGHT: "ink.light",
  INK_MAIN: "ink.main",
  PRIMARY: "primary",
};

const VARIANT: Record<string, TypographyOwnProps["variant"]> = {
  INHERIT: "inherit",
  TEXT_BODY_400: "text-body-400",
  TEXT_BODY_400_2_LINES: "text-body-400-2lines",
  TEXT_BODY_500: "text-body-500",
  TEXT_BODY_LARGE_400: "text-body-large-400",
  TEXT_BODY_LARGE_400_2_LINES: "text-body-large-400-2lines",
  TEXT_BODY_LARGE_500: "text-body-large-500",
  TEXT_BODY_SMALL_400: "text-body-small-400",
  TEXT_BODY_SMALL_500: "text-body-small-500",
  TEXT_HEADING_LARGE: "text-heading-large",
  TEXT_HEADING_SMALL: "text-heading-small",
  TEXT_HEADING_XSMALL: "text-heading-xsmall",
  TEXT_UPPERCASE_500: "text-uppercase-500",
};

export const TYPOGRAPHY_PROPS: TypographyPropsOptions = {
  COLOR,
  VARIANT,
};
