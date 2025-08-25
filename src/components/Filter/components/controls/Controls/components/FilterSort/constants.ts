import { ListItemTextProps, MenuProps, SvgIconProps } from "@mui/material";
import { SVG_ICON_PROPS as MUI_SVG_ICON_PROPS } from "../../../../../../../styles/common/mui/svgIcon";
import { TYPOGRAPHY_PROPS } from "../../../../../../../styles/common/mui/typography";

export const LIST_ITEM_BUTTON_TEXT_PROPS: ListItemTextProps = {
  slotProps: { primary: { variant: TYPOGRAPHY_PROPS.VARIANT.BODY_400 } },
};

export const LIST_ITEM_TEXT_PROPS: ListItemTextProps = {
  slotProps: { primary: { variant: TYPOGRAPHY_PROPS.VARIANT.BODY_500 } },
};

export const MENU_PROPS: Omit<MenuProps, "anchorEl" | "onClose" | "open"> = {
  anchorOrigin: { horizontal: "left", vertical: "bottom" },
  marginThreshold: 8,
  slotProps: { paper: { variant: "menu" } },
  transformOrigin: { horizontal: "left", vertical: "top" },
};

export const SVG_ICON_PROPS: SvgIconProps = {
  fontSize: MUI_SVG_ICON_PROPS.FONT_SIZE.SMALL,
};
