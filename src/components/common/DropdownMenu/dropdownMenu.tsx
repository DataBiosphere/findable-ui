import { MenuProps as MMenuProps } from "@mui/material";
import React, { Fragment } from "react";
import { useMenu } from "../Menu/hooks/useMenu";
import { DEFAULT_DROPDOWN_MENU_PROPS } from "./common/constants";
import {
  DropdownMenuButtonProps,
  DropdownMenuIconButtonProps,
  DropdownMenuItemProps,
} from "./common/entities";
import { StyledMenu } from "./dropdownMenu.styles";

export interface DropdownMenuProps
  extends Omit<MMenuProps, "children" | "open"> {
  button: (
    props:
      | Pick<DropdownMenuButtonProps, "onClick" | "open">
      | Pick<DropdownMenuIconButtonProps, "onClick" | "open">
  ) => JSX.Element;
  children?: ({ closeMenu }: DropdownMenuItemProps) => JSX.Element[];
  className?: string;
}

export const DropdownMenu = ({
  button,
  children,
  className,
  ...props /* Spread props to allow for Mui Menu specific prop overrides e.g. "anchorOrigin". */
}: DropdownMenuProps): JSX.Element => {
  const {
    anchorEl,
    onClose: closeMenu,
    onOpen: openMenu,
    open,
  } = useMenu<HTMLButtonElement>();
  return (
    <Fragment>
      {button({ onClick: openMenu, open })}
      <StyledMenu
        {...DEFAULT_DROPDOWN_MENU_PROPS}
        anchorEl={anchorEl}
        className={className}
        onClose={closeMenu}
        open={open}
        {...props}
      >
        {children ? children({ closeMenu }) : null}
      </StyledMenu>
    </Fragment>
  );
};
