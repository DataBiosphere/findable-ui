import {
  ListItemText as MListItemText,
  MenuItem as MMenuItem,
  MenuItemProps as MMenuItemProps,
} from "@mui/material";
import { JSX, ReactNode } from "react";

/**
 * Props for the MenuItem component.
 */
export interface MenuItemProps extends MMenuItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * Renders a Mui menu item, wrapping its content in list item text without applying list item typography.
 * @param props - Component props.
 * @param props.children - Menu item content.
 * @param props.className - Class name applied to the menu item.
 * @param props.onClick - Function invoked when the menu item is clicked.
 * @returns The menu item.
 */
export const MenuItem = ({
  children,
  className,
  onClick,
  ...props /* Spread props to allow for Mui MenuItem specific prop overrides e.g. "disableGutters". */
}: MenuItemProps): JSX.Element => {
  return (
    <MMenuItem className={className} onClick={onClick} {...props}>
      <MListItemText disableTypography>{children}</MListItemText>
    </MMenuItem>
  );
};
