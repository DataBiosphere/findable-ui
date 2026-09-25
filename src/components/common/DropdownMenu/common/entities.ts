import {
  ButtonProps as MButtonProps,
  IconButtonProps as MIconButtonProps,
} from "@mui/material";
import type { PopupAriaProps } from "../../../../utils/ariaPopup";

/**
 * Props `DropdownMenu` hands to its `button` render prop. The ARIA keys are
 * included because the trigger has to announce that it opens a menu and whether
 * that menu is open, and only `DropdownMenu` holds the menu's id and state.
 * `disabled` is handed over only when set on `DropdownMenu`.
 */
export type DropdownMenuButtonKey =
  keyof PopupAriaProps | "disabled" | "onClick" | "open";

export interface DropdownMenuItemProps {
  closeMenu: () => void;
}

export type DropdownMenuButtonProps = MButtonProps & { open?: boolean };
export type DropdownMenuIconButtonProps = MIconButtonProps & { open?: boolean };
