import { TypographyStyle, TypographyVariantsOptions } from "@mui/material";
import { tabletUp } from "./breakpoints";

const TYPOGRAPHY = {
  TEXT_BODY_SMALL_400_2_LINES: "text-body-small-400-2lines",
  TEXT_BODY_SMALL_500: "text-body-small-500",
  TEXT_HEADING: "text-heading",
  TEXT_HEADING_LARGE: "text-heading-large",
  TEXT_HEADING_SMALL: "text-heading-small",
  TEXT_HEADING_XLARGE: "text-heading-xlarge",
  TEXT_HEADING_XSMALL: "text-heading-xsmall",
  TEXT_UPPERCASE_500: "text-uppercase-500",
} as const;
export const {
  TEXT_BODY_SMALL_400_2_LINES,
  TEXT_BODY_SMALL_500,
  TEXT_HEADING,
  TEXT_HEADING_LARGE,
  TEXT_HEADING_SMALL,
  TEXT_HEADING_XLARGE,
  TEXT_HEADING_XSMALL,
  TEXT_UPPERCASE_500,
} = TYPOGRAPHY;

const body400: TypographyStyle = {
  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "20px",
};

const body4002Lines: TypographyStyle = {
  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "24px",
};

const body500: TypographyStyle = {
  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "20px",
};

const bodyLarge400: TypographyStyle = {
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
};

const bodyLarge4002Lines: TypographyStyle = {
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "28px",
};

const bodyLarge500: TypographyStyle = {
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
};

const bodySmall400: TypographyStyle = {
  fontFamily: "Inter",
  fontSize: "13px",
  fontWeight: 400,
  lineHeight: "16px",
};

const bodySmall4002Lines: TypographyStyle = {
  fontFamily: "Inter",
  fontSize: "13px",
  fontWeight: 400,
  lineHeight: "20px",
};

const bodySmall500: TypographyStyle = {
  fontFamily: "Inter",
  fontSize: "13px",
  fontWeight: 500,
  lineHeight: "16px",
};

const heading: TypographyStyle = {
  fontFamily: "Inter",
  fontSize: "20px",
  fontWeight: 500,
  letterSpacing: "-0.2px",
  lineHeight: "28px",
  [tabletUp]: {
    fontSize: "24px",
    letterSpacing: "-0.4px",
    lineHeight: "32px",
  },
};

const headingLarge: TypographyStyle = {
  fontFamily: "Inter",
  fontSize: "24px",
  fontWeight: 500,
  letterSpacing: "-0.4px",
  lineHeight: "32px",
  [tabletUp]: {
    fontSize: "30px",
    letterSpacing: "-0.8px",
    lineHeight: "40px",
  },
};

const headingSmall: TypographyStyle = {
  fontFamily: "Inter",
  fontSize: "18px",
  fontWeight: 500,
  lineHeight: "26px",
  [tabletUp]: {
    fontSize: "20px",
    letterSpacing: "-0.2px",
    lineHeight: "28px",
  },
};

const headingXLarge: TypographyStyle = {
  fontFamily: "Inter",
  fontSize: "30px",
  fontWeight: 500,
  letterSpacing: "-0.8px",
  lineHeight: "40px",
  [tabletUp]: {
    fontSize: "40px",
    letterSpacing: "-1.4px",
    lineHeight: "56px",
  },
};

const headingXSmall: TypographyStyle = {
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
};

const uppercase500: TypographyStyle = {
  fontFamily: "Inter",
  fontSize: "12px",
  fontWeight: 500,
  lineHeight: "16px",
  textTransform: "uppercase",
};

export const typography: TypographyVariantsOptions = {
  fontFamily: "Inter",
  "text-body-400": body400,
  "text-body-400-2lines": body4002Lines,
  "text-body-500": body500,
  "text-body-large-400": bodyLarge400,
  "text-body-large-400-2lines": bodyLarge4002Lines,
  "text-body-large-500": bodyLarge500,
  "text-body-small-400": bodySmall400,
  "text-body-small-400-2lines": bodySmall4002Lines,
  "text-body-small-500": bodySmall500,
  "text-heading": heading,
  "text-heading-large": headingLarge,
  "text-heading-small": headingSmall,
  "text-heading-xlarge": headingXLarge,
  "text-heading-xsmall": headingXSmall,
  "text-uppercase-500": uppercase500,
};
