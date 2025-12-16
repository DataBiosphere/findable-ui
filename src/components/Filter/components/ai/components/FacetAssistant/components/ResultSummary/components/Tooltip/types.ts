import { TooltipProps as MTooltipProps } from "@mui/material";
import { ReactElement } from "react";

export interface TooltipProps extends Omit<MTooltipProps, "children"> {
  children: (ref: (node: HTMLSpanElement | null) => void) => ReactElement;
}
