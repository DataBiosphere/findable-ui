import { Breakpoint, Theme, useMediaQuery } from "@mui/material";

/**
 * Hook utilising Mui's breakpoint helper (media query hook).
 * https://mui.com/material-ui/react-use-media-query/#using-muis-breakpoint-helpers
 */

export enum BREAKPOINT_FN_NAME {
  DOWN = "down",
  ONLY = "only",
  UP = "up",
}

type BreakpointFnName = BREAKPOINT_FN_NAME;
export type BreakpointKey = Breakpoint;

export const useBreakpointHelper = (
  fnName: BreakpointFnName,
  breakpointKey: BreakpointKey,
): boolean => {
  return useMediaQuery((theme: Theme) =>
    theme.breakpoints[fnName](breakpointKey),
  );
};
