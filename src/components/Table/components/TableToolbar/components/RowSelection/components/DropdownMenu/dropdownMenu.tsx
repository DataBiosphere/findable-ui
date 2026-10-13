import { MenuProps as MMenuProps } from "@mui/material";
import { JSX } from "react";
import { DropdownButton } from "../../../../../../../common/Button/components/DropdownButton/dropdownButton";
import { DropdownMenuItemProps } from "../../../../../../../common/DropdownMenu/common/entities";
import { DropdownMenuProps as DXDropdownMenuProps } from "../../../../../../../common/DropdownMenu/dropdownMenu";
import { DropdownMenu as RowSelectionDropdownMenu } from "./dropdownMenu.styles";

const DEFAULT_MENU_PROPS: Partial<MMenuProps> = {
  anchorOrigin: { horizontal: "left", vertical: "bottom" },
  transformOrigin: { horizontal: "left", vertical: "top" },
};

/**
 * Props for the row selection DropdownMenu component.
 */
export interface DropdownMenuProps {
  button?: DXDropdownMenuProps["button"];
  children: ({ closeMenu }: DropdownMenuItemProps) => JSX.Element[];
  className?: string;
}

/**
 * Row selection dropdown menu, opening below the button and aligned to its left edge.
 * @param props - Component props.
 * @param props.button - Renders the control that opens the menu, given its ARIA, onClick and open props; defaults to an "Edit" dropdown button.
 * @param props.children - Builds the menu items, given a function that closes the menu.
 * @param props.className - Class name applied to the menu.
 * @returns The dropdown menu.
 */
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
