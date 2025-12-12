import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Preview } from "@storybook/nextjs-vite";
import React from "react";
import { createAppTheme } from "../theme/theme";

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
