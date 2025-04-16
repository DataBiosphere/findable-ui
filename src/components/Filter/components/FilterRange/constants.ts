import {
  ButtonProps,
  DividerProps,
  InputLabelProps,
  OutlinedInputProps,
  ToggleButtonGroupProps,
} from "@mui/material";
import { BUTTON_PROPS as DX_BUTTON_PROPS } from "../../../common/Button/constants";
import { RANGE_OPERATOR } from "./types";

export const BUTTON_PROPS: ButtonProps = {
  ...DX_BUTTON_PROPS.PRIMARY_MEDIUM_CONTAINED,
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

export const RANGE_OPERATOR_DISPLAY: Record<RANGE_OPERATOR, string> = {
  between: "From",
  greaterThan: "Greater Than",
  lessThan: "Less Than",
};

export const TOGGLE_BUTTON_GROUP_PROPS: ToggleButtonGroupProps = {
  exclusive: true,
  fullWidth: true,
};
