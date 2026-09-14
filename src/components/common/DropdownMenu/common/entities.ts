import {
  ButtonProps as MButtonProps,
  IconButtonProps as MIconButtonProps,
} from "@mui/material";

/**
 * Props `DropdownMenu` hands to its `button` render prop. The ARIA keys are
 * included because the trigger has to announce that it opens a menu and whether
 * that menu is open, and only `DropdownMenu` holds the menu's id and state.
 */
export type DropdownMenuButtonKey =
  "aria-controls" | "aria-expanded" | "aria-haspopup" | "onClick" | "open";

export interface DropdownMenuItemProps {
  closeMenu: () => void;
}

export type DropdownMenuButtonProps = MButtonProps & { open?: boolean };
export type DropdownMenuIconButtonProps = MIconButtonProps & { open?: boolean };
