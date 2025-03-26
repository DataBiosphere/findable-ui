import { StepperProps } from "@mui/material";

type StepperPropsOptions = {
  ORIENTATION: typeof ORIENTATION;
};

const ORIENTATION: Record<string, StepperProps["orientation"]> = {
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
};

export const STEPPER_PROPS: StepperPropsOptions = {
  ORIENTATION,
};
