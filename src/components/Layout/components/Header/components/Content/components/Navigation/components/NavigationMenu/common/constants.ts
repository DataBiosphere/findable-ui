import { MenuProps as MMenuProps } from "@mui/material";

export const MENU_ANCHOR_ORIGIN_LEFT_BOTTOM: MMenuProps["anchorOrigin"] = {
  horizontal: "left",
  vertical: "bottom",
};

export const MENU_ANCHOR_ORIGIN_RIGHT_TOP: MMenuProps["anchorOrigin"] = {
  horizontal: "right",
  vertical: "top",
};

export const MENU_PROPS: Partial<MMenuProps> = {
  slotProps: {
    paper: {
      variant: "menu",
    },
  },
  transformOrigin: {
    horizontal: "left",
    vertical: "top",
  },
};
