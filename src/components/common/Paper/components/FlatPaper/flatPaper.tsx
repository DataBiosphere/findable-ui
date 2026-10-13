import { PaperProps } from "@mui/material";
import { JSX } from "react";
import { BaseComponentProps } from "../../../../types";
import { StyledPaper } from "./flatPaper.styles";

/**
 * Paper that stretches to fill its container, with no side borders or border radius.
 * @param props - Component props, passed through to the Mui Paper component.
 * @returns The flat paper.
 */
export const FlatPaper = (
  props: BaseComponentProps & PaperProps,
): JSX.Element => {
  return <StyledPaper {...props} />;
};
