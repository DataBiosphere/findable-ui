import { Info } from "@mui/icons-material";
import { SvgIconProps, TooltipProps } from "@mui/material";
import { SVG_ICON_PROPS as MUI_SVG_ICON_PROPS } from "../../../../../../../../../../styles/common/mui/svgIcon";

export const SVG_ICON_PROPS: SvgIconProps = {
  color: MUI_SVG_ICON_PROPS.COLOR.INK_LIGHT,
  component: Info,
  fontSize: MUI_SVG_ICON_PROPS.FONT_SIZE.XSMALL,
};

export const TOOLTIP_PROPS: Omit<TooltipProps, "children" | "title"> = {
  disableInteractive: true,
  slotProps: { tooltip: { sx: { maxWidth: 196, textAlign: "center" } } },
};
