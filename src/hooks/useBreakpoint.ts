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
  const xsDown = false;
  const smDown = xs;
  const mdDown = xs || sm;
  const lgDown = xs || sm || md;
  // Current breakpoint, up.
  const xsUp = xs || sm || md || lg;
  const smUp = sm || md || lg;
  const mdUp = md || lg;
  const lgUp = lg;
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
