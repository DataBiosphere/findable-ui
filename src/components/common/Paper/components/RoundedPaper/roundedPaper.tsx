import { PaperProps } from "@mui/material";
import { JSX } from "react";
import { BaseComponentProps } from "../../../../types";
import { StyledPaper } from "./roundedPaper.styles";

/**
 * Paper that stretches to fill its container, with a border and rounded corners.
 * @param props - Component props, passed through to the Mui Paper component.
 * @returns The rounded paper.
 */
export const RoundedPaper = (
  props: BaseComponentProps & PaperProps,
): JSX.Element => {
  return <StyledPaper {...props} />;
};
