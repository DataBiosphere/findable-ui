import { MenuProps as MMenuProps } from "@mui/material";
import React from "react";
import { DropdownButton as DXDropdownButton } from "../../../../../../../common/Button/components/DropdownButton/dropdownButton";
import {
  DropdownMenuButtonProps,
  DropdownMenuItemProps,
} from "../../../../../../../common/DropdownMenu/common/entities";
import { DropdownMenuProps as DXDropdownMenuProps } from "../../../../../../../common/DropdownMenu/dropdownMenu";
import { DropdownMenu as RowSelectionDropdownMenu } from "./dropdownMenu.styles";

const DEFAULT_MENU_PROPS: Partial<MMenuProps> = {
  anchorOrigin: { horizontal: "left", vertical: "bottom" },
  transformOrigin: { horizontal: "left", vertical: "top" },
};

export interface DropdownMenuProps {
  Button?: DXDropdownMenuProps["Button"];
  buttonLabel?: string;
  children: ({ closeMenu }: DropdownMenuItemProps) => JSX.Element[];
  className?: string;
}

export const DropdownMenu = ({
  Button = (props: DropdownMenuButtonProps): JSX.Element =>
    renderButton({ children: buttonLabel, ...props }),
  buttonLabel = "Edit",
  children,
  className,
  ...props /* Spread props to allow for Mui Menu specific prop overrides e.g. "anchorOrigin". */
}: DropdownMenuProps): JSX.Element => {
  return (
    <RowSelectionDropdownMenu
      {...DEFAULT_MENU_PROPS}
      className={className}
      Button={Button}
      {...props}
    >
      {({ closeMenu }): JSX.Element[] => children({ closeMenu })}
    </RowSelectionDropdownMenu>
  );
};

/**
 * Return the dropdown button.
 * @param props - Button props e.g. "onClick".
 * @returns button element.
 */
function renderButton(props: DropdownMenuButtonProps): JSX.Element {
  return <DXDropdownButton {...props} />;
}
