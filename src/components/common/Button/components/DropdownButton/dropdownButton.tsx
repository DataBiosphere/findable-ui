import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import React from "react";
import { ButtonProps } from "../../button";
import { DropdownButton as Button } from "./dropdownButton.styles";

export interface DropdownButtonProps extends Exclude<ButtonProps, "StartIcon"> {
  open?: boolean;
}

export const DropdownButton = ({
  children,
  disabled = false,
  open = false,
  ...props /* Spread props to allow for Mui ButtonProps specific prop overrides e.g. "onClick". */
}: DropdownButtonProps): JSX.Element => {
  return (
    <Button
      disabled={disabled}
      EndIcon={ArrowDropDownRoundedIcon}
      open={open}
      {...props}
    >
      {children}
    </Button>
  );
};
