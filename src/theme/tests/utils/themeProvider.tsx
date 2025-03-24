import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { ReactNode } from "react";
import { createAppTheme } from "../../theme";

export function withTheme(children: ReactNode): JSX.Element {
  const theme = createAppTheme();
  return (
    <EmotionThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </EmotionThemeProvider>
  );
}
