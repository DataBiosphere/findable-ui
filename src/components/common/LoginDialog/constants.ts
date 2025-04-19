import {
  DialogContentTextProps,
  DialogProps,
  DialogTitleProps,
  IconButtonProps,
  IconProps,
} from "@mui/material";
import { FONT_SIZE } from "../../../styles/common/mui/icon";
import { TYPOGRAPHY_PROPS } from "../../../styles/common/mui/typography";

export const DIALOG_CONTENT_TEXT_PROPS: DialogContentTextProps = {
  color: TYPOGRAPHY_PROPS.COLOR.INK_LIGHT,
  component: "div",
  variant: TYPOGRAPHY_PROPS.VARIANT.BODY_400,
};

export const DIALOG_PROPS: Partial<DialogProps> = {
  PaperProps: { elevation: 0 },
};

export const DIALOG_TITLE_PROPS: DialogTitleProps = {
  variant: TYPOGRAPHY_PROPS.VARIANT.HEADING_SMALL,
};

export const ICON_BUTTON_PROPS: IconButtonProps = {
  color: "inkLight",
  edge: "end",
  size: "xsmall",
};

export const ICON_PROPS: Pick<IconProps, "fontSize"> = {
  fontSize: FONT_SIZE.SMALL,
};
