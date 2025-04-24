import { createTheme, Theme, ThemeOptions } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { breakpoints } from "./common/breakpoints";
import { components } from "./common/components";
import { palette } from "./common/palette";
import { shadows } from "./common/shadows";
import { typography } from "./common/typography";

export interface ThemeProps {
  theme: Theme;
}

/**
 * Returns a generated theme with customization.
 * @param customOptions - Custom theme option overrides.
 * @returns theme with custom theme overrides.
 */
export function createAppTheme(customOptions: ThemeOptions = {}): Theme {
  const baseTheme = createTheme({ breakpoints: breakpoints(customOptions) });
  return createTheme(
    deepmerge(
      {
        breakpoints: baseTheme.breakpoints,
        components,
        css: { fontFamily: typography(baseTheme).fontFamily },
        cssVariables: true,
        palette,
        shadows,
        spacing: 4,
        typography: typography(baseTheme),
      },
      customOptions
    )
  );
}
