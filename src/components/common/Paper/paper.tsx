import { Paper as MPaper, PaperProps as MPaperProps } from "@mui/material";
import { forwardRef, JSX, ReactNode } from "react";
import { TestIdProps } from "../../types";

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

/**
 * Props for the Paper component.
 */
export interface PaperProps extends TestIdProps {
  children: ReactNode | ReactNode[];
  className?: string;
  variant?: MPaperProps["variant"];
}

/**
 * An extension of the basic Mui Paper component with custom variants e.g. "panel".
 * @param props - Component props.
 * @param props.children - Paper content.
 * @param props.className - Class name applied to the paper.
 * @param props.testId - Test id, set as the paper's data-testid attribute.
 * @param props.variant - Paper variant; defaults to "panel".
 * @param ref - Ref forwarded to the paper element.
 * @returns The paper.
 */
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
