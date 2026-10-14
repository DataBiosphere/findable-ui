import { StepIconProps } from "@mui/material";
import { JSX } from "react";
import { TestIdProps } from "../../../../../types";
import { CompletedIcon } from "./components/CompletedIcon/completedIcon";
import { StyledStepIcon } from "./stepIcon.styles";

/**
 * Step icon; shows a check mark when the step is completed.
 * @param props - Component props; other props are passed to the MUI step icon.
 * @param props.completed - Whether the step is completed.
 * @param props.icon - Icon shown while the step is not completed.
 * @param props.testId - Test id.
 * @returns The step icon.
 */
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
      icon={completed ? <CompletedIcon testId={testId} /> : icon}
      {...props}
    />
  );
};
