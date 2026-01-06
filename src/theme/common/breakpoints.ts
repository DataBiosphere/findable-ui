import { ThemeOptions } from "@mui/material";

/**
 * Creates breakpoint configuration for theme creation.
 * Merges default breakpoint values with any custom breakpoints provided in theme options.
 * @param themeOptions - Theme options.
 * @returns Breakpoint configuration object with values for xs, sm, md, lg breakpoints.
 */
export const breakpoints = (
  themeOptions: ThemeOptions,
): ThemeOptions["breakpoints"] => ({
  values: {
    lg: 1440,
    md: 1280,
    sm: 768,
    xs: 0,
    ...themeOptions.breakpoints?.values,
  },
});
