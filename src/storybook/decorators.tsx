import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Preview } from "@storybook/nextjs-vite";
import { createAppTheme } from "../theme/theme";

/**
 * Storybook decorator that wraps every story in the app theme and CSS baseline.
 * @param Story - Story to render.
 * @param context - Story context.
 * @returns The themed story.
 */
export const decorators: Preview["decorators"] = (Story, context) => {
  const theme = createAppTheme();
  return (
    <EmotionThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story {...context} />
      </ThemeProvider>
    </EmotionThemeProvider>
  );
};
