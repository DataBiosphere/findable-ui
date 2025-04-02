import { Grid, StepContentProps } from "@mui/material";
import React from "react";
import { BaseComponentProps } from "../../../../../types";
import { StyledStepContent } from "./stepContent.styles";

export const StepContent = ({
  children,
  className,
  ...props /* MuiStepContentProps */
}: BaseComponentProps & StepContentProps): JSX.Element => {
  return (
    <StyledStepContent className={className} {...props}>
      <Grid>{children}</Grid>
    </StyledStepContent>
  );
};
