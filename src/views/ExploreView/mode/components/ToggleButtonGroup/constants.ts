import { ToggleButtonOwnProps, ToggleButtonGroupProps } from "@mui/material";
import { MODE } from "../../types";

export const TOGGLE_BUTTON_GROUP_PROPS: ToggleButtonGroupProps = {
  exclusive: true,
  fullWidth: true,
};

export const TOGGLE_BUTTONS: (Omit<ToggleButtonOwnProps, "value"> & {
  value: MODE;
})[] = [
  // `disabled` and `selected` are temporary until we have the mode context fully implemented and can set the value based on that context.
  { children: "Research", disabled: true, value: MODE.RESEARCH },
  { children: "Search", selected: true, value: MODE.SEARCH },
];
