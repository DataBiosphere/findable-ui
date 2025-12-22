import { StepLabelProps } from "@mui/material";
import { JSX } from "react";
import { STEP_LABEL_PROPS } from "./constants";
import { StyledStepLabel } from "./stepLabel.styles";

export const StepLabel = ({
  ...props /* MuiStepLabelProps */
}: StepLabelProps): JSX.Element => {
  return <StyledStepLabel {...STEP_LABEL_PROPS} {...props} />;
};
