import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import React from "react";
import { ButtonProps } from "../../button";
import { DropdownButton as Button } from "./dropdownButton.styles";

export type DropdownButtonProps = Exclude<ButtonProps, "StartIcon">;

export const DropdownButton = ({
  children,
  disabled = false,
  ...props /* Spread props to allow for Mui ButtonProps specific prop overrides e.g. "onClick". */
}: DropdownButtonProps): JSX.Element => {
  return (
    <Button disabled={disabled} EndIcon={ArrowDropDownRoundedIcon} {...props}>
      {children}
    </Button>
  );
};
