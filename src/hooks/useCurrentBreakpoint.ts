import { Breakpoint } from "@mui/material";
import { useMemo } from "react";
import {
  BREAKPOINT_FN_NAME,
  BreakpointKey,
  useBreakpointHelper,
} from "./useBreakpointHelper";

export type UseCurrentBreakpoint = BreakpointKey | undefined;

const breakpointKeys: BreakpointKey[] = ["xs", "sm", "md", "lg"];

/**
 * Returns the breakpoint the viewport is at.
 * @returns The current breakpoint (xs, sm, md or lg); undefined until the media queries
 * resolve (e.g. the first render), or above lg when the theme defines a larger breakpoint.
 */
export const useCurrentBreakpoint = (): UseCurrentBreakpoint => {
  const xs = useBreakpointHelper(BREAKPOINT_FN_NAME.ONLY, "xs");
  const sm = useBreakpointHelper(BREAKPOINT_FN_NAME.ONLY, "sm");
  const md = useBreakpointHelper(BREAKPOINT_FN_NAME.ONLY, "md");
  const lg = useBreakpointHelper(BREAKPOINT_FN_NAME.ONLY, "lg");
  const breakpoints: Record<Breakpoint, boolean> = useMemo(
    () => ({ lg, md, sm, xs }),
    [lg, md, sm, xs],
  );
  return breakpointKeys.find((key) => breakpoints[key]);
};
