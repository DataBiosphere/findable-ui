import { PaperProps } from "@mui/material";
import { JSX } from "react";
import { BaseComponentProps } from "../../../../types";
import { StyledPaper } from "./fluidPaper.styles";

/**
 * Rounded paper that drops its side borders and border radius below the "sm" breakpoint.
 * @param props - Component props, passed through to the RoundedPaper component.
 * @returns The fluid paper.
 */
export const FluidPaper = (
  props: BaseComponentProps & PaperProps,
): JSX.Element => {
  return <StyledPaper {...props} />;
};
