import { ListItemTextProps, MenuItemProps, MenuProps } from "@mui/material";

export const LIST_ITEM_TEXT_PROPS: Partial<ListItemTextProps> = {
  primaryTypographyProps: {
    color: "primary",
    component: "span",
    variant: "inherit",
  },
};

export const MENU_PROPS: Partial<MenuProps> = {
  variant: "menu",
};

export const MENU_ITEM_PROPS: Partial<MenuItemProps> = {
  component: "li",
};
