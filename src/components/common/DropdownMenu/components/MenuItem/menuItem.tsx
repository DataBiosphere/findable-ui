import {
  ListItemText as MListItemText,
  MenuItem as MMenuItem,
  MenuItemProps as MMenuItemProps,
} from "@mui/material";
import { JSX, ReactNode } from "react";

export interface MenuItemProps extends MMenuItemProps {
  children: ReactNode;
  className?: string;
}

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
