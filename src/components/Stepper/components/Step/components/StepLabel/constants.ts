import { StepLabelProps } from "@mui/material";
import { StepIcon } from "../StepIcon/stepIcon";
import { Label } from "./components/Label/label";

export const STEP_LABEL_PROPS: StepLabelProps = {
  slots: {
    label: Label,
    stepIcon: StepIcon,
  },
};
