import { createTheme, Theme, ThemeOptions } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { breakpoints } from "./common/breakpoints";
import { components } from "./common/components";
import { fontStyles } from "./common/fontStyles";
import { palette } from "./common/palette";
import { shadows } from "./common/shadows";
import { typography } from "./common/typography";

/**
 * Returns a generated theme with customization.
 * @param customOptions - Custom theme option overrides.
 * @returns theme with custom theme overrides.
 */
export function createAppTheme(customOptions: ThemeOptions = {}): Theme {
  // Clone custom options to avoid mutation.
  const options = { ...customOptions };

  // Create base theme.
  const baseTheme = createTheme({
    breakpoints: breakpoints(options),
    typography: fontStyles(options),
  });

  // Remove breakpoints from custom options.
  delete options.breakpoints;

  // Generate default theme with custom overrides.
  return createTheme(
    deepmerge(
      {
        app: { fontFamily: baseTheme.typography.fontFamily },
        breakpoints: baseTheme.breakpoints,
        components,
        cssVarPrefix: "",
        cssVariables: true,
        palette,
        shadows,
        spacing: 4,
        typography: typography(baseTheme),
      },
      options,
    ),
  );
}
