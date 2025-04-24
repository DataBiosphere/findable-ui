import { ThemeOptions } from "@mui/material";

export const breakpoints = (
  themeOptions: ThemeOptions
): ThemeOptions["breakpoints"] => ({
  values: {
    lg: 1280, // was 1440, "DESKTOP_SM"
    md: 1024, // was 1280
    sm: 768, // "TABLET"
    xl: 1440, // new 1440, "DESKTOP"
    xs: 0, // "MOBILE"
  },
  ...themeOptions.breakpoints,
});
