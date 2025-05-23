import { ButtonGroupProps } from "@mui/material";
import { BUTTON_GROUP_PROPS as MUI_BUTTON_GROUP_PROPS } from "../../../styles/common/mui/buttonGroup";

export const BUTTON_GROUP_PROPS: Record<string, Partial<ButtonGroupProps>> = {
  PRIMARY_CONTAINED: {
    color: MUI_BUTTON_GROUP_PROPS.COLOR.PRIMARY,
    variant: MUI_BUTTON_GROUP_PROPS.VARIANT.CONTAINED,
  },
  SECONDARY_OUTLINED: {
    color: MUI_BUTTON_GROUP_PROPS.COLOR.SECONDARY,
    variant: MUI_BUTTON_GROUP_PROPS.VARIANT.OUTLINED,
  },
};
