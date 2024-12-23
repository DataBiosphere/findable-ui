import { MenuProps as MMenuProps } from "@mui/material";
import React from "react";
import { DropdownButton } from "../../../../../../../common/Button/components/DropdownButton/dropdownButton";
import { DropdownMenuItemProps } from "../../../../../../../common/DropdownMenu/common/entities";
import { DropdownMenuProps as DXDropdownMenuProps } from "../../../../../../../common/DropdownMenu/dropdownMenu";
import { DropdownMenu as RowSelectionDropdownMenu } from "./dropdownMenu.styles";

const DEFAULT_MENU_PROPS: Partial<MMenuProps> = {
  anchorOrigin: { horizontal: "left", vertical: "bottom" },
  transformOrigin: { horizontal: "left", vertical: "top" },
};

export interface DropdownMenuProps {
  button?: DXDropdownMenuProps["button"];
  children: ({ closeMenu }: DropdownMenuItemProps) => JSX.Element[];
  className?: string;
}

export const DropdownMenu = ({
  button = (props): JSX.Element => (
    <DropdownButton {...props}>Edit</DropdownButton>
  ),
  children,
  className,
  ...props /* Spread props to allow for Mui Menu specific prop overrides e.g. "anchorOrigin". */
}: DropdownMenuProps): JSX.Element => {
  return (
    <RowSelectionDropdownMenu
      {...DEFAULT_MENU_PROPS}
      className={className}
      button={button}
      {...props}
    >
      {({ closeMenu }): JSX.Element[] => children({ closeMenu })}
    </RowSelectionDropdownMenu>
  );
};
