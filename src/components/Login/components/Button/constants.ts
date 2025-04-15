import { ButtonProps } from "@mui/material";
import { BUTTON_PROPS as DX_BUTTON_PROPS } from "../../../common/Button/constants";

export const BUTTON_PROPS: Partial<ButtonProps> = {
  ...DX_BUTTON_PROPS.SECONDARY_CONTAINED,
  fullWidth: true,
};
