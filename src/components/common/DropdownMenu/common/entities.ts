import {
  ButtonProps as MButtonProps,
  IconButtonProps as MIconButtonProps,
} from "@mui/material";

export interface DropdownMenuItemProps {
  closeMenu: () => void;
}

export type DropdownMenuButtonProps = MButtonProps & { open?: boolean };
export type DropdownMenuIconButtonProps = MIconButtonProps & { open?: boolean };
