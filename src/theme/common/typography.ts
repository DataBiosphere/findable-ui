import { TypographyStyle, TypographyVariantsOptions } from "@mui/material";
import { tabletUp } from "./breakpoints";

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
  lineHeight: "28px",
  [tabletUp]: {
    fontSize: "24px",
    lineHeight: "32px",
  },
};

const headingLarge: TypographyStyle = {
  fontFamily: "Inter",
  fontSize: "24px",
  fontWeight: 500,
  lineHeight: "32px",
  [tabletUp]: {
    fontSize: "32px",
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
    letterSpacing: "-0.4px",
    lineHeight: "48px",
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
  "body-400": body400,
  "body-400-2lines": body4002Lines,
  "body-500": body500,
  "body-large-400": bodyLarge400,
  "body-large-400-2lines": bodyLarge4002Lines,
  "body-large-500": bodyLarge500,
  "body-small-400": bodySmall400,
  "body-small-400-2lines": bodySmall4002Lines,
  "body-small-500": bodySmall500,
  fontFamily: "Inter",
  heading: heading,
  "heading-large": headingLarge,
  "heading-small": headingSmall,
  "heading-xlarge": headingXLarge,
  "heading-xsmall": headingXSmall,
  "uppercase-500": uppercase500,
};
