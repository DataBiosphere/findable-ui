import {
  ButtonProps,
  DividerProps,
  InputLabelProps,
  OutlinedInputProps,
  ToggleButtonGroupProps,
} from "@mui/material";
import { BUTTON_PRESETS } from "../../../../contracts/mui/Button/presets";

export const BUTTON_PROPS: ButtonProps = {
  ...BUTTON_PRESETS.PRIMARY_MEDIUM_CONTAINED,
  fullWidth: true,
  type: "submit",
};

export const DIVIDER_PROPS: DividerProps = {
  flexItem: true,
  orientation: "vertical",
};

export const INPUT_PROPS: OutlinedInputProps = {
  autoFocus: false,
  size: "small",
};

export const INPUT_LABEL_PROPS: InputLabelProps = {
  disableAnimation: true,
  shrink: true,
};

export const TOGGLE_BUTTON_GROUP_PROPS: ToggleButtonGroupProps = {
  exclusive: true,
  fullWidth: true,
};
