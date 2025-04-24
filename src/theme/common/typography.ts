import { CSSProperties, Theme, TypographyVariantsOptions } from "@mui/material";
import { mediaUpSmall } from "../../styles/common/mixins/breakpoints";

/**
 * Typography Option "body-400"
 */
const body400: CSSProperties = {
  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "20px",
};

/**
 * Typography Option "body-400-2lines"
 */
const body4002Lines: CSSProperties = {
  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "24px",
};

/**
 * Typography Option "body-500"
 */
const body500: CSSProperties = {
  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "20px",
};

/**
 * Typography Option "body-500-2lines"
 */
const body5002Lines: CSSProperties = {
  fontFamily: "Inter",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "24px",
};

/**
 * Typography Option "body-large-400"
 */
const bodyLarge400: CSSProperties = {
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
};

/**
 * Typography Option "body-large-400-2lines"
 */
const bodyLarge4002Lines: CSSProperties = {
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "28px",
};

/**
 * Typography Option "body-large-500"
 */
const bodyLarge500: CSSProperties = {
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
};

/**
 * Typography Option "body-small-400"
 */
const bodySmall400: CSSProperties = {
  fontFamily: "Inter",
  fontSize: "13px",
  fontWeight: 400,
  lineHeight: "16px",
};

/**
 * Typography Option "body-small-400-2lines"
 */
const bodySmall4002Lines: CSSProperties = {
  fontFamily: "Inter",
  fontSize: "13px",
  fontWeight: 400,
  lineHeight: "20px",
};

/**
 * Typography Option "body-small-500"
 */
const bodySmall500: CSSProperties = {
  fontFamily: "Inter",
  fontSize: "13px",
  fontWeight: 500,
  lineHeight: "16px",
};

/**
 * Typography Option "heading"
 * @param theme - Base Theme
 * @returns CSSProperties
 */
const heading = (theme: Theme): CSSProperties => ({
  fontFamily: "Inter",
  fontSize: "20px",
  fontWeight: 500,
  letterSpacing: "-0.2px",
  lineHeight: "28px",
  [mediaUpSmall({ theme })]: {
    fontSize: "24px",
    letterSpacing: "-0.4px",
    lineHeight: "32px",
  },
});

/**
 * Typography Option "heading-large"
 * @param theme - Base Theme.
 * @returns CSSProperties.
 */
const headingLarge = (theme: Theme): CSSProperties => ({
  fontFamily: "Inter",
  fontSize: "24px",
  fontWeight: 500,
  letterSpacing: "-0.4px",
  lineHeight: "32px",
  [mediaUpSmall({ theme })]: {
    fontSize: "30px",
    letterSpacing: "-0.8px",
    lineHeight: "40px",
  },
});

/**
 * Typography Option "heading-small"
 * @param theme - Base Theme.
 * @returns CSSProperties.
 */
const headingSmall = (theme: Theme): CSSProperties => ({
  fontFamily: "Inter",
  fontSize: "18px",
  fontWeight: 500,
  lineHeight: "26px",
  [mediaUpSmall({ theme })]: {
    fontSize: "20px",
    letterSpacing: "-0.2px",
    lineHeight: "28px",
  },
});

/**
 * Typography Option "heading-xlarge"
 * @param theme - Base Theme.
 * @returns CSSProperties.
 */
const headingXLarge = (theme: Theme): CSSProperties => ({
  fontFamily: "Inter",
  fontSize: "30px",
  fontWeight: 500,
  letterSpacing: "-0.8px",
  lineHeight: "40px",
  [mediaUpSmall({ theme })]: {
    fontSize: "40px",
    letterSpacing: "-1.4px",
    lineHeight: "56px",
  },
});

/**
 * Typography Option "heading-xsmall"
 */
const headingXSmall: CSSProperties = {
  fontFamily: "Inter",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "24px",
};

/**
 * Typography Option "uppercase-500"
 */
const uppercase500: CSSProperties = {
  fontFamily: "Inter",
  fontSize: "12px",
  fontWeight: 500,
  lineHeight: "16px",
  textTransform: "uppercase",
};

export const typography = (theme: Theme): TypographyVariantsOptions => ({
  "body-400": body400,
  "body-400-2lines": body4002Lines,
  "body-500": body500,
  "body-500-2lines": body5002Lines,
  "body-large-400": bodyLarge400,
  "body-large-400-2lines": bodyLarge4002Lines,
  "body-large-500": bodyLarge500,
  "body-small-400": bodySmall400,
  "body-small-400-2lines": bodySmall4002Lines,
  "body-small-500": bodySmall500,
  fontFamily: "Inter",
  heading: heading(theme),
  "heading-large": headingLarge(theme),
  "heading-small": headingSmall(theme),
  "heading-xlarge": headingXLarge(theme),
  "heading-xsmall": headingXSmall,
  "uppercase-500": uppercase500,
});
