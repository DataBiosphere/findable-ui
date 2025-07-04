import { PaperProps } from "@mui/material";
import React from "react";
import { BaseComponentProps } from "../../../../types";
import { StyledPaper } from "./roundedPaper.styles";

export const RoundedPaper = (
  props: BaseComponentProps & PaperProps
): JSX.Element => {
  return <StyledPaper {...props} />;
};
