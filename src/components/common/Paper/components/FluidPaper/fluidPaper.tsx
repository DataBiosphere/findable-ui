import { PaperProps } from "@mui/material";
import { JSX } from "react";
import { BaseComponentProps } from "../../../../types";
import { StyledPaper } from "./fluidPaper.styles";

export const FluidPaper = (
  props: BaseComponentProps & PaperProps,
): JSX.Element => {
  return <StyledPaper {...props} />;
};
