import { Paper as MPaper, PaperProps as MPaperProps } from "@mui/material";
import React, { forwardRef, ReactNode } from "react";

/**
 * An extension of the basic Mui Paper component with custom variants e.g. "panel".
 */

/**
 * Model of paper variant "panel" style.
 */
export type PaperPanelStyle = keyof typeof PAPER_PANEL_STYLE;

/**
 * Possible set of paper variant "panel" style values.
 */
export enum PAPER_PANEL_STYLE {
  FLAT = "FLAT",
  FLUID = "FLUID",
  NONE = "NONE",
  ROUNDED = "ROUNDED",
}

export interface PaperProps {
  children: ReactNode | ReactNode[];
  className?: string;
  variant?: MPaperProps["variant"];
}

export const Paper = forwardRef<HTMLDivElement, PaperProps>(function Paper(
  { children, className, variant = "panel" }: PaperProps,
  ref
): JSX.Element {
  return (
    <MPaper className={className} ref={ref} variant={variant}>
      {children}
    </MPaper>
  );
});
