import {
  ToggleButton as MToggleButton,
  ToggleButtonProps,
} from "@mui/material";
import { JSX } from "react";

export const Flag = (props: ToggleButtonProps): JSX.Element | null => {
  return <MToggleButton {...props} value="research"></MToggleButton>;
};
