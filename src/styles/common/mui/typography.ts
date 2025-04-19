import { TypographyOwnProps } from "@mui/material";

type TypographyPropsOptions = {
  COLOR: typeof COLOR;
  VARIANT: typeof VARIANT;
};

const COLOR: Record<string, TypographyOwnProps["color"]> = {
  INHERIT: "inherit",
  INK_LIGHT: "ink.light",
  INK_MAIN: "ink.main",
};

const VARIANT = {
  BODY_400: "body-400",
  BODY_400_2_LINES: "body-400-2lines",
  BODY_500: "body-500",
  BODY_500_2_LINES: "body-500-2lines",
  BODY_LARGE_400: "body-large-400",
  BODY_LARGE_400_2_LINES: "body-large-400-2lines",
  BODY_LARGE_500: "body-large-500",
  BODY_SMALL_400: "body-small-400",
  BODY_SMALL_400_2_LINES: "body-small-400-2lines",
  BODY_SMALL_500: "body-small-500",
  HEADING: "heading",
  HEADING_LARGE: "heading-large",
  HEADING_SMALL: "heading-small",
  HEADING_XLARGE: "heading-xlarge",
  HEADING_XSMALL: "heading-xsmall",
  INHERIT: "inherit",
  UPPERCASE_500: "uppercase-500",
} as const;

export const TYPOGRAPHY_PROPS: TypographyPropsOptions = {
  COLOR,
  VARIANT,
};
