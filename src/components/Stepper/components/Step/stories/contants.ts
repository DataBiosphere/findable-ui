import { ComponentProps } from "react";
import { MUI_CONTROLS } from "../../../../../storybook/controls/constants";
import { Step } from "../step";

export const BOOLEAN_CONTROLS: (keyof ComponentProps<typeof Step>)[] = [
  "active",
  "completed",
  "disabled",
  "expanded",
  "last",
];

export const DISABLED_CONTROLS: (keyof ComponentProps<typeof Step>)[] = [
  ...MUI_CONTROLS,
  "children",
  "component",
  "style",
];
