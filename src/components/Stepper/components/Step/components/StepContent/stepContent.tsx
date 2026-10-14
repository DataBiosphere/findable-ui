import { Grid, StepContentProps } from "@mui/material";
import { JSX } from "react";
import { BaseComponentProps } from "../../../../../types";
import { StyledStepContent } from "./stepContent.styles";

/**
 * Step content, laid out in a grid.
 * @param props - Component props; other props are passed to the MUI step content.
 * @param props.children - Step content.
 * @param props.className - Class name applied to the step content.
 * @returns The step content.
 */
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
