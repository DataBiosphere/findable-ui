import { Paper as MPaper, PaperProps as MPaperProps } from "@mui/material";
import { JSX, forwardRef, ReactNode } from "react";
import { TestIdProps } from "../../types";

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

export interface PaperProps extends TestIdProps {
  children: ReactNode | ReactNode[];
  className?: string;
  variant?: MPaperProps["variant"];
}

export const Paper = forwardRef<HTMLDivElement, PaperProps>(function Paper(
  { children, className, testId, variant = "panel" }: PaperProps,
  ref,
): JSX.Element {
  return (
    <MPaper
      className={className}
      data-testid={testId}
      ref={ref}
      variant={variant}
    >
      {children}
    </MPaper>
  );
});
