import { StepProps } from "@mui/material";
import { JSX } from "react";
import { BaseComponentProps } from "../../../types";
import { STEP_PROPS } from "./constants";
import { StyledStep } from "./step.styles";

/**
 * Step in a stepper.
 * @param props - Component props; other props are passed to the MUI step.
 * @param props.className - Class name applied to the step.
 * @returns The step.
 */
export const Step = ({
  className,
  ...props /* MuiStepProps */
}: BaseComponentProps & StepProps): JSX.Element => {
  return <StyledStep {...STEP_PROPS} className={className} {...props} />;
};
