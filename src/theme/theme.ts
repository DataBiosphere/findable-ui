import { createTheme, Theme, ThemeOptions } from "@mui/material";
import { deepmerge } from "@mui/utils";
import * as B from "./common/breakpoints";
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
  return createTheme(
    deepmerge(
      {
        breakpoints: {
          values: {
            lg: B.desktop,
            md: B.desktopSm,
            sm: B.tablet,
            xs: B.mobile,
          },
        },
        components,
        css: { fontFamily: typography.fontFamily },
        cssVariables: true,
        palette,
        shadows,
        spacing: 4,
        typography,
      },
      customOptions
    )
  );
}
