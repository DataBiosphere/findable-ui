import { IconButtonProps, SvgIconProps } from "@mui/material";
import { ICON_BUTTON_PROPS as MUI_ICON_BUTTON_PROPS } from "../../../../../../../styles/common/mui/iconButton";
import { SVG_ICON_PROPS as MUI_SVG_ICON_PROPS } from "../../../../../../../styles/common/mui/svgIcon";

export const ICON_BUTTON_PROPS: IconButtonProps = {
  color: MUI_ICON_BUTTON_PROPS.COLOR.INHERIT,
  size: MUI_ICON_BUTTON_PROPS.SIZE.MEDIUM,
};

export const SVG_ICON_PROPS: SvgIconProps = {
  fontSize: MUI_SVG_ICON_PROPS.FONT_SIZE.SMALL,
};
