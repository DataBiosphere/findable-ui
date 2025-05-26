import { MenuProps } from "@mui/material";

export const MENU_PROPS: Omit<MenuProps, "anchorEl" | "onClose" | "open"> = {
  anchorOrigin: {
    horizontal: "left",
    vertical: "bottom",
  },
  marginThreshold: 8,
  slotProps: {
    paper: { variant: "menu" },
  },
  transformOrigin: {
    horizontal: "left",
    vertical: "top",
  },
};
