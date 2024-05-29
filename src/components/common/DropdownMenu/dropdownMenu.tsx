import { MenuProps as MMenuProps } from "@mui/material";
import React, { ElementType, Fragment, MouseEvent, useState } from "react";
import { DEFAULT_DROPDOWN_MENU_PROPS } from "./common/constants";
import {
  DropdownMenuButtonProps,
  DropdownMenuIconButtonProps,
  DropdownMenuItemProps,
} from "./common/entities";
import { Menu } from "./dropdownMenu.styles";

export interface DropdownMenuProps
  extends Omit<MMenuProps, "children" | "open"> {
  Button:
    | ElementType<DropdownMenuButtonProps>
    | ElementType<DropdownMenuIconButtonProps>;
  children?: ({ closeMenu }: DropdownMenuItemProps) => JSX.Element[];
  className?: string;
}

export const DropdownMenu = ({
  Button,
  children,
  className,
  ...props /* Spread props to allow for Mui Menu specific prop overrides e.g. "anchorOrigin". */
}: DropdownMenuProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const closeMenu = (): void => setAnchorEl(null);
  return (
    <Fragment>
      <Button
        onClick={(event: MouseEvent<HTMLButtonElement>): void =>
          setAnchorEl(event.currentTarget)
        }
        open={Boolean(anchorEl)}
      />
      <Menu
        {...DEFAULT_DROPDOWN_MENU_PROPS}
        anchorEl={anchorEl}
        className={className}
        onClose={closeMenu}
        open={Boolean(anchorEl)}
        {...props}
      >
        {children ? children({ closeMenu }) : null}
      </Menu>
    </Fragment>
  );
};
