import { BREAKPOINT_FN_NAME, useBreakpointHelper } from "./useBreakpointHelper";
import {
  UseCurrentBreakpoint,
  useCurrentBreakpoint,
} from "./useCurrentBreakpoint";

export type UseBreakpoint = {
  breakpoint?: UseCurrentBreakpoint; // current breakpoint.
  lg: boolean;
  lgDown: boolean;
  lgUp: boolean;
  md: boolean;
  mdDown: boolean;
  mdUp: boolean;
  sm: boolean; // tablet.
  smDown: boolean;
  smUp: boolean;
  xl: boolean;
  xlDown: boolean;
  xlUp: boolean;
  xs: boolean; // mobile.
  xsDown: boolean;
  xsUp: boolean;
};

export const useBreakpoint = (): UseBreakpoint => {
  const breakpoint = useCurrentBreakpoint();
  // Current breakpoint.
  const xs = breakpoint === "xs";
  const sm = breakpoint === "sm";
  const md = breakpoint === "md";
  const lg = breakpoint === "lg";
  const xl = breakpoint === "xl";
  // Current breakpoint, down.
  const xsDown = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, "xs");
  const smDown = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, "sm");
  const mdDown = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, "md");
  const lgDown = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, "lg");
  const xlDown = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, "xl");
  // Current breakpoint, up.
  const xsUp = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, "xs");
  const smUp = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, "sm");
  const mdUp = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, "md");
  const lgUp = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, "lg");
  const xlUp = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, "xl");
  return {
    breakpoint,
    lg,
    lgDown,
    lgUp,
    md,
    mdDown,
    mdUp,
    sm,
    smDown,
    smUp,
    xl,
    xlDown,
    xlUp,
    xs,
    xsDown,
    xsUp,
  };
};
