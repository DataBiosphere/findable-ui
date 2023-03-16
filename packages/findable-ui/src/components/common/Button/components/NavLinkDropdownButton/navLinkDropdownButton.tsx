import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import React from "react";
import { ButtonProps } from "../../button";
import { NavLinkDropdownButton as Button } from "./navLinkDropdownButton.styles";

export interface NavLinkDropdownButtonProps
  extends Exclude<ButtonProps, "StartIcon"> {
  isActive: boolean;
}

export const NavLinkDropdownButton = ({
  children,
  isActive,
  ...props /* Spread props to allow for Button specific props ButtonProps e.g. "onClick". */
}: NavLinkDropdownButtonProps): JSX.Element => {
  return (
    <Button EndIcon={ArrowDropDownRoundedIcon} isActive={isActive} {...props}>
      {children}
    </Button>
  );
};
