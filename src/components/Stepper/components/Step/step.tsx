import { StepProps } from "@mui/material";
import React from "react";
import { BaseComponentProps } from "../../../types";
import { STEP_PROPS } from "./constants";
import { StyledStep } from "./step.styles";

export const Step = ({
  className,
  ...props /* MuiStepProps */
}: BaseComponentProps & StepProps): JSX.Element => {
  return <StyledStep {...STEP_PROPS} className={className} {...props} />;
};
