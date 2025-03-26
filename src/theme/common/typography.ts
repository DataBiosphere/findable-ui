import { CSSProperties } from "@mui/material/styles/createTypography";
import { tabletUp } from "./breakpoints";

/**
 * Typography constants.
 */
export const fontFamily = "Inter";
const TYPOGRAPHY = {
  TEXT_BODY_400: "text-body-400",
  TEXT_BODY_400_2_LINES: "text-body-400-2lines",
  TEXT_BODY_500: "text-body-500",
  TEXT_BODY_500_2_LINES: "text-body-500-2lines",
  TEXT_BODY_LARGE_400: "text-body-large-400",
  TEXT_BODY_LARGE_400_2_LINES: "text-body-large-400-2lines",
  TEXT_BODY_LARGE_500: "text-body-large-500",
  TEXT_BODY_SMALL_400: "text-body-small-400",
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
  TEXT_BODY_400,
  TEXT_BODY_400_2_LINES,
  TEXT_BODY_500,
  TEXT_BODY_500_2_LINES,
  TEXT_BODY_LARGE_400,
  TEXT_BODY_LARGE_400_2_LINES,
  TEXT_BODY_LARGE_500,
  TEXT_BODY_SMALL_400,
  TEXT_BODY_SMALL_400_2_LINES,
  TEXT_BODY_SMALL_500,
  TEXT_HEADING,
  TEXT_HEADING_LARGE,
  TEXT_HEADING_SMALL,
  TEXT_HEADING_XLARGE,
  TEXT_HEADING_XSMALL,
  TEXT_UPPERCASE_500,
} = TYPOGRAPHY;

/**
 * Typography Option "text-body-400"
 */
export const textBody400: CSSProperties = {
  fontSize: 14,
  fontWeight: 400,
  lineHeight: "20px",
};

/**
 * Typography Option "text-body-400-2lines"
 */
export const textBody4002Lines: CSSProperties = {
  fontSize: 14,
  fontWeight: 400,
  lineHeight: "24px",
};

/**
 * Typography Option "text-body-500"
 */
export const textBody500: CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
  lineHeight: "20px",
};

/**
 * Typography Option "text-body-500-2lines"
 */
export const textBody5002Lines: CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
  lineHeight: "24px",
};

/**
 * Typography Option "text-body-large-400"
 */
export const textBodyLarge400: CSSProperties = {
  fontSize: 16,
  fontWeight: 400,
  lineHeight: "24px",
};

/**
 * Typography Option "text-body-large-400-2lines"
 */
export const textBodyLarge4002Lines: CSSProperties = {
  fontSize: 16,
  fontWeight: 400,
  lineHeight: "28px",
};

/**
 * Typography Option "text-body-large-500"
 */
export const textBodyLarge500: CSSProperties = {
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "24px",
};

/**
 * Typography Option "text-body-small-400"
 */
export const textBodySmall400: CSSProperties = {
  fontSize: 13,
  fontWeight: 400,
  lineHeight: "16px",
};

/**
 * Typography Option "text-body-small-400-2lines"
 */
export const textBodySmall4002Lines: CSSProperties = {
  fontSize: 13,
  fontWeight: 400,
  lineHeight: "20px",
};

/**
 * Typography Option "text-body-small-500"
 */
export const textBodySmall500: CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  lineHeight: "16px",
};

/**
 * Typography Option "text-heading"
 */
export const textHeading: CSSProperties = {
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
 * Typography Option "text-heading-large"
 */
export const textHeadingLarge: CSSProperties = {
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
 * Typography Option "text-heading-small"
 */
export const textHeadingSmall: CSSProperties = {
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
 * Typography Option "text-heading-xlarge"
 */
export const textHeadingXLarge: CSSProperties = {
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
 * Typography Option "text-heading-xsmall"
 */
export const textHeadingXSmall: CSSProperties = {
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "24px",
};

/**
 * Typography Option "text-uppercase-500"
 */
export const textUppercase500: CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  lineHeight: "16px",
  textTransform: "uppercase",
};
