import { StepIconProps } from "@mui/material";
import React from "react";
import { CompletedIcon } from "./components/CompletedIcon/completedIcon";
import { StyledStepIcon } from "./stepIcon.styles";

export const StepIcon = ({
  completed,
  icon,
  ...props
}: StepIconProps): JSX.Element => {
  return (
    <StyledStepIcon
      completed={completed}
      icon={completed ? <CompletedIcon /> : icon}
      {...props}
    />
  );
};
