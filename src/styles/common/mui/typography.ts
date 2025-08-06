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
  TEXT_BODY_400: "body-400",
  TEXT_BODY_400_2_LINES: "body-400-2lines",
  TEXT_BODY_500: "body-500",
  TEXT_BODY_LARGE_400: "body-large-400",
  TEXT_BODY_LARGE_400_2_LINES: "body-large-400-2lines",
  TEXT_BODY_LARGE_500: "body-large-500",
  TEXT_BODY_SMALL_400: "body-small-400",
  TEXT_BODY_SMALL_400_2_LINES: "body-small-400-2lines",
  TEXT_BODY_SMALL_500: "body-small-500",
  TEXT_HEADING: "heading",
  TEXT_HEADING_LARGE: "heading-large",
  TEXT_HEADING_SMALL: "heading-small",
  TEXT_HEADING_XLARGE: "heading-xlarge",
  TEXT_HEADING_XSMALL: "heading-xsmall",
  TEXT_UPPERCASE_500: "uppercase-500",
};

export const TYPOGRAPHY_PROPS: TypographyPropsOptions = {
  COLOR,
  VARIANT,
};
