import { Breakpoint, ThemeOptions } from "@mui/material";

/**
 * Creates breakpoint configuration for theme creation.
 * Merges default breakpoint values with any custom breakpoints provided in theme options.
 * @param themeOptions - Theme options.
 * @returns Breakpoint configuration object with values for xs, sm, md, lg breakpoints.
 */
export const breakpoints = (
  themeOptions: ThemeOptions
): ThemeOptions["breakpoints"] => ({
  values: {
    lg: 1440,
    md: 1280,
    sm: 768,
    xs: 0,
    ...themeOptions.breakpoints?.values,
  },
});

/**
 * Breakpoints
 */
enum BREAKPOINTS {
  DESKTOP = 1440,
  DESKTOP_SM = 1280,
  MOBILE = 0,
  TABLET = 768,
}

/**
 * Breakpoint key constants
 */
const BREAKPOINT_KEY: Record<keyof typeof BREAKPOINTS, Breakpoint> = {
  DESKTOP: "lg",
  DESKTOP_SM: "md",
  MOBILE: "xs",
  TABLET: "sm",
};
export const DESKTOP_SM = BREAKPOINT_KEY.DESKTOP_SM;
