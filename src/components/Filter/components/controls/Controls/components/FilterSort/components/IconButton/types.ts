import { MenuProps, IconButtonProps as MIconButtonProps } from "@mui/material";

export type IconButtonProps = MIconButtonProps & Pick<MenuProps, "open">;
