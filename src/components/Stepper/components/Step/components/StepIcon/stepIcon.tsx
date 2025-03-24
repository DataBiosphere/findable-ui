import { StepIconProps } from "@mui/material";
import React from "react";
import { TestIdProps } from "../../../../../types";
import { CompletedIcon } from "./components/CompletedIcon/completedIcon";
import { StyledStepIcon } from "./stepIcon.styles";

export const StepIcon = ({
  completed,
  icon,
  testId,
  ...props
}: StepIconProps & TestIdProps): JSX.Element => {
  return (
    <StyledStepIcon
      completed={completed}
      data-testid={testId}
      icon={completed ? <CompletedIcon /> : icon}
      {...props}
    />
  );
};
