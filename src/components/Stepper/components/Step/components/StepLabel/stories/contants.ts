import { ComponentProps } from "react";
import { MUI_CONTROLS } from "../../../../../../../storybook/controls/constants";
import { StepLabel } from "../stepLabel";

export const DISABLED_CONTROLS: (keyof ComponentProps<typeof StepLabel>)[] = [
  ...MUI_CONTROLS,
  "children",
  "error",
  "icon",
  "optional",
  "slotProps",
  "slots",
];

export const EXCLUDED_CONTROLS: (keyof ComponentProps<typeof StepLabel>)[] = [
  "componentsProps", // deprecated
  "StepIconComponent", // deprecated
  "StepIconProps", // deprecated
];
