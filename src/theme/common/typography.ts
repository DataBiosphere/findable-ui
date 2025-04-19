import { CSSProperties, ThemeOptions } from "@mui/material";
import { tabletUp } from "./breakpoints";

/**
 * Typography Option "body-400"
 */
const body400: CSSProperties = {
  fontSize: 14,
  fontWeight: 400,
  lineHeight: "20px",
};

/**
 * Typography Option "body-400-2lines"
 */
const body4002Lines: CSSProperties = {
  fontSize: 14,
  fontWeight: 400,
  lineHeight: "24px",
};

/**
 * Typography Option "body-500"
 */
const body500: CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
  lineHeight: "20px",
};

/**
 * Typography Option "body-500-2lines"
 */
const body5002Lines: CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
  lineHeight: "24px",
};

/**
 * Typography Option "body-large-400"
 */
const bodyLarge400: CSSProperties = {
  fontSize: 16,
  fontWeight: 400,
  lineHeight: "24px",
};

/**
 * Typography Option "body-large-400-2lines"
 */
const bodyLarge4002Lines: CSSProperties = {
  fontSize: 16,
  fontWeight: 400,
  lineHeight: "28px",
};

/**
 * Typography Option "body-large-500"
 */
const bodyLarge500: CSSProperties = {
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "24px",
};

/**
 * Typography Option "body-small-400"
 */
const bodySmall400: CSSProperties = {
  fontSize: 13,
  fontWeight: 400,
  lineHeight: "16px",
};

/**
 * Typography Option "body-small-400-2lines"
 */
const bodySmall4002Lines: CSSProperties = {
  fontSize: 13,
  fontWeight: 400,
  lineHeight: "20px",
};

/**
 * Typography Option "body-small-500"
 */
const bodySmall500: CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  lineHeight: "16px",
};

/**
 * Typography Option "heading"
 */
const heading: CSSProperties = {
  fontSize: 20,
  fontWeight: 500,
  letterSpacing: "-0.2px",
  lineHeight: "28px",
  [tabletUp]: {
    fontSize: 24,
    letterSpacing: "-0.4px",
    lineHeight: "32px",
  },
};

/**
 * Typography Option "heading-large"
 */
const headingLarge: CSSProperties = {
  fontSize: 24,
  fontWeight: 500,
  letterSpacing: "-0.4px",
  lineHeight: "32px",
  [tabletUp]: {
    fontSize: 30,
    letterSpacing: "-0.8px",
    lineHeight: "40px",
  },
};

/**
 * Typography Option "heading-small"
 */
const headingSmall: CSSProperties = {
  fontSize: 18,
  fontWeight: 500,
  lineHeight: "26px",
  [tabletUp]: {
    fontSize: 20,
    letterSpacing: "-0.2px",
    lineHeight: "28px",
  },
};

/**
 * Typography Option "heading-xlarge"
 */
const headingXLarge: CSSProperties = {
  fontSize: 30,
  fontWeight: 500,
  letterSpacing: "-0.8px",
  lineHeight: "40px",
  [tabletUp]: {
    fontSize: 40,
    letterSpacing: "-1.4px",
    lineHeight: "56px",
  },
};

/**
 * Typography Option "heading-xsmall"
 */
const headingXSmall: CSSProperties = {
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "24px",
};

/**
 * Typography Option "uppercase-500"
 */
const uppercase500: CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  lineHeight: "16px",
  textTransform: "uppercase",
};

export const typography: ThemeOptions["typography"] = {
  fontFamily: "Inter",
  "text-body-400": body400,
  "text-body-400-2lines": body4002Lines,
  "text-body-500": body500,
  "text-body-500-2lines": body5002Lines,
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
