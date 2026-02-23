import { ToggleButtonOwnProps, ToggleButtonGroupProps } from "@mui/material";
import { MODE } from "../../types";

export const TOGGLE_BUTTON_GROUP_PROPS: ToggleButtonGroupProps = {
  exclusive: true,
};

export const TOGGLE_BUTTONS: (Omit<ToggleButtonOwnProps, "value"> & {
  value: MODE;
})[] = [
  { children: "Research", value: MODE.RESEARCH },
  { children: "Search", value: MODE.SEARCH },
];
