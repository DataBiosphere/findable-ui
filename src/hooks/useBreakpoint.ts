import { BREAKPOINT_FN_NAME, useBreakpointHelper } from "./useBreakpointHelper";
import {
  UseCurrentBreakpoint,
  useCurrentBreakpoint,
} from "./useCurrentBreakpoint";

export type UseBreakpoint = {
  breakpoint?: UseCurrentBreakpoint; // current breakpoint.
  lg: boolean; // desktop.
  lgDown: boolean;
  lgUp: boolean;
  md: boolean; // small desktop.
  mdDown: boolean;
  mdUp: boolean;
  sm: boolean; // tablet.
  smDown: boolean;
  smUp: boolean;
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
  // Current breakpoint, down.
  const xsDown = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, "xs");
  const smDown = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, "sm");
  const mdDown = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, "md");
  const lgDown = useBreakpointHelper(BREAKPOINT_FN_NAME.DOWN, "lg");
  // Current breakpoint, up.
  const xsUp = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, "xs");
  const smUp = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, "sm");
  const mdUp = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, "md");
  const lgUp = useBreakpointHelper(BREAKPOINT_FN_NAME.UP, "lg");
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
    xs,
    xsDown,
    xsUp,
  };
};
