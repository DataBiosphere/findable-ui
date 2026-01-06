import { Breakpoint } from "@mui/material";
import { useMemo } from "react";
import {
  BREAKPOINT_FN_NAME,
  BreakpointKey,
  useBreakpointHelper,
} from "./useBreakpointHelper";

export type UseCurrentBreakpoint = BreakpointKey | undefined;

const breakpointKeys: BreakpointKey[] = ["xs", "sm", "md", "lg"];

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
