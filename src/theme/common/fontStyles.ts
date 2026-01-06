import { ThemeOptions, TypographyVariantsOptions } from "@mui/material";

/**
 * Extracts fontFamily from theme options for base theme creation.
 * Ensures custom fontFamily is properly configured for CSS variables and theme typography.
 * @param themeOptions - Theme Options.
 * @returns Object containing fontFamily (custom or default "Inter").
 */
export const fontStyles = (
  themeOptions: ThemeOptions,
): Pick<TypographyVariantsOptions, "fontFamily"> => {
  const typography = themeOptions.typography || {};

  if ("fontFamily" in typography) return { fontFamily: typography.fontFamily };

  return { fontFamily: "Inter" };
};
