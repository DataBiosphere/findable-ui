import { IconButtonProps, InputAdornmentProps } from "@mui/material";
import { ICON_BUTTON_PROPS as MUI_ICON_BUTTON_PROPS } from "../../../../../../../styles/common/mui/iconButton";
import { INPUT_ADORNMENT_PROPS as MUI_INPUT_ADORNMENT_PROPS } from "../../../../../../../styles/common/mui/inputAdornment";

export const ICON_BUTTON_PROPS: IconButtonProps = {
  color: MUI_ICON_BUTTON_PROPS.COLOR.INHERIT,
  edge: MUI_ICON_BUTTON_PROPS.EDGE.END,
  size: MUI_ICON_BUTTON_PROPS.SIZE.MEDIUM,
};

export const INPUT_ADORNMENT_PROPS: InputAdornmentProps = {
  position: MUI_INPUT_ADORNMENT_PROPS.POSITION.END,
};
