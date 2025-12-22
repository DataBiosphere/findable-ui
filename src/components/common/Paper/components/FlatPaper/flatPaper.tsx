import { PaperProps } from "@mui/material";
import { JSX } from "react";
import { BaseComponentProps } from "../../../../types";
import { StyledPaper } from "./flatPaper.styles";

export const FlatPaper = (
  props: BaseComponentProps & PaperProps,
): JSX.Element => {
  return <StyledPaper {...props} />;
};
