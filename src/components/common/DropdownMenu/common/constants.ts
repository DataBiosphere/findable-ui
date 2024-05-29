import { MenuProps as MMenuProps } from "@mui/material";

export const DEFAULT_DROPDOWN_MENU_PROPS: Partial<MMenuProps> = {
  anchorOrigin: { horizontal: "right", vertical: "bottom" },
  slotProps: { paper: { variant: "menu" } },
  transformOrigin: { horizontal: "right", vertical: "top" },
};
