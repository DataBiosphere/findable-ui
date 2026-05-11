import { MenuProps } from "@mui/material";
import { PAPER_PROPS } from "../../../../../../../../../../../../styles/common/mui/paper";
import {
  POPOVER_ORIGIN_HORIZONTAL,
  POPOVER_ORIGIN_VERTICAL,
} from "../../../../../../../../../../../../styles/common/mui/popover";

export const MENU_PROPS: Partial<MenuProps> = {
  anchorOrigin: {
    horizontal: POPOVER_ORIGIN_HORIZONTAL.RIGHT,
    vertical: POPOVER_ORIGIN_VERTICAL.BOTTOM,
  },
  autoFocus: false,
  slotProps: { paper: { variant: PAPER_PROPS.VARIANT.MENU } },
  transformOrigin: {
    horizontal: POPOVER_ORIGIN_HORIZONTAL.RIGHT,
    vertical: POPOVER_ORIGIN_VERTICAL.TOP,
  },
};
