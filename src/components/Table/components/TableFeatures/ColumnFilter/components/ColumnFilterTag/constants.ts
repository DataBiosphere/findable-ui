import { ChipProps, SvgIconProps } from "@mui/material";
import { CHIP_PROPS as MUI_CHIP_PROPS } from "../../../../../../../styles/common/mui/chip";
import { SVG_ICON_PROPS as MUI_SVG_ICON_PROPS } from "../../../../../../../styles/common/mui/svgIcon";

export const CHIP_PROPS: ChipProps = {
  clickable: false,
  color: MUI_CHIP_PROPS.COLOR.DEFAULT,
  size: MUI_CHIP_PROPS.SIZE.MEDIUM,
};

export const SVG_ICON_PROPS: SvgIconProps = {
  color: MUI_SVG_ICON_PROPS.COLOR.INHERIT,
};
