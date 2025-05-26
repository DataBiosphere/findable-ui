import { MenuProps } from "@mui/material";

export const MENU_PROPS: Omit<MenuProps, "anchorEl" | "onClose" | "open"> = {
  anchorOrigin: {
    horizontal: "right",
    vertical: "bottom",
  },
  marginThreshold: 8,
  slotProps: {
    paper: { variant: "menu" },
  },
  transformOrigin: {
    horizontal: "right",
    vertical: "top",
  },
};
