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
  BODY_400: "text-body-400",
  BODY_400_2_LINES: "text-body-400-2lines",
  BODY_500: "text-body-500",
  BODY_500_2_LINES: "text-body-500-2lines",
  BODY_LARGE_400: "text-body-large-400",
  BODY_LARGE_400_2_LINES: "text-body-large-400-2lines",
  BODY_LARGE_500: "text-body-large-500",
  BODY_SMALL_400: "text-body-small-400",
  BODY_SMALL_400_2_LINES: "text-body-small-400-2lines",
  BODY_SMALL_500: "text-body-small-500",
  HEADING: "text-heading",
  HEADING_LARGE: "text-heading-large",
  HEADING_SMALL: "text-heading-small",
  HEADING_XLARGE: "text-heading-xlarge",
  HEADING_XSMALL: "text-heading-xsmall",
  INHERIT: "inherit",
  UPPERCASE_500: "text-uppercase-500",
} as const;

export const TYPOGRAPHY_PROPS: TypographyPropsOptions = {
  COLOR,
  VARIANT,
};
