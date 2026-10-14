import { Breakpoint, Theme, useMediaQuery } from "@mui/material";

export enum BREAKPOINT_FN_NAME {
  DOWN = "down",
  ONLY = "only",
  UP = "up",
}

type BreakpointFnName = BREAKPOINT_FN_NAME;
export type BreakpointKey = Breakpoint;

/**
 * Returns whether the viewport matches MUI's breakpoint helper for the given
 * breakpoint, e.g. down("md").
 * https://mui.com/material-ui/react-use-media-query/#using-muis-breakpoint-helpers
 * @param fnName - Breakpoint helper: down, only or up.
 * @param breakpointKey - Breakpoint key.
 * @returns True when the media query matches.
 */
export const useBreakpointHelper = (
  fnName: BreakpointFnName,
  breakpointKey: BreakpointKey,
): boolean => {
  return useMediaQuery((theme: Theme) =>
    theme.breakpoints[fnName](breakpointKey),
  );
};
