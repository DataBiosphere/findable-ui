import { ButtonProps } from "@mui/material";
import { BUTTON_PROPS as MUI_BUTTON_PROPS } from "../../../styles/common/mui/button";

export const BUTTON_PROPS: Record<string, Partial<ButtonProps>> = {
  PRIMARY_CONTAINED: {
    color: MUI_BUTTON_PROPS.COLOR.PRIMARY,
    variant: MUI_BUTTON_PROPS.VARIANT.CONTAINED,
  },
  PRIMARY_MEDIUM_CONTAINED: {
    color: MUI_BUTTON_PROPS.COLOR.PRIMARY,
    size: MUI_BUTTON_PROPS.SIZE.MEDIUM,
    variant: MUI_BUTTON_PROPS.VARIANT.CONTAINED,
  },
  SECONDARY_CONTAINED: {
    color: MUI_BUTTON_PROPS.COLOR.SECONDARY,
    variant: MUI_BUTTON_PROPS.VARIANT.CONTAINED,
  },
  SECONDARY_MEDIUM_CONTAINED: {
    color: MUI_BUTTON_PROPS.COLOR.SECONDARY,
    size: MUI_BUTTON_PROPS.SIZE.MEDIUM,
    variant: MUI_BUTTON_PROPS.VARIANT.CONTAINED,
  },
};
